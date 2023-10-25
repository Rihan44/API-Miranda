import {roomsData} from "../data/roomsData";
import { IRooms } from "../models/Irooms";

export const rooms = roomsData as IRooms[];

async function getAllRooms() {
    const result = await rooms;
    return result;
}

async function getById(id: number) {
    const room = await rooms.find(data => data.id === id.toString());
    return room;
}

async function createRoom(room: IRooms) {
    await rooms.push(room);
    return rooms;
}

async function updateRoom(id: number, updateData: Partial<IRooms>) {
    rooms.map((data) => {
        if (data.id == id.toString()) {
            return {
                ...data,
                ...updateData
            }
        }
        return data;
    })
}

async function _delete(id: number) {
    const roomsUpdated: IRooms[] = await rooms.filter(data => data.id !== id.toString());
    return roomsUpdated;
}

export const roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};