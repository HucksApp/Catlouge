import { MongoClient } from 'mongodb'




export const dbTest = async ( dbClient:MongoClient )=>{

    await dbClient.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

}