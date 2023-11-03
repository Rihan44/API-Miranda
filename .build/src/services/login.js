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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const defaultUser = {
    user: "ASdev",
    password: "12345",
};
const secret_key = process.env.SECRET_KEY || '';
function login(user, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user === defaultUser.user && password === defaultUser.password) {
            const result = signJWT({ user });
            return result;
        }
        throw new Error('Error al logear');
    });
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
