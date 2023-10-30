import mongoose, { Schema } from "mongoose";
import { IBookings } from "../interfaces/Ibookings";

const bookingsSchema = new Schema<IBookings>({
    guest: {type: String},
    phone_number: {type: String},
    order_date: {type: String},
    check_in: {type: String},
    check_out: {type: String},
    special_request: {type: String},
    roomID: {type: String},
    room_type: {type: String}, 
    room_number: {type: Number},
    status: {type: String}, 
    price: {type: Number},
});

export const BookingsModel = mongoose.model<IBookings>('bookings', bookingsSchema);