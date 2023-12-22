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
exports.roomController = void 0;
const express_1 = require("express");
const rooms_1 = require("../services/rooms");
exports.roomController = (0, express_1.Router)();
exports.roomController.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield rooms_1.roomsService.getAllRooms();
        res.json({ rooms, success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.roomController.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const rooms = yield rooms_1.roomsService.getById(id);
        res.json({ rooms });
    }
    catch (error) {
        next(error);
    }
}));
exports.roomController.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomCreated = req.body;
        const rooms = yield rooms_1.roomsService.createRoom(roomCreated);
        res.json({ rooms });
    }
    catch (error) {
        next(error);
    }
}));
exports.roomController.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield rooms_1.roomsService.updateRoom(req.params.id, req.body);
        res.json({ room });
    }
    catch (error) {
        next(error);
    }
}));
exports.roomController.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const room = yield rooms_1.roomsService.delete(id);
        res.json({ room, success: true });
    }
    catch (error) {
        next(error);
    }
}));
