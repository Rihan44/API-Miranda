import {bookingData} from "../data/bookingData";
import { IBookings } from "../models/Ibookings";

export const bookings = bookingData as IBookings[];

async function getAllBookings() {
    const result = await bookings;
    return result;
}

async function getById(id: number) {
    const booking = await bookings.find(data => data.id === id.toString());
	if (booking === undefined) throw new Error('El id no existe')
    return booking;
}

async function createBooking(booking: IBookings) {
    await bookings.push(booking);
    return bookings;
}

async function updateBooking(id: number, updateData: Partial<IBookings>) {
    bookings.map((data) => {
        if (data.id == id.toString()) {
            return {
                ...data,
                ...updateData
            }
        }
        return data;
    })
}

async function _delete(id: number) {
    const bookingsUpdated: IBookings[] = await bookings.filter(data => data.id !== id.toString());
    return bookingsUpdated;
}

export const bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};