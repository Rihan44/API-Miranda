import { contactData } from "../data/contactData";
import { IContact } from "../models/Icontact";

export const contacts = contactData as IContact[];

async function getAllContact() {
    const result = await contacts;
    return result;
}

async function getById(id: number) {
    const contact = await contacts.find(data => data.id === id.toString());
	if (contact === undefined) throw new Error('El id no existe')
    return contact;
}

async function createContact(contact: IContact) {
    await contacts.push(contact);
    return contacts;
}

async function updateContact(id: number, updateData: Partial<IContact>) {
    contacts.map((data) => {
        if (data.id == id.toString()) {
            return {
                ...data,
                ...updateData
            }
        }
        return data;
    })
}

async function _delete(id: number) {
    const contactUpdated: IContact[] = await contacts.filter(data => data.id !== id.toString());
    return contactUpdated;
}

export const contactService = {
    getAllContact,
    getById,
    createContact,
    updateContact,
    delete: _delete,
};