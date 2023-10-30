import mongoose, { Schema } from "mongoose";
import { IBookings } from "../interfaces/Ibookings";

const bookingsSchema = new Schema<IBookings>({
    guest: {type: String},
    phone_number: {type: String},
    order_date: {type: String},
    check_in: {type: String},
    check_out: {type: String},
    special_request: {type: String},
    room_type: {type: String}, 
    room_number: {type: String},
    status: {type: String}, 
    price: {type: String},
});

export const BookingsModel = mongoose.model<IBookings>('bookings', bookingsSchema);