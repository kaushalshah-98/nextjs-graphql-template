import { gql } from 'apollo-server-micro';
import { RootData, graphqlNormalize } from '../../customTypes';
import { IContact } from '../../models';

/**
 * contacts
 */
export const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
      id
      avatar
      email
      firstName
      fullName
      lastName
    }
  }
`;
export interface IContactsVar {}
export type IContactsData = RootData<(graphqlNormalize & IContact)[] | null, 'contacts'>;

/**
 * contact
 */
export const GET_CONTACT = gql`
  query GetContact($input: ContactGetInput!) {
    contact(input: $input) {
      id
      avatar
      email
      firstName
      fullName
      lastName
    }
  }
`;
export interface IContactVar {
  input: {
    id: string;
  };
}
export type IContactData = RootData<(graphqlNormalize & IContact) | null, 'contact'>;
