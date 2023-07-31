import path from 'path';
import { IOption } from '../types';
import { NUMBER_MAPPING } from '@/config';
import { IForm } from '@/src/types/form';

function addHeaders(response: Array<string | number>, idx?: number) {
  const data: IForm = {};
  response.forEach((item: any, index) => {
    const columnMetadata = NUMBER_MAPPING[index];
    data[columnMetadata.key] = item;
    if (idx) {
      data.excelRowId = idx;
    }
  });
  return data;
}

const mapData = (data: IOption[]) => {
  const obj: Record<string, { idx: number[]; name: string }> = {};
  data.forEach((item) => {
    if (obj[item.name]) {
      obj[item.name] = { name: item.name, idx: [...obj[item.name].idx, item.idx] };
    } else {
      obj[item.name] = { name: item.name, idx: [item.idx] };
    }
  });
  return obj;
};

function isDateToday(date: string): boolean {
  const otherDate = new Date(date);
  const todayDate = new Date();

  if (
    otherDate.getDate() === todayDate.getDate() &&
    otherDate.getMonth() === todayDate.getMonth()
  ) {
    return true;
  }
  return false;
}

function isDateInThisMonth(date: string): boolean {
  const otherDate = new Date(date);
  const todayDate = new Date();
  if (otherDate.getMonth() === todayDate.getMonth()) {
    return true;
  }
  return false;
}

function getFileMetaData(file: string): path.ParsedPath | null {
  try {
    return path.parse(file);
  } catch (error) {
    return null;
  }
}

function checkDateConstraint(date: string): { thisMonth: boolean; today: boolean } {
  let today = false;
  const thisMonth = isDateInThisMonth(date);

  if (thisMonth) {
    today = isDateToday(date);
  }

  return {
    today,
    thisMonth,
  };
}

export { addHeaders, getFileMetaData, mapData, checkDateConstraint, isDateToday };
