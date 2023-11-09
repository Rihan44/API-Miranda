"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const connection_1 = require("../utils/connection");
async function getAllBookings() {
    const query = `SELECT
        r.*, b.*,
            GROUP_CONCAT(DISTINCT r.room_type) AS room_type,
            GROUP_CONCAT(DISTINCT r.room_number) AS room_number,
            GROUP_CONCAT(DISTINCT r.description) AS description,
            GROUP_CONCAT(DISTINCT r.offer_price) AS offer_price,
            COALESCE(GROUP_CONCAT(DISTINCT rp.room_photo_url), 'https://tinyurl.com/RoomPhoto1') AS all_photos,
            COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), 'Free Wifi, TV, Mini Bar') AS all_amenities
        FROM bookings b
        LEFT JOIN rooms r ON r.id = b.room_id
        LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
        LEFT JOIN amenities a ON atr.amenity_id = a.id AND atr.room_id = r.id
        LEFT JOIN room_photos rp ON r.id = rp.room_id
        GROUP BY b.id`;
    const row = await (0, connection_1.queryExecuter)(query);
    return row;
}
async function getById(id) {
    const query = `SELECT
        r.*, b.*,
        GROUP_CONCAT(DISTINCT r.room_type) AS room_type,
        GROUP_CONCAT(DISTINCT r.room_number) AS room_number,
        GROUP_CONCAT(DISTINCT r.description) AS description,
        GROUP_CONCAT(DISTINCT r.offer_price) AS offer_price,
        COALESCE(GROUP_CONCAT(DISTINCT rp.room_photo_url), 'https://tinyurl.com/RoomPhoto1') AS all_photos,
        COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), 'Free Wifi, TV') AS all_amenities
        FROM bookings b
        LEFT JOIN rooms r ON r.id = b.room_id
        LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
        LEFT JOIN amenities a ON atr.amenity_id = a.id AND atr.room_id = r.id WHERE b.id = ?
        LEFT JOIN room_photos rp ON r.id = rp.room_id
    GROUP BY b.id`;
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
