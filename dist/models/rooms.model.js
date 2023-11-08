"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewRoom = exports.getOne = exports.getAll = void 0;
const connection_1 = require("../utils/connection");
async function fetchAll() {
    const query = `
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
async function fetchOne(id) {
    const query = `
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
async function create(roomData) {
    const data = [
        roomData.room_type,
        roomData.room_number,
        roomData.price,
        roomData.offer_price,
        roomData.discount,
        roomData.status,
        roomData.description,
    ];
    const query = 'INSERT INTO rooms (room_type, room_number, price, offer_price, discount, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const row = (0, connection_1.queryExecuter)(query, data);
    return row;
}
// async function update(id: string, roomData: IRooms) {
//   // TODO HACERLO CON ?
//     const [rows] = await connection.promise().query(`UPDATE rooms SET room_type ='${roomData.room_type}', room_number = '${roomData.room_number}',
//     price = '${roomData.price}', offer_price = '${roomData.offer_price}', discount = '${roomData.discount}', status = '${roomData.status}'
//     , description = '${roomData.description}' WHERE id = ${id}`);
//     return rows;
// }
// async function deleteOne(id: string) {
//   // TODO HACERLO CON ?
//     await connection.promise().query(`DELETE FROM bookings WHERE room_id = ${id}`);
//     await connection.promise().query(`DELETE FROM amenity_to_room WHERE room_id = ${id}`);
//     const [rows] = await connection.promise().query(`DELETE FROM rooms WHERE id = ${id}`);
//     return rows;
// }
exports.getAll = fetchAll;
exports.getOne = fetchOne;
// export const deleteRoom = deleteOne;
exports.createNewRoom = create;
// export const updateTheRoom = update;
