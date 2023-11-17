import mongoose, { Schema } from "mongoose";
import { IRooms } from "../interfaces/Irooms";

const roomsSchema = new Schema<IRooms>({
    room_photo: {type: String},
    room_type: {type: String},
    room_number: {type: Number, unique: true},
    amenities: {type: []},
    price: {type: Number},
    discount: {type: Number},
    status: {type: String},
    description: {type: String}
});

export const RoomsModel = mongoose.model<IRooms>('rooms', roomsSchema);