"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const connection_1 = require("../utils/connection");
async function getAllBookings() {
    const query = "SELECT * FROM bookings";
    const row = await (0, connection_1.queryExecuter)(query);
    return row;
}
async function getById(id) {
    const query = 'SELECT * FROM bookings WHERE id = ?';
    const row = await (0, connection_1.queryExecuter)(query, [id]);
    return row;
}
async function createBooking(booking) {
    const order_date = new Date(booking.order_date);
    const check_in = new Date(booking.check_in);
    const check_out = new Date(booking.check_out);
    const data = [
        booking.guest,
        booking.phone_number,
        order_date,
        check_in,
        check_out,
        booking.special_request,
        booking.price,
        booking.room_id
    ];
    const query = `INSERT INTO bookings (guest, phone_number, order_date, check_in, check_out, special_request, price, room_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await (0, connection_1.queryExecuter)(query, data);
}
async function updateBooking(id, updateData) {
    const order_date = new Date(updateData.order_date);
    const check_in = new Date(updateData.check_in);
    const check_out = new Date(updateData.check_out);
    const query = 'UPDATE bookings SET guest = ?, phone_number = ?,order_date = ?, check_in = ?, check_out = ?, special_request = ?, price = ? WHERE id = ?';
    const dataUpdated = [
        updateData.guest,
        updateData.phone_number,
        order_date,
        check_in,
        check_out,
        updateData.special_request,
        updateData.price,
        id
    ];
    await (0, connection_1.queryExecuter)(query, dataUpdated);
}
async function _delete(id) {
    const query = 'DELETE FROM bookings WHERE id = ?';
    await (0, connection_1.queryExecuter)(query, [id]);
}
exports.bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};
