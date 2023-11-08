"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsService = void 0;
const connection_1 = require("../utils/connection");
let query = '';
async function getAllRooms() {
    query = `
      SELECT
        r.*,
        GROUP_CONCAT(DISTINCT rp.room_photo_url) AS all_photos,
        COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), 'Free Wifi, TV') AS all_amenities
      FROM rooms r
      LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
      LEFT JOIN amenities a ON (atr.amenity_id = a.id AND atr.room_id = r.id)
      LEFT JOIN room_photos rp ON r.id = rp.id
      GROUP BY r.id`;
    const row = (0, connection_1.queryExecuter)(query);
    return row;
}
async function getById(id) {
    query = `
    SELECT
      r.*,
      GROUP_CONCAT(DISTINCT rp.room_photo_url) AS all_photos,
      COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), 'Free Wifi, TV') AS all_amenities
    FROM rooms r
    LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
    LEFT JOIN amenities a ON (atr.amenity_id = a.id AND atr.room_id = r.id)
    LEFT JOIN room_photos rp ON r.id = rp.id WHERE r.id = ?
    GROUP BY r.id`;
    const row = (0, connection_1.queryExecuter)(query, [id]);
    return row;
}
async function createRoom(room) {
    // TODO CREAR LA FOTO Y AMENITY
    const data = [
        room.room_type,
        room.room_number,
        room.price,
        room.offer_price,
        room.discount,
        room.status,
        room.description,
    ];
    query = 'INSERT INTO rooms (room_type, room_number, price, offer_price, discount, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const row = (0, connection_1.queryExecuter)(query, data);
    return row;
}
async function updateRoom(id, updateData) {
    // TODO HACERLO CON ?
    query = `UPDATE rooms SET room_type =?, room_number = ?, price = ?, offer_price = ?, discount = ?, status = ?, description = ? WHERE id = ?`;
    const dataUpdated = [
        updateData.room_type,
        updateData.room_number,
        updateData.price,
        updateData.offer_price,
        updateData.discount,
        updateData.status,
        updateData.description,
        id
    ];
    const row = (0, connection_1.queryExecuter)(query, dataUpdated);
    return row;
}
async function _delete(id) {
    const deleteBooking = 'DELETE FROM bookings WHERE room_id = ?';
    (0, connection_1.queryExecuter)(deleteBooking, [id]);
    const deleteAmenity = 'DELETE FROM amenity_to_room WHERE room_id = ?';
    (0, connection_1.queryExecuter)(deleteAmenity, [id]);
    query = 'DELETE FROM rooms WHERE id = ?';
    const row = (0, connection_1.queryExecuter)(query, [id]);
    return row;
}
exports.roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};
