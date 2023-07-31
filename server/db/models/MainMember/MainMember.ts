import { TABLE_NAMES } from '../../tableConfig';
import { CacheModel } from '../CacheModel';
import type { IMainMember } from './type';

export class MainMember extends CacheModel {
  static get tableName() {
    return TABLE_NAMES.MAIN_MEMBERS;
  }

  static get dynamicFields() {
    return ['fullName'] as const;
  }
}

export interface MainMember extends IMainMember, CacheModel {}
