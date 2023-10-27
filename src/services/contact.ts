import { contactData } from "../data/contactData";
import { IContact } from "../models/Icontact";

export const contacts = contactData as IContact[];

async function getAllContact() {
    const result = await contacts;
    return result;
}

async function getById(id: string) {
    const contact = await contacts.find(data => data.id === id.toString());
	if (contact === undefined) throw new Error('El id no existe')
    return contact;
}

async function createContact(contact: IContact) {
    return contact;
}

async function updateContact(id: string, updateData: Partial<IContact>) {
    if(!id) throw new Error('No existe el id')
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id')
    return 'Contact eliminado';
}

export const contactService = {
    getAllContact,
    getById,
    createContact,
    updateContact,
    delete: _delete,
};