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
exports.bookingService = exports.bookings = void 0;
const bookingData_1 = require("../data/bookingData");
exports.bookings = bookingData_1.bookingData;
function getAllBookings() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.bookings;
        return result;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking = yield exports.bookings.find(data => data.id === id.toString());
        if (booking === undefined)
            throw new Error('El id no existe');
        return booking;
    });
}
function createBooking(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.bookings.push(booking);
        return exports.bookings;
    });
}
function updateBooking(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.bookings.map((data) => {
            if (data.id == id.toString()) {
                return Object.assign(Object.assign({}, data), updateData);
            }
            return data;
        });
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookingsUpdated = yield exports.bookings.filter(data => data.id !== id.toString());
        return bookingsUpdated;
    });
}
exports.bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};
