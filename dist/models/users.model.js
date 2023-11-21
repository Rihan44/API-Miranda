"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'es'] } }).required(),
    photo: joi_1.default.string(),
    employee_position: joi_1.default.string().required(),
    phone_number: joi_1.default.string().min(3).max(20).required(),
    hire_date: joi_1.default.string(),
    job_description: joi_1.default.string().max(150).required(),
    status: joi_1.default.boolean().required(),
    password_hash: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
=======
exports.UsersModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const usersSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    photo: { type: String },
    employee_position: { type: String },
    phone_number: { type: String },
    hire_date: { type: String },
    job_description: { type: String },
    status: { type: Boolean },
    password_hash: { type: String }
>>>>>>> mongo
});
