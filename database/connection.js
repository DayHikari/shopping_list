// import { MongoClient } from "mongodb";
// import 'dotenv/config'

const uri = process.env.DB_URI

export let db;
export let connection;

export const connectToDB = async (database) => {
  connection = await MongoClient.connect(uri);
  db = connection.db(database)
};

export const closeConnection = async () => {
  await connection.close();
}