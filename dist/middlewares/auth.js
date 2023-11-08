"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogin = void 0;
const login_1 = __importDefault(require("../services/login"));
function authLogin(req, res, next) {
    const token = req.headers.token || '';
    try {
        login_1.default.verifyJWT(token);
        next();
    }
    catch (error) {
        res.status(401).json({ error: true, message: 'You are not authorized' });
    }
}
exports.authLogin = authLogin;
