"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ContactSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'es'] } }).required(),
    phone: joi_1.default.string().required(),
    email_subject: joi_1.default.string().max(10).required(),
    email_description: joi_1.default.string().min(3).max(150).required(),
    date: joi_1.default.string().required(),
    date_time: joi_1.default.string().required(),
    is_archived: joi_1.default.boolean().required(),
});
