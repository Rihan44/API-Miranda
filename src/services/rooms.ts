import { IRooms } from "../interfaces/Irooms";
import {queryExecuter} from "../utils/connection";

async function getAllRooms() {
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

    const row = await queryExecuter(query);
    return row;
}

async function getById(id: string) {
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

    const row = await queryExecuter(query, [id]);
    return row;
}

async function createRoom(room: IRooms) {
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
    await queryExecuter(`INSERT INTO room_photos (room_photo_url) VALUES('https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=2560')`);
    
    const row: any = await queryExecuter(query, data);

    for(let i = 0;  i < 5; i++){
      let amenityID = Math.floor(Math.random() * 11) + 1;
      if(amenityID === amenityID) {
        amenityID = Math.floor(Math.random() * 11) + 1;
        await queryExecuter(`INSERT INTO amenity_to_room (room_id, amenity_id) VALUES(${row.insertId}, ${amenityID})`);
      } else {
        amenityID = Math.floor(Math.random() * 11) + 1;
      }
    }
}

async function updateRoom(id: string, updateData: IRooms) {

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

    await queryExecuter(query, dataUpdated);
}
async function _delete(id: string) {

    const deleteBooking = 'DELETE FROM bookings WHERE room_id = ?';
    await queryExecuter(deleteBooking, [id]);
    const deleteAmenity = 'DELETE FROM amenity_to_room WHERE room_id = ?';
    await queryExecuter(deleteAmenity, [id]);
    
    const query = 'DELETE FROM rooms WHERE id = ?';
    await queryExecuter(query, [id]);
}

export const roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};