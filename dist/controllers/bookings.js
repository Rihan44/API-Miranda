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
const bookings_1 = require("../services/bookings");
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bookings_1.bookingService.getAllBookings();
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield bookings_1.bookingService.getById(id);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingCreated = req.body;
        const result = yield bookings_1.bookingService.createBooking(bookingCreated);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingUpdated = yield bookings_1.bookingService.updateBooking(req.params.id, req.body);
        res.json({ bookingUpdated, success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield bookings_1.bookingService.delete(id);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
}));
