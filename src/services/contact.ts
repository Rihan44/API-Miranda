import { IContact } from "../interfaces/Icontact";
import { MessageModel } from "../models/messages.model";

async function getAllContact() {
    const result = await MessageModel.find();
    return result;
}

async function getById(id: string) {
    const contact = await MessageModel.findById(id).exec();
	if (contact === undefined) throw new Error('El id no existe')
    return contact;
}

async function createContact(contact: IContact) {
    const result = await MessageModel.create(contact);
    return result;
}

async function updateContact(id: string, updateData: Partial<IContact>) {
    if(!id) throw new Error('No existe el id');
    await MessageModel.findByIdAndUpdate(id, updateData);
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id');
    await MessageModel.findByIdAndDelete(id);
    return;
}

export const contactService = {
    getAllContact,
    getById,
    createContact,
    updateContact,
    delete: _delete,
};