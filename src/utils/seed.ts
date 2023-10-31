import { BookingsModel } from "../models/bookings.model";
import { faker } from '@faker-js/faker';
import ConectionMongo from "./conection";
import { RoomsModel } from "../models/rooms.model";
import { UsersModel } from "../models/users.model";
import { MessageModel } from "../models/messages.model";

ConectionMongo();

const NUM_ROOMS = 10;
const NUM_BOOKINGS = 10;
const NUM_USERS = 10;
const NUM_MESSAGES = 10;

const rooms: any = [];

const roomType = ["Double Superior", "Single", "Deluxe", "Suite", "Imperial", "Double"];

async function createRooms() {

    for (let i = 0; i < NUM_ROOMS; i++) {
        const roomInput = {
            "room_photo": faker.image.url(),
            "room_type": roomType[faker.number.int({ min: 0, max: 5 })],
            "room_number": faker.number.int({ min: 1, max: 599 }),
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
            "price": faker.number.int({ min: 30, max: 3000 }),
            "offer_price": faker.datatype.boolean(),
            "discount": faker.number.int({ min: 1, max: 100 }),
            "status": "available",
            "description": faker.lorem.words({ min: 10, max: 15 })
        }

        const room: any = await RoomsModel.create(roomInput);
        rooms.push(room);

    }
}

createRooms()
    .then(() => {
        createBookings();
    })
    .catch((e) => console.error(e));

const checks = ['check_in', 'check_out'];

async function createBookings() {
    for (let i = 0; i < NUM_BOOKINGS; i++) {
        const randomRoomIndex = Math.floor(Math.random() * 11);
        const bookingsInput = {
            "guest": faker.person.fullName(),
            "phone_number": faker.phone.number(),
            "order_date": faker.date.anytime(),
            "check_in": faker.date.recent(),
            "check_out": faker.date.future(),
            "special_request": faker.lorem.text(),
            "roomID": rooms[randomRoomIndex]._id.toString(),
            "room_type": roomType[faker.number.int({ min: 0, max: 5 })],
            "room_number": faker.number.int({ min: 1, max: 599 }),
            "status": checks[faker.number.int({ min: 0, max: 1 })],
            "price": faker.number.int({ min: 30, max: 3000 }),
        }
        await BookingsModel.create(bookingsInput);
    }
}

async function createUsers() {
    for (let i = 0; i < NUM_USERS; i++) {
        const usersInput = {
            "name": faker.person.fullName(),
            "email": faker.internet.email(),
            "photo": faker.image.url(),
            "employee_position": faker.person.jobArea(),
            "phone_number": faker.phone.number(),
            "hire_date": faker.date.recent(),
            "job_description": faker.person.jobDescriptor(),
            "status": faker.datatype.boolean(),
            "password_hash": faker.internet.password()
        }
        await UsersModel.create(usersInput);
    }
}

createUsers();

async function createMessages() {
    for (let i = 0; i < NUM_MESSAGES; i++) {
        const messagesInput = {
            "name": faker.person.fullName(),
            "email": faker.internet.email(),
            "phone": faker.phone.number(),
            "email_subject": faker.word.verb(),
            "email_description": faker.lorem.words({ min: 10, max: 15 }),
            "date": faker.date.recent(),
            "dateTime": faker.date.anytime(),
            "isArchived": faker.datatype.boolean()
        }
        await MessageModel.create(messagesInput);
    }
}

createMessages();

