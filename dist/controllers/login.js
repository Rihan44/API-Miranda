"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const login_1 = __importDefault(require("../services/login"));
const express_1 = require("express");
exports.loginController = (0, express_1.Router)();
exports.loginController.post('/', async (req, res, next) => {
    try {
        const user = req.body.user;
        const email = req.body.email;
        const password = req.body.password;
        const loged = await login_1.default.login(password, email);
        res.json(loged);
    }
    catch (error) {
        next(error);
    }
});
