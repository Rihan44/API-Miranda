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
const roomsData_1 = require("../data/roomsData");
exports.roomController = (0, express_1.Router)();
exports.roomController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(roomsData_1.roomsData);
    try {
        const result = rooms_1.roomsService.getAllRooms();
        res.json(result);
    }
    catch (error) {
        res.status(500).send(`Error al recoger todas las rooms ${error}`);
    }
}));
exports.roomController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield rooms_1.roomsService.getById(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(`Error al recoger una room ${error}`);
    }
}));
exports.roomController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomCreate = req.body;
        const result = yield rooms_1.roomsService.createRoom(roomCreate);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(`Error al crear una room ${error}`);
    }
}));
exports.roomController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield rooms_1.roomsService.getById(parseInt(req.params.id));
        yield rooms_1.roomsService.updateRoom(parseInt(req.params.id), req.body);
        res.json(room);
    }
    catch (error) {
        res.status(500).send(`Error al actualizar la room ${error}`);
    }
}));
exports.roomController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield rooms_1.roomsService.delete(id);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`Error al borrar la room ${error}`);
    }
}));
