"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const express_1 = require("express");
const contact_1 = require("../services/contact");
exports.contactController = (0, express_1.Router)();
exports.contactController.get('/', async (_req, res, next) => {
    try {
        const result = await contact_1.contactService.getAllContact();
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.contactController.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await contact_1.contactService.getById(id);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.contactController.post('/', async (req, res, next) => {
    try {
        const createdContact = req.body;
        const result = await contact_1.contactService.createContact(createdContact);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.contactController.put('/:id', async (req, res, next) => {
    try {
        const contactUpdated = await contact_1.contactService.updateContact(req.params.id, req.body);
        res.json({ contactUpdated, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.contactController.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await contact_1.contactService.delete(id);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
