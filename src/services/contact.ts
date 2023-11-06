import { IContact } from "../interfaces/Icontact";
import { createNewContact, deleteContact, getAll, getOne, updateTheContact } from "../models/messages.model";

async function getAllContact() {
    const result = await getAll();
    return result;
}

async function getById(id: string) {
    const contact = await getOne(id);
	if (contact === undefined) throw new Error('El id no existe')
    return contact;
}

async function createContact(contact: IContact) {
    const result = await createNewContact(contact);
    return result;
}

async function updateContact(id: string, updateData: IContact) {
    if(!id) throw new Error('No existe el id');
    await updateTheContact(id, updateData);
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id');
    await deleteContact(id);
    return;
}

export const contactService = {
    getAllContact,
    getById,
    createContact,
    updateContact,
    delete: _delete,
};