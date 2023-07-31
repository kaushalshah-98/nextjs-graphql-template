export type ADDRESS_COLUMNS =
  | 'village'
  | 'email'
  | 'residentialAddress'
  | 'officeAddress'
  | 'officeAddress';

export type COMMON_COLUMNS =
  | 'firstName'
  | 'middleName'
  | 'lastName'
  | 'dateOfBirth'
  | 'bloodGroup'
  | 'maritialStatus'
  | 'education'
  | 'marriageDate'
  | 'contactNumber';

export type COMMON_FORM_COLUMNS = COMMON_COLUMNS | 'relation' | 'officeAddress';
export type MAIN_FORM_COLUMNS = COMMON_COLUMNS | 'alternateContact';

export type ALL_COLUMNS =
  | 'village'
  | 'email'
  | 'residentialAddress'
  | 'city'
  | 'officeAddress'
  | 'mainMemberName'
  | 'firstName'
  | 'lastName'
  | 'middleName'
  | 'fullName'
  | 'dateOfBirth'
  | 'age'
  | 'bloodGroup'
  | 'maritialStatus'
  | 'education'
  | 'marriageDate'
  | 'contactNumber'
  | 'alternateContact'
  | 'relation'
  | 'createdAt'
  | 'profilePic';

export interface IOption {
  idx: number;
  name: string;
}
export interface COLUMN_METADATA {
  excelHeader: string;
  idx: number;
  key: ALL_COLUMNS;
  columnName: string;
  label: string;
}

export interface ICOLUMN_DATA {
  idx: number;
  // [key?: ALL_COLUMNS]: string;
  village?: string;
  email?: string;
  residentialAddress?: string;
  officeAddress?: string;
  firstName?: string;
  fullName?: string;
  age?: string;
  city?: string;
  lastName?: string;
  middleName?: string;
  mainMemberName?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  maritialStatus?: string;
  education?: string;
  marriageDate?: string;
  contactNumber?: string;
  alternateContact?: string;
  relation?: string;
  createdAt?: string;
}
