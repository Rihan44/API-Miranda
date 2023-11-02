import { IBookings } from "../interfaces/Ibookings";
import { BookingsModel } from "../models/bookings.model";

async function getAllBookings() {
    const result = await BookingsModel.find();
    return result;
}

async function getById(id: string) {
    const booking = await BookingsModel.findById(id).exec();
    return booking;
}

async function createBooking(booking: IBookings) {
    const result = await BookingsModel.create(booking);
    return result;
}

async function updateBooking(id: string, updateData: Partial<IBookings>) {
    if(!id) throw new Error('No existe el id')
    await BookingsModel.findByIdAndUpdate(id, updateData);
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id');
    await BookingsModel.findByIdAndDelete(id);
    return;
}

export const bookingService = {
    getAllBookings,
    getById,
    createBooking,
    updateBooking,
    delete: _delete,
};