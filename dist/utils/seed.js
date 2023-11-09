"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const connection_1 = require("./connection");
const rooms_1 = require("../services/rooms");
const bookings_1 = require("../services/bookings");
const users_1 = require("../services/users");
const contact_1 = require("../services/contact");
const NUM_ROOMS = 10;
const NUM_BOOKINGS = 10;
const NUM_USERS = 10;
const NUM_MESSAGES = 10;
const rooms = [];
const roomType = ["Double Superior", "Single", "Deluxe", "Suite", "Imperial", "Double"];
const checks = ['check_in', 'check_out'];
async function createRooms() {
    await (0, connection_1.queryExecuter)(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INT AUTO_INCREMENT PRIMARY KEY,
            room_type VARCHAR(255),
            room_number VARCHAR(255),
            price DOUBLE,
            offer_price BOOLEAN,
            discount INT,
            status VARCHAR(255),
            description LONGTEXT
        )`);
    await (0, connection_1.queryExecuter)(`
        CREATE TABLE IF NOT EXISTS room_photos (
            room_id INT,
            room_photo_url VARCHAR(255),
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        )`);
    await (0, connection_1.queryExecuter)(`
        CREATE TABLE IF NOT EXISTS amenities (
            id INT AUTO_INCREMENT PRIMARY KEY,
            amenity_name VARCHAR(255)
        )`);
    await (0, connection_1.queryExecuter)(`
    CREATE TABLE IF NOT EXISTS amenity_to_room (
        room_id INT,
        amenity_id INT,
        FOREIGN KEY (room_id) REFERENCES rooms(id),
        FOREIGN KEY (amenity_id) REFERENCES amenities(id)
    )`);
    await (0, connection_1.queryExecuter)(`INSERT INTO amenities (amenity_name) VALUES('1/3 Bed Space'), ('24-Hour Guard'), ('Free Wifi'), ('Air Conditioner'), ('Television'), ('Towels'), ('Mini Bar'), ('Coffee Set'), ('Bathtub'), ('Jacuzzi'), ('Nice Views')`);
    for (let i = 0; i < NUM_ROOMS; i++) {
        const roomInput = {
            "room_photo": faker_1.faker.image.url(),
            "room_type": roomType[faker_1.faker.number.int({ min: 0, max: 5 })],
            "room_number": faker_1.faker.number.int({ min: 1, max: 599 }),
            "price": faker_1.faker.number.int({ min: 30, max: 3000 }),
            "offer_price": faker_1.faker.datatype.boolean(),
            "discount": faker_1.faker.number.int({ min: 1, max: 100 }),
            "status": "available",
            "description": faker_1.faker.lorem.words({ min: 10, max: 15 })
        };
        const room = await rooms_1.roomsService.createRoom(roomInput);
        rooms.push(room);
    }
}
async function createRoomPhotos() {
    for (let i = 0; i < NUM_ROOMS; i++) {
        const roomID = Math.floor(Math.random() * NUM_ROOMS) + 1;
        await (0, connection_1.queryExecuter)(`INSERT INTO room_photos (room_photo_url, room_id) VALUES('https://tinyurl.com/RoomPhoto1', ${roomID})`);
        await (0, connection_1.queryExecuter)(`INSERT INTO room_photos (room_photo_url, room_id) VALUES('https://tinyurl.com/TheRoomPhoto2', ${roomID})`);
        await (0, connection_1.queryExecuter)(`INSERT INTO room_photos (room_photo_url, room_id) VALUES('https://tinyurl.com/TheRoomPhoto3', ${roomID})`);
    }
}
async function createAmenitiesToRoom() {
    for (let i = 0; i < NUM_ROOMS; i++) {
        const roomID = Math.floor(Math.random() * NUM_ROOMS) + 1;
        const amenityID = Math.floor(Math.random() * NUM_ROOMS) + 1;
        await (0, connection_1.queryExecuter)(`INSERT INTO amenity_to_room (room_id, amenity_id) VALUES(${roomID}, ${amenityID})`);
    }
}
async function createBookings() {
    await (0, connection_1.queryExecuter)(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            guest VARCHAR(255),
            phone_number VARCHAR(255),
            order_date DATE,
            check_in DATE,
            check_out DATE,
            special_request TEXT,
            price DOUBLE,
            room_id INT,
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        )`);
    for (let i = 0; i < NUM_BOOKINGS; i++) {
        const bookingsInput = {
            "guest": faker_1.faker.person.fullName(),
            "phone_number": faker_1.faker.phone.number('501-###-###'),
            "order_date": faker_1.faker.date.anytime(),
            "check_in": faker_1.faker.date.recent(),
            "check_out": faker_1.faker.date.future(),
            "special_request": faker_1.faker.lorem.words({ min: 5, max: 20 }),
            "room_type": roomType[faker_1.faker.number.int({ min: 0, max: 5 })],
            "room_number": faker_1.faker.number.int({ min: 1, max: 599 }),
            "status": checks[faker_1.faker.number.int({ min: 0, max: 1 })],
            "price": faker_1.faker.number.int({ min: 30, max: 3000 }),
            "room_id": 1 + i,
        };
        await bookings_1.bookingService.createBooking(bookingsInput);
    }
}
async function createUsers() {
    await (0, connection_1.queryExecuter)(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            photo VARCHAR(255),
            employee_position VARCHAR(255),
            phone_number VARCHAR(255),
            hire_date DATE,
            job_description LONGTEXT,
            status BOOLEAN,
            password_hash VARCHAR(255)
          )`);
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
        await users_1.usersServices.createUser(usersInput);
    }
}
async function createMessages() {
    await (0, connection_1.queryExecuter)(`
        CREATE TABLE IF NOT EXISTS contact (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            phone VARCHAR(255),
            email_subject VARCHAR(255),
            email_description LONGTEXT,
            date DATE,
            date_time DATETIME,
            is_archived BOOLEAN
        )`);
    for (let i = 0; i < NUM_MESSAGES; i++) {
        const messagesInput = {
            "name": faker_1.faker.person.fullName(),
            "email": faker_1.faker.internet.email(),
            "phone": faker_1.faker.phone.number(),
            "email_subject": faker_1.faker.word.verb(),
            "email_description": faker_1.faker.lorem.words({ min: 10, max: 15 }),
            "date": faker_1.faker.date.recent(),
            "date_time": faker_1.faker.date.anytime(),
            "is_archived": faker_1.faker.datatype.boolean()
        };
        await contact_1.contactService.createContact(messagesInput);
    }
}
(async () => {
    await createRooms();
    await createBookings();
    await createUsers();
    await createMessages();
    await createAmenitiesToRoom();
    await createRoomPhotos();
})();
