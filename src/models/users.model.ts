import mongoose, { Schema } from "mongoose";
import { IUsers } from "../interfaces/Iusers";

const usersSchema = new Schema<IUsers>({
    name: {type: String},
    email: {type: String},
    photo: {type: String},
    employee_position: {type: String},
    phone_number: {type: String},
    hire_date: {type: String},
    job_description: {type: String},
    status: {type: Boolean},
    password_hash: {type: String}
});

export const UsersModel = mongoose.model<IUsers>('users', usersSchema);