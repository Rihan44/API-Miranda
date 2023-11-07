import { IRooms } from "../interfaces/Irooms";
import ConnectionSQL from "../utils/connection";

const connection = ConnectionSQL();

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

async function fetchOne(id: string) {
    const connect = await connection;
    const [rows] = await connect.execute(   `
    SELECT
      r.*,
      GROUP_CONCAT(DISTINCT rp.room_photo_url) AS all_photos,
      COALESCE(GROUP_CONCAT(DISTINCT a.amenity_name), '') AS all_amenities
    FROM rooms r
    LEFT JOIN amenity_to_room atr ON r.id = atr.room_id
    LEFT JOIN amenities a ON (atr.amenity_id = a.id AND atr.room_id = r.id)
    LEFT JOIN room_photos rp ON r.id = rp.id WHERE r.id = ${id}
    GROUP BY r.id;
  `
    );

    return rows;
}

async function create(roomData: IRooms) {
    const connect = await connection;
    const [rows] = await connect.execute(`INSERT INTO rooms (room_type, room_number, price, offer_price, discount, status, description) 
    VALUES ('${roomData.room_type}', ${roomData.room_number}, ${roomData.price}, ${roomData.offer_price}, ${roomData.discount},
        '${roomData.status}', '${roomData.description}')`);

    return rows;
}

async function update(id: string, roomData: IRooms) {
    const connect = await connection;
    const [rows] = await connect.execute(`UPDATE rooms SET room_type ='${roomData.room_type}', room_number = '${roomData.room_number}',
    price = '${roomData.price}', offer_price = '${roomData.offer_price}', discount = '${roomData.discount}', status = '${roomData.status}'
    , description = '${roomData.description}' WHERE id = ${id}`);

    return rows;
}

async function deleteOne(id: string) {
    const connect = await connection;
    await connect.execute(`DELETE FROM bookings WHERE room_id = ${id}`);
    await connect.execute(`DELETE FROM amenity_to_room WHERE room_id = ${id}`);
    
    const [rows] = await connect.execute(`DELETE FROM rooms WHERE id = ${id}`);
    return rows;
}

export const getAll = fetchAll;
export const getOne = fetchOne;
export const deleteRoom = deleteOne;
export const createNewRoom = create;
export const updateTheRoom = update;
