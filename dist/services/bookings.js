"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const bookings_model_1 = require("../models/bookings.model");
async function getAllBookings() {
    const result = await bookings_model_1.BookingsModel.find();
    return result;
}
async function getById(id) {
    const booking = await bookings_model_1.BookingsModel.findById(id).exec();
    return booking;
}
async function createBooking(booking) {
    const result = await bookings_model_1.BookingsModel.create(booking);
    return result;
}
async function updateBooking(id, updateData) {
    if (!id)
        throw new Error('No existe el id');
    await bookings_model_1.BookingsModel.findByIdAndUpdate(id, updateData);
    return updateData;
}
async function _delete(id) {
    if (!id)
        throw new Error('No existe el id');
    await bookings_model_1.BookingsModel.findByIdAndDelete(id);
    return;
}
exports.bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};
