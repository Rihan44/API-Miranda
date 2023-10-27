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
exports.contactController = void 0;
const express_1 = require("express");
const contact_1 = require("../services/contact");
exports.contactController = (0, express_1.Router)();
exports.contactController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contact_1.contactService.getAllContact();
        res.json(result);
    }
    catch (error) {
        res.status(500).send(`Error al recoger todas los contact message ${error}`);
    }
}));
exports.contactController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield contact_1.contactService.getById(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(`Error al recoger un contact message ${error}`);
    }
}));
exports.contactController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdContact = req.body;
        const result = yield contact_1.contactService.createContact(createdContact);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(`Error al crear un contact message ${error}`);
    }
}));
exports.contactController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield contact_1.contactService.getById(parseInt(req.params.id));
        yield contact_1.contactService.updateContact(parseInt(req.params.id), req.body);
        res.json(contact);
    }
    catch (error) {
        res.status(500).send(`Error al actualizar un contact message ${error}`);
    }
}));
exports.contactController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield contact_1.contactService.delete(id);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`Error al borrar el contact message ${error}`);
    }
}));
