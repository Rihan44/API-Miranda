import { faker } from '@faker-js/faker';
import ConnectionSQL from "./connection";
import { createNewContact } from '../models/messages.model';
import { roomsService } from '../services/rooms';
import { bookingService } from '../services/bookings';
import { usersServices } from '../services/users';

const connection = ConnectionSQL();

const NUM_ROOMS = 10;
const NUM_BOOKINGS = 10;
const NUM_USERS = 10;
const NUM_MESSAGES = 10;

const rooms: any = [];

const roomType = ["Double Superior", "Single", "Deluxe", "Suite", "Imperial", "Double"];
const checks = ['check_in', 'check_out'];

async function createRooms() {
    const connect = await connection;

    await connect.execute(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INT AUTO_INCREMENT PRIMARY KEY,
            room_type VARCHAR(255),
            room_number VARCHAR(255),
            price DOUBLE,
            offer_price BOOLEAN,
            discount INT,
            status VARCHAR(255),
            description LONGTEXT
        )`
    );

    await connect.execute(`
        CREATE TABLE IF NOT EXISTS room_photos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            room_photo_url VARCHAR(255)
        )`
    );

    await connect.execute(`
        CREATE TABLE IF NOT EXISTS amenities (
            id INT AUTO_INCREMENT PRIMARY KEY,
            amenity_name VARCHAR(255)
        )`
    );

    await connect.execute(`
        CREATE TABLE IF NOT EXISTS room_photos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            room_id INT,
            room_photo_url VARCHAR(255),
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        )`
    );

    await connect.execute(`INSERT INTO amenities (amenity_name) VALUES('1/3 Bed Space'), ('24-Hour Guard'), ('Free Wifi'), ('Air Conditioner'), ('Television'), ('Towels'), ('Mini Bar'), ('Coffee Set'), ('Bathtub'), ('Jacuzzi'), ('Nice Views')`);

    for (let i = 0; i < NUM_ROOMS; i++) {

        const roomInput = {
            "room_photo": faker.image.url(),
            "room_type": roomType[faker.number.int({ min: 0, max: 5 })],
            "room_number": faker.number.int({ min: 1, max: 599 }),
            "price": faker.number.int({ min: 30, max: 3000 }),
            "offer_price": faker.datatype.boolean(),
            "discount": faker.number.int({ min: 1, max: 100 }),
            "status": "available",
            "description": faker.lorem.words({ min: 10, max: 15 })
        }
        const room = await roomsService.createRoom(roomInput);
        rooms.push(room);

        await connect.execute(`INSERT INTO room_photos (room_photo_url) VALUES('https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=2560')`);
    }
}

async function createAmenitiesToRoom() {
    const connect = await connection;
    
    await connect.execute(`
    CREATE TABLE IF NOT EXISTS amenity_to_room (
        room_id INT,
        amenity_id INT,
        FOREIGN KEY (room_id) REFERENCES rooms(id),
        FOREIGN KEY (amenity_id) REFERENCES amenities(id)
    )`);

    for (let i = 0; i < NUM_ROOMS; i++) {
        const roomID = Math.floor(Math.random() * NUM_ROOMS) + 1;
        const amenityID = Math.floor(Math.random() * NUM_ROOMS) + 1;

        await connect.execute(`INSERT INTO amenity_to_room (room_id, amenity_id) VALUES(${roomID}, ${amenityID})`);
    }
}

async function createBookings() {
    const connect = await connection;

    await connect.execute(`
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
        )`
    );

    for (let i = 0; i < NUM_BOOKINGS; i++) {
        const bookingsInput = {
            "guest": faker.person.fullName(),
            "phone_number": faker.phone.number('501-###-###'),
            "order_date": faker.date.anytime(),
            "check_in": faker.date.recent(),
            "check_out": faker.date.future(),
            "special_request": faker.lorem.words({ min: 5, max: 20 }),
            "room_type": roomType[faker.number.int({ min: 0, max: 5 })],
            "room_number": faker.number.int({ min: 1, max: 599 }),
            "status": checks[faker.number.int({ min: 0, max: 1 })],
            "price": faker.number.int({ min: 30, max: 3000 }),
            "room_id": 1 + i,
        }

        await bookingService.createBooking(bookingsInput);
    }
}

async function createUsers() {
    const connect = await connection;

    await connect.execute(`
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
            password_hash VARBINARY(60)
          )`
    );

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
        await usersServices.createUser(usersInput);
    }
}

async function createMessages() {
    const connect = await connection;

    await connect.execute(`
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
          )`
    );

    for (let i = 0; i < NUM_MESSAGES; i++) {
        const messagesInput = {
            "name": faker.person.fullName(),
            "email": faker.internet.email(),
            "phone": faker.phone.number(),
            "email_subject": faker.word.verb(),
            "email_description": faker.lorem.words({ min: 10, max: 15 }),
            "date": faker.date.recent(),
            "date_time": faker.date.anytime(),
            "is_archived": faker.datatype.boolean()
        }
        await createNewContact(messagesInput);
    }
}

(async () => {
    await createRooms();
    await createBookings();
    await createUsers();
    await createMessages();
    await createAmenitiesToRoom();
})();
