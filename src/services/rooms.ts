import {roomsData} from "../data/roomsData";
import { IRooms } from "../interfaces/Irooms";

export const rooms = roomsData as IRooms[];

async function getAllRooms() {
    const result = await rooms;
    return result;
}

async function getById(id: string) {
    const room = await rooms.find(data => data.id === id.toString());
	if (room === undefined || id.length === 0) throw new Error('El id no existe')
    return room;
}

async function createRoom(room: IRooms) {
    return room;
}

async function updateRoom(id: string, updateData: Partial<IRooms>) {
    if(!id) throw new Error('No existe el id')
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id')
    return 'Room eliminada';
}

export const roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};