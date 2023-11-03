"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const messages_model_1 = require("../models/messages.model");
async function getAllContact() {
    const result = await messages_model_1.MessageModel.find();
    return result;
}
async function getById(id) {
    const contact = await messages_model_1.MessageModel.findById(id).exec();
    if (contact === undefined)
        throw new Error('El id no existe');
    return contact;
}
async function createContact(contact) {
    const result = await messages_model_1.MessageModel.create(contact);
    return result;
}
async function updateContact(id, updateData) {
    if (!id)
        throw new Error('No existe el id');
    await messages_model_1.MessageModel.findByIdAndUpdate(id, updateData);
    return updateData;
}
async function _delete(id) {
    if (!id)
        throw new Error('No existe el id');
    await messages_model_1.MessageModel.findByIdAndDelete(id);
    return;
}
exports.contactService = {
    getAllContact,
    getById,
    createContact,
    updateContact,
    delete: _delete,
};
