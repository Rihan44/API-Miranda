"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ContactSchema = joi_1.default.object({
    name: joi_1.default.string(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'es'] } }),
    phone: joi_1.default.string(),
    email_subject: joi_1.default.string().max(10),
    email_description: joi_1.default.string().min(3).max(150),
    date: joi_1.default.string(),
    date_time: joi_1.default.string(),
    is_archived: joi_1.default.boolean(),
});
