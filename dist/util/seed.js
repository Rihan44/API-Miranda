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
const users_model_1 = require("../models/users.model");
(0, conection_1.default)();
const NUM_ROOMS = 10;
const NUM_BOOKINGS = 10;
const NUM_USERS = 10;
const NUM_MESSAGES = 10;
const rooms = [];
const roomType = ["Double Superior", "Single", "Deluxe", "Suite", "Imperial", "Double"];
function createRooms() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < NUM_ROOMS; i++) {
            const roomInput = {
                // "https://example.com/room1.jpg"
                "room_photo": faker_1.faker.image.url(),
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
                    "Bathtub",
                    "Jacuzzi",
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
createRooms()
    .then(() => {
    createBookings();
})
    .catch((e) => console.error(e));
const checks = ['check_in', 'check_out'];
function createBookings() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < NUM_BOOKINGS; i++) {
            const randomRoomIndex = Math.floor(Math.random() * 11);
            const bookingsInput = {
                "guest": faker_1.faker.person.fullName(),
                "phone_number": faker_1.faker.phone.number(),
                "order_date": faker_1.faker.date.anytime(),
                "check_in": faker_1.faker.date.recent(),
                "check_out": faker_1.faker.date.future(),
                "special_request": faker_1.faker.lorem.text(),
                "roomID": rooms[randomRoomIndex]._id.toString(),
                "room_type": roomType[faker_1.faker.number.int({ min: 0, max: 5 })],
                "room_number": faker_1.faker.number.int({ min: 1, max: 599 }),
                "status": checks[faker_1.faker.number.int({ min: 0, max: 1 })],
                "price": faker_1.faker.number.int({ min: 30, max: 3000 }),
            };
            yield bookings_model_1.BookingsModel.create(bookingsInput);
        }
    });
}
function createUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < NUM_USERS; i++) {
            const usersInput = {
                "name": "John Smith",
                "email": "john.smith@example.com",
                "photo": "https://example.com/photo1.jpg",
                "employee_position": "Manager",
                "phone_number": "+1234567890",
                "hire_date": "2023-01-15",
                "job_description": "General hotel management, staff supervision, strategic decision-making.",
                "status": false,
                "password_hash": "a1b2c3d4e5f6g7h8i9j0"
            };
            yield users_model_1.UsersModel.create(usersInput);
        }
    });
}
createUsers();
// async function createMessages() {
for (let i = 0; i < NUM_MESSAGES; i++) {
    const bookingsInput = {
    //     // "name": "John Doe",
    //     // "email": "johndoe@example.com",
    //     // "phone": "123-456-7890",
    //     // "email_subject": "Hello",
    //     // "email_description": "This is a sample email description.This is a sample email description.This is a sample email description.This is a sample email description.This is a sample email description.This is a sample email description.This is a sample email description.This is a sample email description.",
    //     // "date": "2023-05-24",
    //     // "dateTime":"12:03pm",
    //     // "isArchived": false
    };
    await bookings_model_1.BookingsModel.create(bookingsInput);
}
// }
