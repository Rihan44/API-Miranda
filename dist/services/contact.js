"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const messages_model_1 = require("../models/messages.model");
async function getAllContact() {
    const result = await (0, messages_model_1.getAll)();
    return result;
}
async function getById(id) {
    const contact = await (0, messages_model_1.getOne)(id);
    if (contact === undefined)
        throw new Error('El id no existe');
    return contact;
}
async function createContact(contact) {
    const result = await (0, messages_model_1.createNewContact)(contact);
    return result;
}
async function updateContact(id, updateData) {
    if (!id)
        throw new Error('No existe el id');
    await (0, messages_model_1.updateTheContact)(id, updateData);
    return updateData;
}
async function _delete(id) {
    if (!id)
        throw new Error('No existe el id');
    await (0, messages_model_1.deleteContact)(id);
    return;
}
exports.contactService = {
    getAllContact,
    getById,
    createContact,
    updateContact,
    delete: _delete,
};
