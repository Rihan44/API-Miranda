import { IBookings } from "../interfaces/Ibookings";
import {queryExecuter} from "../utils/connection";

let query: string = '';
async function getAllBookings() {
    query = "SELECT * FROM bookings";
    const row = queryExecuter(query);
    return row;
}

async function getById(id: string) {
    query = 'SELECT * FROM bookings WHERE id = ?';
    const row = queryExecuter(query, [id]);
    return row;
}

async function createBooking(booking: IBookings) {
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

    query = `INSERT INTO bookings (guest, phone_number, order_date, check_in, check_out, special_request, price, room_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;  

    const row = queryExecuter(query, data);
    return row;
}

async function updateBooking(id: string, updateData: IBookings) {
    const order_date = new Date(updateData.order_date);
    const check_in = new Date(updateData.check_in);
    const check_out = new Date(updateData.check_out);

    query = 'UPDATE bookings SET guest = ?, phone_number = ?,order_date = ?, check_in = ?, check_out = ?, special_request = ?, price = ? WHERE id = ?';

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

    const row = queryExecuter(query, dataUpdated);
    return row;
}

async function _delete(id: string) {
    query = 'DELETE FROM bookings WHERE id = ?';
    const row = queryExecuter(query, [id]);
    return row;
}

export const bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};