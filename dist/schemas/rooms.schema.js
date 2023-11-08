"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RoomSchema = joi_1.default.object({
    room_photo: joi_1.default.string(),
    room_type: joi_1.default.string(),
    price: joi_1.default.number(),
    offer_price: joi_1.default.boolean(),
    discount: joi_1.default.number(),
    status: joi_1.default.string(),
    description: joi_1.default.string(),
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');
exports.RoomSchema.validate({});