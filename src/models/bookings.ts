import mongoose, { Schema } from "mongoose";

const bookingsSchema = new Schema({
    id: String,
    guest: String,
    phone_number: String,
    order_date: String,
    check_in: String,
    check_out: String,
    special_request: String,
    roomId: String,
    room_type: String, 
    room_number: Number,
    status: String, 
    price: Number,
});

export const BookingsModel = mongoose.model('boookings', bookingsSchema);