import { IRooms } from "../interfaces/Irooms";
import { createNewRoom, deleteRoom, getAll, getOne, updateTheRoom } from "../models/rooms.model";

async function getAllRooms() {
    
    const result = await getAll();
    return result;
}

async function getById(id: string) {
    const room = await getOne(id);
	if (room === undefined || id.length === 0) throw new Error('El id no existe')
    return room;
}

async function createRoom(room: IRooms) {
    await createNewRoom(room);
    return room;
}

async function updateRoom(id: string, updateData: IRooms) {
    if(!id) throw new Error('Falta el id')
    await updateTheRoom(id, updateData);
    return updateData;
}

async function _delete(id: string) {
    /* TODO TIRAR UN ERROR 410  */
    if(!id) throw new Error('Falta el id');
    await deleteRoom(id);
    return;
}

export const roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};