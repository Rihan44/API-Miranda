"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
require("dotenv/config");
ConectionMongo().catch(err => console.log(err));
async function ConectionMongo() {
    // const urlMongo: string = process.env.MONGO_SERVER || '';
    const urlAtlas = process.env.MONGO_ATLAS || '';
    await (0, mongoose_1.connect)(urlAtlas, {
        dbName: process.env.MONGO_DB || 'api-miranda',
        serverApi: {
            version: mongodb_1.ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    });
    console.log('Conectado a Mongo correctamente');
}
exports.default = ConectionMongo;
