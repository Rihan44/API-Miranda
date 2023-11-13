"use strict";
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
async function createRooms() {
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
            "discount": faker_1.faker.number.int({ min: 1, max: 100 }),
            "status": "available",
            "description": faker_1.faker.lorem.words({ min: 10, max: 15 })
        };
        const room = await rooms_model_1.RoomsModel.create(roomInput);
        rooms.push(room);
    }
}
;
async function createBookings() {
    for (let i = 0; i < NUM_BOOKINGS; i++) {
        const randomRoomIndex = Math.floor(Math.random() * NUM_ROOMS);
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
        await bookings_model_1.BookingsModel.create(bookingsInput);
    }
}
;
async function createUsers() {
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
        await users_model_1.UsersModel.create(usersInput);
    }
}
;
async function createMessages() {
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
        await messages_model_1.MessageModel.create(messagesInput);
    }
}
;
(async () => {
    await createRooms();
    await createBookings();
    await createUsers();
    await createMessages();
})();
// process.exit();
