import mongoose, { Schema } from "mongoose";
import { IRooms } from "../interfaces/Irooms";

const roomsSchema = new Schema<IRooms>({
    room_photo: {type: String},
    room_type: {type: String},
    room_number: {type: String},
    amenities: {type: []},
    price: {type: String},
    offer_price: {type: Boolean},
    discount: {type: Number},
    status: {type: String},
    description: {type: String}
});

export const RoomsModel = mongoose.model<IRooms>('rooms', roomsSchema);