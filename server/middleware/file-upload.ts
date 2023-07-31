import path from 'path';
import multer from 'multer';
import type { Field, StorageEngine } from 'multer';
import { storageType, uploadType } from '../config';
import type { File } from '../types';

class Uploader {
  storage!: StorageEngine;

  allowedExtensions: RegExp | null;

  constructor(type: storageType = storageType.DISK, allowedExtensions = null) {
    this.allowedExtensions = allowedExtensions;
    this.initUploader(type);
  }

  initUploader(type: storageType) {
    switch (type) {
      case storageType.DISK:
        this.storage = this.diskStorage;
        break;

      default:
        this.storage = this.diskStorage;
        break;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get diskStorage() {
    return multer.memoryStorage();
  }

  public upload(
    req: any,
    res: any,
    next: (value: unknown) => void,
    storage: storageType,
    type: uploadType,
    ...params: Field[] | string[]
  ) {
    this.initUploader(storage);

    const multerOptions: multer.Options = {
      storage: this.storage,
      fileFilter: (_req, file, cb) => {
        this.checkFileType(file, cb);
      },
      // limits: {
      //   fileSize: 100000,
      // },
    };
    switch (type) {
      case uploadType.SINGLE:
        return multer(multerOptions).single(params[0] as string)(req, res, next);

      case uploadType.ARRAY:
        if (params.length > 1) {
          return multer(multerOptions).array(params[0] as string, params[1] as unknown as number)(
            req,
            res,
            next
          );
        }
        return multer(multerOptions).array(params[0] as string)(req, res, next);

      case uploadType.FIELDS:
        return multer(multerOptions).fields(params as readonly Field[])(req, res, next);

      case uploadType.NONE:
        return multer(multerOptions).none()(req, res, next);

      default:
        return multer(multerOptions).single(params[0] as string)(req, res, next);
    }
  }

  public checkFileType(file: File, cb: multer.FileFilterCallback) {
    // Allowed ext
    const filetypes =
      this.allowedExtensions ??
      /image\/jpg|image\/jpeg|jpeg|txt|text|ppt|pptx|pdf|docx|doc|jpg|png|mp4|xlsx|sheet/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error('File type not allowed') as unknown as null, false);
  }
}

export default new Uploader();
