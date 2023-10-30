import { BookingsModel } from "../models/bookings.model";
import { faker } from '@faker-js/faker';
import ConectionMongo from "./conection";
import { IBookings } from "../interfaces/Ibookings";
import { RoomsModel } from "../models/rooms.model";

ConectionMongo();

const NUM_ROOMS = 10;
const NUM_BOOKINGS = 10;

const rooms: any = [];

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
]

const roomType = ["Double Superior", "Single", "Deluxe", "Suite", "Imperial", "Double"];

async function createRooms() {
    
for (let i = 0; i < NUM_ROOMS; i++) {
    const roomInput = {
        "room_photo": "https://example.com/room1.jpg",
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
            "Nice Views"
        ],
        "price": faker.number.int({ min: 30, max: 3000 }),
        "offer_price": faker.datatype.boolean(),
        "discount": faker.number.int({ min: 1, max: 100 }),
        "status": "available",
        "description": faker.lorem.words({ min: 10, max: 15 })
    }

    const room = await RoomsModel.create(roomInput);

    rooms.push(room);

    }
}

createRooms();

console.log(rooms)

async function createBookings() {
    for (let i = 0; i < NUM_BOOKINGS; i++) {
        const bookingsInput = { 
            "guest": "Angel",
            "phone_number": "+1 123-456-7890",
            "order_date": "2024-12-27",
            "check_in": "2023-10-05",
            "check_out": "2023-10-10",
            "special_request": "Please provide extra towels.",
            "roomID": rooms[faker.number.int({ min: 0, max: 10 })].id,
            "room_type": "Deluxe",
            "room_number": 49,
            "status": "check_in",
            "price": 245.89
        }
    
        await BookingsModel.create(bookingsInput);
    }
}

createBookings();

