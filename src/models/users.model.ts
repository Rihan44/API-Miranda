import { IUsers } from "../interfaces/Iusers";
import ConnectionSQL from "../utils/conection";

const connection = ConnectionSQL();

async function fetchAll() {
    const pool = await connection;
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
}

async function fetchOne(id: string) {
    const pool = await connection;
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
    return rows;
}

async function create(userData: IUsers) {
    const pool = await connection;
    const [rows] = await pool.query(`INTER INTO users (name, email, photo, employee_position, phone_number, hire_date, job_description, 
        status, password_hash) 
    VALUES (${userData.name}, ${userData.email}, ${userData.photo}, ${userData.employee_position}, ${userData.phone_number}
        , ${userData.hire_date}, ${userData.job_description}, ${userData.status}, ${userData.password_hash})`);

    return rows;
}

async function update(id: string, userData: IUsers) {
    const pool = await connection;
    const [rows] = await pool.query(`UPDATE users SET name ='${userData.name}', email = '${userData.email}',
    photo = '${userData.photo}', employee_position = '${userData.employee_position}', phone_number = '${userData.phone_number}', hire_date = '${userData.hire_date}'
    , job_description = '${userData.job_description}', status = ${userData.status}, password_hash = ${userData.password_hash} WHERE id = ${id}`);

    return rows;
}

async function deleteOne(id: string) {
    const pool = await connection;
    const [rows] = await pool.query(`DELETE * FROM users WHERE id = ${id}`);
    return rows;
}

export const getAll = fetchAll;
export const getOne = fetchOne;
export const deleteUser = deleteOne;
export const createNewUser = create;
export const updateTheUser = update;
