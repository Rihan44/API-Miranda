"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsService = exports.rooms = void 0;
const roomsData_1 = require("../data/roomsData");
exports.rooms = roomsData_1.roomsData;
function getAllRooms() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.rooms;
        return result;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield exports.rooms.find(data => data.id === id.toString());
        if (room === undefined)
            throw new Error('El id no existe');
        return room;
    });
}
function createRoom(room) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.rooms.push(room);
        return exports.rooms;
    });
}
function updateRoom(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.rooms.map((data) => {
            if (data.id == id.toString()) {
                return Object.assign(Object.assign({}, data), updateData);
            }
            return data;
        });
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomsUpdated = yield exports.rooms.filter(data => data.id !== id.toString());
        return roomsUpdated;
    });
}
exports.roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};
