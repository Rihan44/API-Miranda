import { IContact } from "../interfaces/Icontact";
import ConnectionSQL from "../utils/connection";

const connection = ConnectionSQL();

async function fetchAll() {
    const pool = await connection;
    const [rows] = await pool.query("SELECT * FROM contact");
    return rows;
}

async function fetchOne(id: string) {
    const pool = await connection;
    const [rows] = await pool.query(`SELECT * FROM contact WHERE id = ${id}`);
    return rows;
}

async function create(contactData: IContact) {
    const pool = await connection;
    const [rows] = await pool.query(`INTER INTO contact (name, email, phone, email_subject, email_description, date, date_time, 
        is_archived) 
    VALUES (${contactData.name}, ${contactData.email}, ${contactData.phone}, ${contactData.email_subject}, ${contactData.email_description}
        , ${contactData.date}, ${contactData.date_time}, ${contactData.is_archived})`);

    return rows;
}

async function update(id: string, contactData: IContact) {
    const pool = await connection;
    const [rows] = await pool.query(`UPDATE contact SET name ='${contactData.name}', email = '${contactData.email}',
    phone = '${contactData.phone}', email_subject = '${contactData.email_subject}', email_description = '${contactData.email_description}', date = '${contactData.date}'
    , date_time = '${contactData.date_time}', is_archived = ${contactData.is_archived} WHERE id = ${id}`);

    return rows;
}

async function deleteOne(id: string) {
    const pool = await connection;
    const [rows] = await pool.query(`DELETE * FROM contact WHERE id = ${id}`);
    return rows;
}

export const getAll = fetchAll;
export const getOne = fetchOne;
export const deleteContact = deleteOne;
export const createNewContact = create;
export const updateTheContact = update;
