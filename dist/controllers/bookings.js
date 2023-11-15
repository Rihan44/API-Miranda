"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsController = void 0;
const express_1 = require("express");
const bookings_1 = require("../services/bookings");
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get('/', async (_req, res, next) => {
    try {
        const result = await bookings_1.bookingService.getAllBookings();
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.bookingsController.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await bookings_1.bookingService.getById(id);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.bookingsController.post('/', async (req, res, next) => {
    try {
        const bookingCreated = req.body;
        const result = await bookings_1.bookingService.createBooking(bookingCreated);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.bookingsController.put('/:id', async (req, res, next) => {
    try {
        const bookingUpdated = await bookings_1.bookingService.updateBooking(req.params.id, req.body);
        res.json({ bookingUpdated, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.bookingsController.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await bookings_1.bookingService.delete(id);
        res.json({ result, success: true });
    }
    catch (error) {
        next(error);
    }
});
