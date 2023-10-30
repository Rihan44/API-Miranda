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
exports.bookingService = void 0;
const bookings_model_1 = require("../models/bookings.model");
function getAllBookings() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield bookings_model_1.BookingsModel.find();
        return result;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking = yield bookings_model_1.BookingsModel.findById(id).exec();
        return booking;
    });
}
function createBooking(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield bookings_model_1.BookingsModel.create(booking);
        return result;
    });
}
function updateBooking(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('No existe el id');
        yield bookings_model_1.BookingsModel.findByIdAndUpdate(id, updateData);
        return updateData;
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bookings_model_1.BookingsModel.findByIdAndRemove(id);
        return 'Booking eliminado';
    });
}
exports.bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};
