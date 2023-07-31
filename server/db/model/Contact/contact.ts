import type { IContact } from '../../../types';
import { TABLE_NAMES } from '../../tableConfig';

export class Contact {
  static get tableName() {
    return TABLE_NAMES.CONTACTS;
  }

  static get dynamicFields() {
    return ['fullName'] as const;
  }
}

export interface Contact extends IContact {}
