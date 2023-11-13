import {connect,} from 'mongoose';
import {ServerApiVersion} from 'mongodb';
import 'dotenv/config';

ConnectionMongo().catch(err => console.log(err));

async function ConnectionMongo(){
    const urlMongo: string = process.env.MONGO_SERVER || '';
    const urlAtlas: string = process.env.MONGO_ATLAS || '';
    await connect(urlAtlas, {
        dbName: process.env.MONGO_DB || 'api-miranda',
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    });

    console.log('Conectado a Mongo correctamente');
} 

export default ConnectionMongo;

