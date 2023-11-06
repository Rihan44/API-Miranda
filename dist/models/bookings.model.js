"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTheBooking = exports.createNewBooking = exports.deleteBooking = exports.getOne = exports.getAll = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
const connection = (0, connection_1.default)();
async function fetchAll() {
    try {
        const connect = await connection;
        const [rows] = await connect.execute("SELECT * FROM bookings");
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}
async function fetchOne(id) {
    const connect = await connection;
    const [rows] = await connect.execute(`SELECT * FROM bookings WHERE id = ${id}`);
    return rows;
}
const formatDateForMySQL = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};
async function create(bookingData) {
    const connect = await connection;
    const [rows] = await connect.execute(`INSERT INTO bookings (guest, phone_number, order_date, check_in, check_out, special_request, room_type
        , room_number, status, price, room_id) VALUES ("${bookingData.guest}", '${bookingData.phone_number}', '${formatDateForMySQL(bookingData.order_date)}', 
            '${formatDateForMySQL(bookingData.check_in)}', '${formatDateForMySQL(bookingData.check_out)}', '${bookingData.special_request}', '${bookingData.room_type}', 
            '${bookingData.room_number}', '${bookingData.status}', ${bookingData.price}, ${bookingData.room_id})`);
    return rows;
}
async function update(id, bookingData) {
    const connect = await connection;
    const orderDate = new Date(bookingData.order_date);
    const checkIn = new Date(bookingData.check_in);
    const checkOut = new Date(bookingData.check_out);
    const [rows] = await connect.execute(`UPDATE bookings SET guest ='${bookingData.guest}', phone_number = '${bookingData.phone_number}'
    , order_date = '${formatDateForMySQL(orderDate)}', check_in = '${formatDateForMySQL(checkIn)}', check_out = '${formatDateForMySQL(checkOut)}'
    , special_request = '${bookingData.special_request}', room_type= '${bookingData.room_type}', room_number = '${bookingData.room_number}'
    , status = '${bookingData.status}', price = '${bookingData.price}' WHERE id = ${id}`);
    return rows;
}
async function deleteOne(id) {
    const connect = await connection;
    console.log(id);
    const [rows] = await connect.execute(`DELETE FROM bookings WHERE id = ${id}`);
    return rows;
}
exports.getAll = fetchAll;
exports.getOne = fetchOne;
exports.deleteBooking = deleteOne;
exports.createNewBooking = create;
exports.updateTheBooking = update;
