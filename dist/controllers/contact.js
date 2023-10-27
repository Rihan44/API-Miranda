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
exports.contactController.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contact_1.contactService.getAllContact();
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.contactController.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield contact_1.contactService.getById(id);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.contactController.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdContact = req.body;
        const result = yield contact_1.contactService.createContact(createdContact);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.contactController.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactUpdated = yield contact_1.contactService.updateContact(req.params.id, req.body);
        res.json({ contactUpdated, success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.contactController.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield contact_1.contactService.delete(id);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
}));
