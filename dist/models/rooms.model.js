"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTheRoom = exports.createNewRoom = exports.deleteRoom = exports.getOne = exports.getAll = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
const connection = (0, connection_1.default)();
async function fetchAll() {
    // TODO HACER EL INNER JOIN CON AMENITIES Y PHOTO
    const connect = await connection;
    const [rows] = await connect.execute("SELECT * FROM rooms");
    // 'SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS all_photos, GROUP_CONCAT(a.amenities) AS all_amenities FROM room r LEFT JOIN photo p ON r.id = p.room_id LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id LEFT JOIN amenity a ON ahr.amenity_id = a.id GROUP BY r.id;')
    return rows;
}
async function fetchOne(id) {
    const connect = await connection;
    const [rows] = await connect.execute(`SELECT * FROM rooms WHERE id = ${id}`);
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
    const [rows] = await connect.execute(`DELETE FROM rooms WHERE id = ${id}`);
    return rows;
}
exports.getAll = fetchAll;
exports.getOne = fetchOne;
exports.deleteRoom = deleteOne;
exports.createNewRoom = create;
exports.updateTheRoom = update;
