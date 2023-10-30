"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookings_model_1 = require("../models/bookings.model");
const conection_1 = __importDefault(require("./conection"));
(0, conection_1.default)();
bookings_model_1.BookingsModel.create({
    "guest": "Angel",
    "phone_number": "+1 123-456-7890",
    "order_date": "2024-12-27",
    "check_in": "2023-10-05",
    "check_out": "2023-10-10",
    "special_request": "Please provide extra towels.",
    "room_type": "Deluxe",
    "room_number": 49,
    "status": "check_in",
    "price": 245.89
});
