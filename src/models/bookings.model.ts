import { IBookings } from "../interfaces/Ibookings";
import ConnectionSQL from "../utils/connection";

const connection = ConnectionSQL();

async function fetchAll() {
    try {
        const connect = await connection;
        const [rows] = await connect.execute("SELECT * FROM bookings");
        return rows;
        
    } catch (error) {
        console.log(error)
    }
}

async function fetchOne(id: string) {
    const connect = await connection;
    const [rows] = await connect.execute(`SELECT * FROM bookings WHERE id = ${id}`);
    return rows;
}

const formatDateForMySQL = (date: Date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

async function create(bookingData: IBookings) {
    const connect = await connection;
    const [rows] = await connect.execute(`INSERT INTO bookings (guest, phone_number, order_date, check_in, check_out, special_request, room_type
        , room_number, status, price, room_id) VALUES ("${bookingData.guest}", '${bookingData.phone_number}', '${formatDateForMySQL(bookingData.order_date)}', 
            '${formatDateForMySQL(bookingData.check_in)}', '${formatDateForMySQL(bookingData.check_out)}', '${bookingData.special_request}', '${bookingData.room_type}', 
            '${bookingData.room_number}', '${bookingData.status}', ${bookingData.price}, ${bookingData.room_id})`);

    return rows;
}

async function update(id: string, bookingData: IBookings) {
    const connect = await connection;
    const [rows] = await connect.execute(`UPDATE bookings SET guest ='${bookingData.guest}', phone_number = '${bookingData.phone_number}'
    , order_date = '${bookingData.order_date}', check_in = '${bookingData.check_in}', check_out = '${bookingData.check_out}'
    , special_request = '${bookingData.special_request}', room_type= '${bookingData.room_type}', room_number = '${bookingData.room_number}'
    , status = '${bookingData.status}', price = '${bookingData.price}' WHERE id = ${id}`);

    return rows;
}

async function deleteOne(id: string) {
    const connect = await connection;
    const [rows] = await connect.execute(`DELETE * FROM bookings WHERE id = ${id}`);
    return rows;
}

export const getAll = fetchAll;
export const getOne = fetchOne;
export const deleteBooking = deleteOne;
export const createNewBooking = create;
export const updateTheBooking = update;
