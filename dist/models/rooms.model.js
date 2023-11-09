"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RoomSchema = joi_1.default.object({
    room_photo: joi_1.default.string(),
    room_type: joi_1.default.string().required(),
    room_number: joi_1.default.number().required(),
    price: joi_1.default.number().required(),
    offer_price: joi_1.default.boolean().required(),
    discount: joi_1.default.number().max(100).required(),
    status: joi_1.default.string().required(),
    description: joi_1.default.string().min(3).max(150).required(),
});
