"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsService = void 0;
const connection_1 = require("../utils/connection");
async function getAllRooms() {
    const query = `
      SELECT
        r.*,
        COALESCE(GROUP_CONCAT(DISTINCT rp.room_photo_url), 'https://tinyurl.com/RoomPhoto1') AS all_photos,
        COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), 'Free Wifi, TV, Mini Bar') AS all_amenities
      FROM rooms r
      LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
      LEFT JOIN amenities a ON (atr.amenity_id = a.id AND atr.room_id = r.id)
      LEFT JOIN room_photos rp ON r.id = rp.room_id
      GROUP BY r.id`;
    const row = await (0, connection_1.queryExecuter)(query);
    return row;
}
async function getById(id) {
    const query = `
    SELECT
      r.*,
      GROUP_CONCAT(DISTINCT rp.room_photo_url) AS all_photos,
      COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), 'Free Wifi, TV') AS all_amenities
    FROM rooms r
    LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
    LEFT JOIN amenities a ON (atr.amenity_id = a.id AND atr.room_id = r.id)
    LEFT JOIN room_photos rp ON r.id = rp.room_id WHERE r.id = ?
    GROUP BY r.id`;
    const row = await (0, connection_1.queryExecuter)(query, [id]);
    return row;
}
async function createRoom(room) {
    const data = [
        room.room_type,
        room.room_number,
        room.price,
        room.offer_price,
        room.discount,
        room.status,
        room.description,
    ];
    const query = 'INSERT INTO rooms (room_type, room_number, price, offer_price, discount, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const row = await (0, connection_1.queryExecuter)(query, data);
    for (let i = 0; i < 5; i++) {
        let amenityID = Math.floor(Math.random() * 11) + 1;
        if (amenityID === amenityID) {
            amenityID = Math.floor(Math.random() * 11) + 1;
            await (0, connection_1.queryExecuter)(`INSERT INTO amenity_to_room (room_id, amenity_id) VALUES(${row.insertId}, ${amenityID})`);
        }
        else {
            amenityID = Math.floor(Math.random() * 11) + 1;
        }
    }
}
async function updateRoom(id, updateData) {
    const query = `UPDATE rooms SET room_type =?, room_number = ?, price = ?, offer_price = ?, discount = ?, status = ?, description = ? WHERE id = ?`;
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
    await (0, connection_1.queryExecuter)(query, dataUpdated);
}
async function _delete(id) {
    const deleteBooking = 'DELETE FROM bookings WHERE room_id = ?';
    await (0, connection_1.queryExecuter)(deleteBooking, [id]);
    const deleteAmenity = 'DELETE FROM amenity_to_room WHERE room_id = ?';
    await (0, connection_1.queryExecuter)(deleteAmenity, [id]);
    const query = 'DELETE FROM rooms WHERE id = ?';
    await (0, connection_1.queryExecuter)(query, [id]);
}
exports.roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};
