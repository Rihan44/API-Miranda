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
const messages_model_1 = require("../models/messages.model");
(0, conection_1.default)();
const NUM_ROOMS = 10;
const NUM_BOOKINGS = 10;
const NUM_USERS = 10;
const NUM_MESSAGES = 10;
const rooms = [];
const roomType = ["Double Superior", "Single", "Deluxe", "Suite", "Imperial", "Double"];
const checks = ['check_in', 'check_out'];
function createRooms() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < NUM_ROOMS; i++) {
            const roomInput = {
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
// createRooms()
//     .then(() => {
//         createBookings();
//     })
//     .catch((e) => console.error(e));
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
                "name": faker_1.faker.person.fullName(),
                "email": faker_1.faker.internet.email(),
                "photo": faker_1.faker.image.url(),
                "employee_position": faker_1.faker.person.jobArea(),
                "phone_number": faker_1.faker.phone.number(),
                "hire_date": faker_1.faker.date.recent(),
                "job_description": faker_1.faker.person.jobDescriptor(),
                "status": faker_1.faker.datatype.boolean(),
                "password_hash": faker_1.faker.internet.password()
            };
            yield users_model_1.UsersModel.create(usersInput);
        }
    });
}
function createMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < NUM_MESSAGES; i++) {
            const messagesInput = {
                "name": faker_1.faker.person.fullName(),
                "email": faker_1.faker.internet.email(),
                "phone": faker_1.faker.phone.number(),
                "email_subject": faker_1.faker.word.verb(),
                "email_description": faker_1.faker.lorem.words({ min: 10, max: 15 }),
                "date": faker_1.faker.date.recent(),
                "dateTime": faker_1.faker.date.anytime(),
                "isArchived": faker_1.faker.datatype.boolean()
            };
            yield messages_model_1.MessageModel.create(messagesInput);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield createRooms();
    yield createBookings();
    yield createUsers();
    yield createMessages();
}))();
process.exit();
