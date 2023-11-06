"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsService = void 0;
const rooms_model_1 = require("../models/rooms.model");
async function getAllRooms() {
    const result = await (0, rooms_model_1.getAll)();
    return result;
}
async function getById(id) {
    const room = await (0, rooms_model_1.getOne)(id);
    if (room === undefined || id.length === 0)
        throw new Error('El id no existe');
    return room;
}
async function createRoom(room) {
    await (0, rooms_model_1.createNewRoom)(room);
    return room;
}
async function updateRoom(id, updateData) {
    if (!id)
        throw new Error('Falta el id');
    await (0, rooms_model_1.updateTheRoom)(id, updateData);
    return updateData;
}
async function _delete(id) {
    /* TODO TIRAR UN ERROR 410  */
    if (!id)
        throw new Error('Falta el id');
    await (0, rooms_model_1.deleteRoom)(id);
    return;
}
exports.roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};
