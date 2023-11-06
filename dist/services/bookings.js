"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const bookings_model_1 = require("../models/bookings.model");
async function getAllBookings() {
    const result = await (0, bookings_model_1.getAll)();
    return result;
}
async function getById(id) {
    const booking = await (0, bookings_model_1.getOne)(id);
    return booking;
}
async function createBooking(booking) {
    const result = await (0, bookings_model_1.createNewBooking)(booking);
    return result;
}
async function updateBooking(id, updateData) {
    if (!id)
        throw new Error('No existe el id');
    await (0, bookings_model_1.updateTheBooking)(id, updateData);
    return updateData;
}
async function _delete(id) {
    if (!id)
        throw new Error('No existe el id');
    await (0, bookings_model_1.deleteBooking)(id);
    return;
}
exports.bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};
