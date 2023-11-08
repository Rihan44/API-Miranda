"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.BookingSchema = joi_1.default.object({
    guest: joi_1.default.string(),
    phone_number: joi_1.default.string(),
    order_date: joi_1.default.string(),
    check_in: joi_1.default.string(),
    check_out: joi_1.default.string(),
    special_request: joi_1.default.string().min(3).max(100),
    status: joi_1.default.string(),
    price: joi_1.default.number(),
    room_id: joi_1.default.number(),
});
