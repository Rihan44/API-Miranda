"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTheBooking = exports.createNewBooking = exports.deleteBooking = exports.getOne = exports.getAll = void 0;
const conection_1 = __importDefault(require("../utils/conection"));
const connection = (0, conection_1.default)();
async function fetchAll() {
    const pool = await connection;
    const [rows] = await pool.query("SELECT * FROM bookings");
    return rows;
}
async function fetchOne(id) {
    const pool = await connection;
    const [rows] = await pool.query(`SELECT * FROM bookings WHERE id = ${id}`);
    return rows;
}
async function create(bookingData) {
    const pool = await connection;
    const [rows] = await pool.query(`INTER INTO bookings (guest, phone_number, order_date, check_in, check_out, special_request, room_type
        , room_number, status, price, room_id) VALUES (${bookingData.guest}, ${bookingData.phone_number}, ${bookingData.order_date}, 
            ${bookingData.check_in}, ${bookingData.check_out}, ${bookingData.special_request}, ${bookingData.room_type}, 
            ${bookingData.room_number}, ${bookingData.status}, ${bookingData.price}, ${bookingData.room_id})`);
    return rows;
}
async function update(id, bookingData) {
    const pool = await connection;
    const [rows] = await pool.query(`UPDATE bookings SET guest ='${bookingData.guest}', phone_number = '${bookingData.phone_number}'
    , order_date = '${bookingData.order_date}', check_in = '${bookingData.check_in}', check_out = '${bookingData.check_out}'
    , special_request = '${bookingData.special_request}', room_type= '${bookingData.room_type}', room_number = '${bookingData.room_number}'
    , status = '${bookingData.status}', price = '${bookingData.price}' WHERE id = ${id}`);
    return rows;
}
async function deleteOne(id) {
    const pool = await connection;
    const [rows] = await pool.query(`DELETE * FROM bookings WHERE id = ${id}`);
    return rows;
}
exports.getAll = fetchAll;
exports.getOne = fetchOne;
exports.deleteBooking = deleteOne;
exports.createNewBooking = create;
exports.updateTheBooking = update;
