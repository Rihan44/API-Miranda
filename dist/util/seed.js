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
const bookings_model_1 = require("../models/bookings.model");
const faker_1 = require("@faker-js/faker");
const conection_1 = __importDefault(require("./conection"));
const rooms_model_1 = require("../models/rooms.model");
(0, conection_1.default)();
const NUM_ROOMS = 10;
const NUM_BOOKINGS = 10;
const rooms = [];
const amenities = [
    "1/3 Bed Space",
    "24-Hour Guard",
    "Free Wifi",
    "Air Conditioner",
    "Television",
    "Towels",
    "Mini Bar",
    "Coffee Set",
    "Bathtub",
    "Jacuzzi",
    "Nice Views"
];
const roomType = ["Double Superior", "Single", "Deluxe", "Suite", "Imperial", "Double"];
function createRooms() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < NUM_ROOMS; i++) {
            const roomInput = {
                "room_photo": "https://example.com/room1.jpg",
                "room_type": roomType[faker_1.faker.number.int({ min: 0, max: 5 })],
                "room_number": faker_1.faker.number.int({ min: 1, max: 599 }),
                "amenities": [
                    "1/3 Bed Space",
                    "24-Hour Guard",
                    "Free Wifi",
                    "Air Conditioner",
                    "Television",
                    "Towels",
                    "Mini Bar",
                    "Coffee Set",
                    "Nice Views"
                ],
                "price": faker_1.faker.number.int({ min: 30, max: 3000 }),
                "offer_price": faker_1.faker.datatype.boolean(),
                "discount": faker_1.faker.number.int({ min: 1, max: 100 }),
                "status": "available",
                "description": faker_1.faker.lorem.words({ min: 10, max: 15 })
            };
            const room = yield rooms_model_1.RoomsModel.create(roomInput);
            rooms.push(room);
        }
    });
}
createRooms();
console.log(rooms);
function createBookings() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < NUM_BOOKINGS; i++) {
            const bookingsInput = {
                "guest": "Angel",
                "phone_number": "+1 123-456-7890",
                "order_date": "2024-12-27",
                "check_in": "2023-10-05",
                "check_out": "2023-10-10",
                "special_request": "Please provide extra towels.",
                "roomID": rooms[faker_1.faker.number.int({ min: 0, max: 10 })].id,
                "room_type": "Deluxe",
                "room_number": 49,
                "status": "check_in",
                "price": 245.89
            };
            yield bookings_model_1.BookingsModel.create(bookingsInput);
        }
    });
}
createBookings();
