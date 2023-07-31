import { IExcelData, IForm } from './form';

export interface IExcelAddRequest {
  values: IExcelData[] | IExcelStrictData[];
}

export interface IExcelGetRowsRequest {
  values: number[];
}

export type IExcelGetOptionsResponse = Record<string, { idx: number[]; name: string }>;

export type IExcelGetRowsResponse = IForm[];

export interface IExcelUpdateRequest {
  values: {
    key: string | number;
    value: {
      values: [string[]];
    };
  }[];
}
