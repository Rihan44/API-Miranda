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
exports.bookingsController = void 0;
const express_1 = require("express");
const bookingData_1 = require("../data/bookingData");
const bookings_1 = require("../services/bookings");
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(bookingData_1.bookingData);
    try {
        const result = bookings_1.bookingService.getAllBookings();
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`Error ${error}`);
    }
}));
exports.bookingsController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield bookings_1.bookingService.getById(id);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`Error ${error}`);
    }
}));
exports.bookingsController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200);
    /* res.status(se ha actualizado) */
}));
exports.bookingsController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield bookings_1.bookingService.delete(id);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`Error ${error}`);
    }
}));
