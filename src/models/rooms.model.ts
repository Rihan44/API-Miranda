import { IRooms } from "../interfaces/Irooms";
import ConnectionSQL from "../utils/connection";

const connection = ConnectionSQL();

async function fetchAll() {
    const pool = await connection;
    const [rows] = await pool.query("SELECT * FROM rooms");
    return rows;
}

async function fetchOne(id: string) {
    const pool = await connection;
    const [rows] = await pool.query(`SELECT * FROM rooms WHERE id = ${id}`);
    return rows;
}

async function create(roomData: IRooms) {
    const pool = await connection;
    const [rows] = await pool.query(`INTER INTO rooms (room_type, room_number, price, offer_price, discount, status, description) 
    VALUES (${roomData.room_type}, ${roomData.room_number}, ${roomData.price}, ${roomData.offer_price}, ${roomData.discount}
        , ${roomData.status}, ${roomData.description})`);

    return rows;
}

async function update(id: string, roomData: IRooms) {
    const pool = await connection;
    const [rows] = await pool.query(`UPDATE rooms SET room_type ='${roomData.room_type}', room_number = '${roomData.room_number}',
    price = '${roomData.price}', offer_price = '${roomData.offer_price}', discount = '${roomData.discount}', status = '${roomData.status}'
    , description = '${roomData.description}' WHERE id = ${id}`);

    return rows;
}

async function deleteOne(id: string) {
    const pool = await connection;
    const [rows] = await pool.query(`DELETE * FROM rooms WHERE id = ${id}`);
    return rows;
}

export const getAll = fetchAll;
export const getOne = fetchOne;
export const deleteRoom = deleteOne;
export const createNewRoom = create;
export const updateTheRoom = update;
