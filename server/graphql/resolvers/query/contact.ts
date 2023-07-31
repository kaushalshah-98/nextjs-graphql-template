import { IContactData, IContext, IContactsData, IContactsVar, IContactVar } from '../../../types';

export const contacts = (
  _: unknown,
  __: IContactsVar,
  { prisma }: IContext
): Promise<IContactsData['contacts']> => {
  try {
    return prisma.contact.findMany();
  } catch (error) {
    console.error('ERROR:: query -> contact.contacts', error);
    throw new Error((error as Error)?.message);
  }
};

export const contact = (
  _: unknown,
  { input }: IContactVar,
  { prisma }: IContext
): Promise<IContactData['contact']> => {
  try {
    return prisma.contact.findUnique({
      where: { id: input.id || undefined },
    });
  } catch (error) {
    console.error('ERROR:: query -> contact.contact', error);
    throw new Error((error as Error)?.message);
  }
};
