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
exports.roomsService = void 0;
const rooms_model_1 = require("../models/rooms.model");
function getAllRooms() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield rooms_model_1.RoomsModel.find();
        return result;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield rooms_model_1.RoomsModel.findById(id).exec();
        if (room === undefined || id.length === 0)
            throw new Error('El id no existe');
        return room;
    });
}
function createRoom(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield rooms_model_1.RoomsModel.create(room);
        return result;
    });
}
function updateRoom(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('No existe el id');
        yield rooms_model_1.RoomsModel.findByIdAndUpdate(id, updateData);
        return updateData;
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('No existe el id');
        yield rooms_model_1.RoomsModel.findByIdAndDelete(id);
        return;
    });
}
exports.roomsService = {
    getAllRooms,
    getById,
    createRoom,
    updateRoom,
    delete: _delete,
};
