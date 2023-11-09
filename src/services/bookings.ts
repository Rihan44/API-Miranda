import { IBookings } from "../interfaces/Ibookings";
import {queryExecuter} from "../utils/connection";

async function getAllBookings() {
    const query = 
    `SELECT
        r.*, b.*,
        GROUP_CONCAT(DISTINCT r.room_type) AS room_type,
        GROUP_CONCAT(DISTINCT r.room_number) AS room_number,
        GROUP_CONCAT(DISTINCT r.description) AS description,
        GROUP_CONCAT(DISTINCT r.offer_price) AS offer_price,
        COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), 'Free Wifi, TV') AS all_amenities
        FROM bookings b
        LEFT JOIN rooms r ON r.id = b.room_id
        LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
        LEFT JOIN amenities a ON atr.amenity_id = a.id AND atr.room_id = r.id
    GROUP BY b.id`;

    const row = await queryExecuter(query);
    return row;
}

async function getById(id: string) {
    const query = `SELECT
        r.*, b.*,
        GROUP_CONCAT(DISTINCT r.room_type) AS room_type,
        GROUP_CONCAT(DISTINCT r.room_number) AS room_number,
        GROUP_CONCAT(DISTINCT r.description) AS description,
        GROUP_CONCAT(DISTINCT r.offer_price) AS offer_price,
        COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), 'Free Wifi, TV') AS all_amenities
        FROM bookings b
        LEFT JOIN rooms r ON r.id = b.room_id
        LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
        LEFT JOIN amenities a ON atr.amenity_id = a.id AND atr.room_id = r.id WHERE b.id = ?
    GROUP BY b.id`;
    const row = await queryExecuter(query, [id]);
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

    const query = `INSERT INTO bookings (guest, phone_number, order_date, check_in, check_out, special_request, price, room_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;  

    await queryExecuter(query, data);
}

async function updateBooking(id: string, updateData: IBookings) {
    const order_date = new Date(updateData.order_date);
    const check_in = new Date(updateData.check_in);
    const check_out = new Date(updateData.check_out);

    const query = 'UPDATE bookings SET guest = ?, phone_number = ?,order_date = ?, check_in = ?, check_out = ?, special_request = ?, price = ?, room_id = ? WHERE id = ?';

    const dataUpdated = [
        updateData.guest,
        updateData.phone_number,
        order_date,
        check_in,
        check_out,
        updateData.special_request,
        updateData.price,
        updateData.room_id,
        id
    ];

    await queryExecuter(query, dataUpdated);
}

async function _delete(id: string) {
    const query = 'DELETE FROM bookings WHERE id = ?';
    await queryExecuter(query, [id]);
}

export const bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};