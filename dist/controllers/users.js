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
exports.usersController = void 0;
const express_1 = require("express");
const usersData_1 = require("../data/usersData");
const users_1 = require("../services/users");
exports.usersController = (0, express_1.Router)();
exports.usersController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(usersData_1.usersData);
    try {
        const result = users_1.usersServices.getAllUsers();
        res.json(result);
    }
    catch (error) {
        res.status(500).send(`Error al recoger todos los users ${error}`);
    }
}));
exports.usersController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield users_1.usersServices.getById(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(`Error al recoger un user ${error}`);
    }
}));
exports.usersController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdUser = req.body;
        const result = yield users_1.usersServices.createUser(createdUser);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(`Error al crear un user ${error}`);
    }
}));
exports.usersController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.usersServices.getById(parseInt(req.params.id));
        yield users_1.usersServices.updateUser(parseInt(req.params.id), req.body);
        res.json(user);
    }
    catch (error) {
        res.status(500).send(`Error al actualizar un user ${error}`);
    }
}));
exports.usersController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield users_1.usersServices.delete(id);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`Error al borrar el user ${error}`);
    }
}));
