"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const defaultUser = {
    user: "ASdev",
    email: "asmuela.dev@gmail.com",
    password: 'ASdev12345'
};
const secret_key = process.env.SECRET_KEY || '';
async function login(user, password, email) {
    if (user === defaultUser.user && password === defaultUser.password) {
        const result = signJWT({ user, email });
        return result;
    }
    throw new Error('Error al logear');
}
function signJWT(payload) {
    const token = jsonwebtoken_1.default.sign(payload, secret_key, { expiresIn: '10y' });
    return { payload, token };
}
function verifyJWT(token) {
    const payload = jsonwebtoken_1.default.verify(token, secret_key);
    return payload;
}
exports.authService = {
    login,
    signJWT,
    verifyJWT
};
exports.default = exports.authService;
