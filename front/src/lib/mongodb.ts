import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI as string;
let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error("Add Mongo URI to .env.local");
}

client = new MongoClient(uri);
clientPromise = client.connect();

export default clientPromise;