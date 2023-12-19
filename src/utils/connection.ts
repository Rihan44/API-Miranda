import 'dotenv/config';
import mysql from 'mysql2';

const ConnectionSQL = () =>{
    const pool = mysql.createPool(
        {
            host:process.env.SQL_SERVER, 
            user: process.env.SQL_USER, 
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATA_DB, 
            port: 33061
        }
    );

    console.log('Conectado a SQL correctamente');
    return pool;
} 

export const queryExecuter = async(query: string, param?: any) =>{
    const [row] = await ConnectionSQL().promise().query(query, param);
    ConnectionSQL().end();
    return row;                                                                                                                                                                                                                                                                                                                                                                                                 
}

export default ConnectionSQL;


