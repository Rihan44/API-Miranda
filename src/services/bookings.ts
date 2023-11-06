import { IBookings } from "../interfaces/Ibookings";
import {createNewBooking, deleteBooking, getAll, getOne, updateTheBooking } from "../models/bookings.model";

async function getAllBookings() {
    const result = await getAll();
    return result;
}

async function getById(id: string) {
    const booking = await getOne(id);
    return booking;
}

async function createBooking(booking: IBookings) {
    const result = await createNewBooking(booking);
    return result;
}

async function updateBooking(id: string, updateData: IBookings) {
    if(!id) throw new Error('No existe el id')
    await updateTheBooking(id, updateData);
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id');
    await deleteBooking(id);
    return;
}

export const bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};