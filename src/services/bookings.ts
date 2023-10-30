import {bookingData} from "../data/bookingData";
import { IBookings } from "../interfaces/Ibookings";
import { BookingsModel } from "../models/bookings.model";

export const bookings = bookingData as IBookings[];

async function getAllBookings() {
    const result = await BookingsModel.find();
    return result;
}

async function getById(id: string) {
    const booking = await bookings.find(data => data.id === id.toString());
	if (booking === undefined || id.length === 0) throw new Error('El id no existe')
    return booking;
}

async function createBooking(booking: IBookings) {
    const result = await BookingsModel.create(booking);
    return result;
}

async function updateBooking(id: string, updateData: Partial<IBookings>) {
    if(!id) throw new Error('No existe el id')
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id')
    return 'Booking eliminado';
}

export const bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};