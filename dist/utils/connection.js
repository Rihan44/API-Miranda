"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryExecuter = void 0;
require("dotenv/config");
const mysql2_1 = __importDefault(require("mysql2"));
const ConnectionSQL = () => {
    const pool = mysql2_1.default.createPool({
        host: process.env.SQL_SERVER,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATA_DB,
        port: 33061
    });
    console.log('Conectado a SQL correctamente');
    return pool;
};
const queryExecuter = async (query, param) => {
    const [row] = await ConnectionSQL().promise().query(query, param);
    ConnectionSQL().end();
    return row;
};
exports.queryExecuter = queryExecuter;
exports.default = ConnectionSQL;
