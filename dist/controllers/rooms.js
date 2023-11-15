"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomController = void 0;
const express_1 = require("express");
const rooms_1 = require("../services/rooms");
exports.roomController = (0, express_1.Router)();
exports.roomController.get('/', async (_req, res, next) => {
    try {
        const rooms = await rooms_1.roomsService.getAllRooms();
        res.json({ rooms, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.roomController.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const rooms = await rooms_1.roomsService.getById(id);
        res.json({ rooms });
    }
    catch (error) {
        next(error);
    }
});
exports.roomController.post('/', async (req, res, next) => {
    try {
        const roomCreated = req.body;
        const rooms = await rooms_1.roomsService.createRoom(roomCreated);
        res.json({ rooms });
    }
    catch (error) {
        next(error);
    }
});
exports.roomController.put('/:id', async (req, res, next) => {
    try {
        const room = await rooms_1.roomsService.updateRoom(req.params.id, req.body);
        res.json({ room });
    }
    catch (error) {
        next(error);
    }
});
exports.roomController.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const room = await rooms_1.roomsService.delete(id);
        res.json({ room, success: true });
    }
    catch (error) {
        next(error);
    }
});
