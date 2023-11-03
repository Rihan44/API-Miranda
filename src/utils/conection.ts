import {connect,} from 'mongoose';
import {ServerApiVersion} from 'mongodb';
import 'dotenv/config';

ConectionMongo().catch(err => console.log(err));

async function ConectionMongo(){
    // const urlMongo: string = process.env.MONGO_SERVER || '';
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

export default ConectionMongo;
