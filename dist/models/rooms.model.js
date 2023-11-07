"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTheRoom = exports.createNewRoom = exports.deleteRoom = exports.getOne = exports.getAll = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
const connection = (0, connection_1.default)();
async function fetchAll() {
    const connect = await connection;
    const [rows] = await connect.execute(`
    SELECT
      r.*,
      GROUP_CONCAT(DISTINCT rp.room_photo_url) AS all_photos,
      COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), '') AS all_amenities
    FROM rooms r
    LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
    LEFT JOIN amenities a ON (atr.amenity_id = a.id AND atr.room_id = r.id)
    LEFT JOIN room_photos rp ON r.id = rp.id
    GROUP BY r.id;
  `);
    return rows;
}
async function fetchOne(id) {
    const connect = await connection;
    const [rows] = await connect.execute(`
    SELECT
      r.*,
      GROUP_CONCAT(DISTINCT rp.room_photo_url) AS all_photos,
      COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), '') AS all_amenities
    FROM rooms r
    LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
    LEFT JOIN amenities a ON (atr.amenity_id = a.id AND atr.room_id = r.id)
    LEFT JOIN room_photos rp ON r.id = rp.id WHERE r.id = ${id}
    GROUP BY r.id;
  `);
    return rows;
}
async function create(roomData) {
    const connect = await connection;
    const [rows] = await connect.execute(`INSERT INTO rooms (room_type, room_number, price, offer_price, discount, status, description) 
    VALUES ('${roomData.room_type}', ${roomData.room_number}, ${roomData.price}, ${roomData.offer_price}, ${roomData.discount},
        '${roomData.status}', '${roomData.description}')`);
    return rows;
}
async function update(id, roomData) {
    const connect = await connection;
    const [rows] = await connect.execute(`UPDATE rooms SET room_type ='${roomData.room_type}', room_number = '${roomData.room_number}',
    price = '${roomData.price}', offer_price = '${roomData.offer_price}', discount = '${roomData.discount}', status = '${roomData.status}'
    , description = '${roomData.description}' WHERE id = ${id}`);
    return rows;
}
async function deleteOne(id) {
    const connect = await connection;
    await connect.execute(`DELETE FROM bookings WHERE room_id = ${id}`);
    await connect.execute(`DELETE FROM amenity_to_room WHERE room_id = ${id}`);
    const [rows] = await connect.execute(`DELETE FROM rooms WHERE id = ${id}`);
    return rows;
}
exports.getAll = fetchAll;
exports.getOne = fetchOne;
exports.deleteRoom = deleteOne;
exports.createNewRoom = create;
exports.updateTheRoom = update;
