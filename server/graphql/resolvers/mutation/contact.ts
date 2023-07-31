import type { Prisma } from '@prisma/client';
import {
  IContext,
  IUpdateContactsVar,
  ICreateContactsVar,
  IDeleteContactsVar,
  IUpdateContactsData,
  ICreateContactsData,
  IDeleteContactsData,
} from '../../../types';

export const createContact = (
  _: unknown,
  { input }: ICreateContactsVar,
  { prisma }: IContext
): Promise<ICreateContactsData['createContact']> => {
  try {
    return prisma.contact.create({ data: { ...input } });
  } catch (error) {
    console.error('ERROR:: mutation -> contact.createContact', error);
    throw new Error((error as Error)?.message);
  }
};

export const deleteContact = (
  _: unknown,
  { input }: IDeleteContactsVar,
  { prisma }: IContext
): Promise<IDeleteContactsData['deleteContact']> => {
  try {
    return prisma.contact.delete({ where: { id: input.id } });
  } catch (error) {
    console.error('ERROR:: mutation -> contact.deleteContact', error);
    throw new Error((error as Error)?.message);
  }
};

export const updateContact = (
  _: unknown,
  { input }: IUpdateContactsVar,
  { prisma }: IContext
): Promise<IUpdateContactsData['updateContact']> => {
  try {
    return prisma.contact.update({
      where: { id: input.id },
      data: { ...(input as Prisma.ContactUpdateInput) },
    });
  } catch (error) {
    console.error('ERROR:: mutation -> contact.updateContact', error);
    throw new Error((error as Error)?.message);
  }
};
