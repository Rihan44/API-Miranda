import { IBookings } from "../interfaces/Ibookings";
import ContectionSQL from "../utils/conection";

const connection = ContectionSQL();

async function fetchAll() {
    const pool = await connection;
    const [rows] = await pool.query("SELECT * FROM bookings");
    return rows;
}

async function fetchOne(id: string) {
    const pool = await connection;
    const [rows] = await pool.query(`SELECT * FROM bookings WHERE id = ${id}`);
    return rows;
}

async function create(bookingData: IBookings) {
    const pool = await connection;
    const [rows] = await pool.query(`INTER INTO bookings (guest, phone_number, order_date, check_in, check_out, special_request, room_type
        , room_number, status, price, room_id) VALUES (${bookingData.guest}, ${bookingData.phone_number}, ${bookingData.order_date}, 
            ${bookingData.check_in}, ${bookingData.check_out}, ${bookingData.special_request}, ${bookingData.room_type}, 
            ${bookingData.room_number}, ${bookingData.status}, ${bookingData.price}, ${bookingData.room_id})`);

    return rows;
}

async function update(id: string, bookingData: IBookings) {
    const pool = await connection;
    const [rows] = await pool.query(`UPDATE bookings SET guest ='${bookingData.guest}', phone_number = '${bookingData.phone_number}'
    , order_date = '${bookingData.order_date}', check_in = '${bookingData.check_in}', check_out = '${bookingData.check_out}'
    , special_request = '${bookingData.special_request}', room_type= '${bookingData.room_type}', room_number = '${bookingData.room_number}'
    , status = '${bookingData.status}', price = '${bookingData.price}' WHERE id = ${id}`);

    return rows;
}

async function deleteOne(id: string) {
    const pool = await connection;
    const [rows] = await pool.query(`DELETE * FROM bookings WHERE id = ${id}`);
    return rows;
}

export const getAll = fetchAll;
export const getOne = fetchOne;
export const deleteBooking = deleteOne;
export const createNewBooking = create;
export const updateTheBooking = update;
