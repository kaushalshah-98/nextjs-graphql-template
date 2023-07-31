import { gql } from 'apollo-server-micro';
import { RootData, graphqlNormalize } from '../../customTypes';
import { IContact } from '../../models';

/**
 * CreateContact
 */
export const CREATE_CONTACT = gql`
  mutation CreateContact($input: ContactCreateInput!) {
    createContact(input: $input) {
      id
      avatar
      email
      firstName
      fullName
      lastName
    }
  }
`;
export interface ICreateContactsVar {
  input: Omit<Required<IContact>, 'id'>;
}
export type ICreateContactsData = RootData<(graphqlNormalize & IContact) | null, 'createContact'>;

/**
 * UpdateContact
 */
export const UPDATE_CONTACT = gql`
  mutation UpdateContact($input: ContactUpdateInput!) {
    updateContact(input: $input) {
      id
      avatar
      email
      firstName
      fullName
      lastName
    }
  }
`;
export interface IUpdateContactsVar {
  input: IContact;
}
export type IUpdateContactsData = RootData<(graphqlNormalize & IContact) | null, 'updateContact'>;

/**
 * DeleteContact
 */
export const DELETE_CONTACT = gql`
  mutation DeleteContact($input: ContactDeleteInput!) {
    deleteContact(input: $input) {
      id
      avatar
      email
      firstName
      fullName
      lastName
    }
  }
`;
export interface IDeleteContactsVar {
  input: { id: string };
}
export type IDeleteContactsData = RootData<(graphqlNormalize & IContact) | null, 'deleteContact'>;
