"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.bookingService = exports.bookings = exports.BookingsModel = void 0;
const bookingData_1 = require("../data/bookingData");
const mongoose_1 = __importStar(require("mongoose"));
const bookingsSchema = new mongoose_1.Schema({
    id: String,
    guest: String,
    phone_number: String,
    order_date: String,
    check_in: String,
    check_out: String,
    special_request: String,
    roomId: String,
    room_type: String,
    room_number: Number,
    status: String,
    price: Number,
});
exports.BookingsModel = mongoose_1.default.model('bookings', bookingsSchema);
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
        if (booking === undefined || id.length === 0)
            throw new Error('El id no existe');
        return booking;
    });
}
function createBooking(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        return booking;
    });
}
function updateBooking(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('No existe el id');
        return updateData;
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('No existe el id');
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
