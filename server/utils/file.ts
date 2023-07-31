import fs from 'fs';
import { Logger } from './logger';

export const ensureDirectoryExistence = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      return true;
    }
    fs.mkdirSync(filePath);
    return true;
  } catch (err) {
    Logger.error('Error::: ensureDirectoryExistence()', filePath, err);
    return false;
  }
};
export const removeLocalMediaFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      Logger.debug('REMOVING_PATH: ', filePath);
      fs.unlinkSync(filePath);
      return true;
    }
    Logger.debug('PATH:', filePath);
    return false;
  } catch (err) {
    Logger.error('Error::: removeLocalMediaFile()', err);
    return false;
  }
};
export const moveFile = (src: string, dest: string) => {
  Logger.info(src, dest);
  return new Promise((resolve, reject) => {
    try {
      fs.copyFile(src, dest, (err) => {
        if (err) {
          Logger.error(err);
          reject(err);
        } else {
          Logger.debug(`Output moved to ${dest}`);
          resolve({ result: true, error: err });
        }
      });
    } catch (err) {
      Logger.error('Error::: moveFile()', err);
    }
  });
};

export const removeDirectory = (dir: string) => {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    return true;
  } catch (err) {
    Logger.error('Error::: removeDirectory()', err);
    return false;
  }
};
