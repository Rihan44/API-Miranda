import {bookingData} from "../data/bookingData";
import { IBookings } from "../models/Ibookings";

export const bookings = bookingData as IBookings[];

async function getAllBookings() {
    const result = await bookings;
    return bookings;
}

async function getById(id: number) {
    const booking = await bookings.filter(data => data.id === id.toString());
    return booking;
}

async function post(booking: IBookings) {

}

async function put(id: number, updateData: Partial<IBookings>) {

}

async function _delete(id: number) {
    const bookingsUpdated: IBookings[] = await bookings.filter(data => data.id !== id.toString());
    return bookingsUpdated;
}

export const bookingService = {
    getAllBookings,
    getById,
    post,
    put,
    delete: _delete,
};