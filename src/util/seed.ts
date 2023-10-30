import { BookingsModel } from "../models/bookings.model";
import ConectionMongo from "./conection";

ConectionMongo();

BookingsModel.create(
    {
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
    }
);