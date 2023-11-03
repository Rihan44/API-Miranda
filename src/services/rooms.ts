import { IRooms } from "../interfaces/Irooms";
import { RoomsModel } from "../models/rooms.model";

async function getAllRooms() {
    const result = await RoomsModel.find();
    return result;
}

async function getById(id: string) {
    const room = await RoomsModel.findById(id).exec();
	if (room === undefined || id.length === 0) throw new Error('El id no existe')
    return room;
}

async function createRoom(room: IRooms) {
    const result = await RoomsModel.create(room);
    return result;
}

async function updateRoom(id: string, updateData: Partial<IRooms>) {
    if(!id) throw new Error('Falta el id')
    await RoomsModel.findByIdAndUpdate(id, updateData);
    return updateData;
}

async function _delete(id: string) {
    /* TODO TIRAR UN ERROR 410  */
    if(!id) throw new Error('Falta el id');
    await RoomsModel.findByIdAndDelete(id);
    return;
}

export const roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};