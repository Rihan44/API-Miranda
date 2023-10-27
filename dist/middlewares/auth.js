"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../services/login"));
function authMiddleware(req, res, next) {
    const token = req.headers.token || '';
    try {
        login_1.default.verifyJWT(token);
        next();
    }
    catch (error) {
        res.status(404).json(`${error}`);
    }
}
exports.default = authMiddleware;
