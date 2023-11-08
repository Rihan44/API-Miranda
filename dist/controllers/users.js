"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const express_1 = require("express");
const users_1 = require("../services/users");
const validation_1 = require("../middlewares/validation");
const users_model_1 = require("../models/users.model");
exports.usersController = (0, express_1.Router)();
exports.usersController.get('/', async (_req, res, next) => {
    try {
        const result = await users_1.usersServices.getAllUsers();
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.usersController.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await users_1.usersServices.getById(id);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.usersController.post('/', (0, validation_1.authValidation)(users_model_1.UserSchema), async (req, res, next) => {
    try {
        const createdUser = req.body;
        const result = await users_1.usersServices.createUser(createdUser);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.usersController.put('/:id', async (req, res, next) => {
    try {
        const userUpdated = await users_1.usersServices.updateUser(req.params.id, req.body);
        res.json({ userUpdated, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.usersController.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await users_1.usersServices.delete(id);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
