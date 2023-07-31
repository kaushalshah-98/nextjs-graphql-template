import { NextApiRequest } from 'next/types';

export type IRange = {
  range: string;
};
export type IBatchRange = {
  ranges: string[];
};

export type IValues = {
  values: any[][];
};
export type IResource = {
  resource: {
    values: any[][];
  };
};
export type IDeleteRow = {
  rowNumber: string;
};
export type IDeleteColumn = {
  columnNumber: string;
};
export type InputOption = 'USER_ENTERED' | 'RAW';

export type IGet = IRange;
export type IBulkGet = IBatchRange;

export type IDelete = IRange;
export type IRemoveRow = IDeleteRow;
export type IRemoveColumn = IDeleteColumn;

export interface IPost extends IRange, IResource {
  valueInputOption?: InputOption;
}
export interface IPut extends IRange, IResource {
  valueInputOption?: InputOption;
}

export type IOption = { idx: number; name: string };

export interface NextApiRequestExtended extends NextApiRequest {
  author: string;
}
