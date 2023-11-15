"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsService = void 0;
const rooms_model_1 = require("../models/rooms.model");
async function getAllRooms() {
    const result = await rooms_model_1.RoomsModel.find();
    return result;
}
async function getById(id) {
    const room = await rooms_model_1.RoomsModel.findById(id).exec();
    if (room === undefined || id.length === 0)
        throw new Error('El id no existe');
    return room;
}
async function createRoom(room) {
    const result = await rooms_model_1.RoomsModel.create(room);
    return result;
}
async function updateRoom(id, updateData) {
    if (!id)
        throw new Error('Falta el id');
    await rooms_model_1.RoomsModel.findByIdAndUpdate(id, updateData);
    return updateData;
}
async function _delete(id) {
    /* TODO TIRAR UN ERROR 410  */
    if (!id)
        throw new Error('Falta el id');
    await rooms_model_1.RoomsModel.findByIdAndDelete(id);
    return;
}
exports.roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};
