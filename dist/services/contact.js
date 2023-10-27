"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = exports.contacts = void 0;
const contactData_1 = require("../data/contactData");
exports.contacts = contactData_1.contactData;
function getAllContact() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.contacts;
        return result;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const contact = yield exports.contacts.find(data => data.id === id.toString());
        if (contact === undefined)
            throw new Error('El id no existe');
        return contact;
    });
}
function createContact(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        return contact;
    });
}
function updateContact(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('No existe el id');
        return updateData;
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('No existe el id');
        return 'Contact eliminado';
    });
}
exports.contactService = {
    getAllContact,
    getById,
    createContact,
    updateContact,
    delete: _delete,
};
