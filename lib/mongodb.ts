import * as mongoDB from "mongodb";

const uri = process.env.MONGO_URI || "";
const dbName = process.env.MONGO_DB_NAME || "";
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient:any = null;
let database:any = null;

if (!uri) {
    throw new Error('Please add your MONGO_URI to .env.local')
}

export async function connectToDatabase(): Promise<any> {

    try {
        if (mongoClient && database) {
            return { mongoClient, database };
        }
        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await (new mongoDB.MongoClient(uri)).connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
            mongoClient = await (new mongoDB.MongoClient(uri)).connect();
        }
        database = await mongoClient.db(dbName);
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
    }
}
