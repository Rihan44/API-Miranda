import mongoose, { Schema } from "mongoose";
import { IContact } from "../interfaces/Icontact";

const messageSchema = new Schema<IContact>({
    "name": {type: String},
    "email": {type: String},
    "phone": {type: String},
    "email_subject": {type: String},
    "email_description": {type: String},
    "date": {type: String},
    "dateTime": {type: String},
    "isArchived": {type: Boolean}
});

export const MessageModel = mongoose.model<IContact>('messages', messageSchema);