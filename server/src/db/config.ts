import pkg from 'mongodb'
import {dbTest} from '../Tests/dbTest.js'

import mongoose from 'mongoose'

const { MongoClient } = pkg


const uri = "mongodb+srv://hucks:pussypie@cluster0.tkyub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });




//CONNECTION WITH MONGO NATIVE DRIVER

export async function startDb (){
try{
        await client.connect()

        await dbTest(client)
        return client
    }
    catch(e){
        console.log(e)
    } 


    finally{

        await client.close();
    }


  }





  export async function startDB2(){

    mongoose.connect(uri)
    mongoose.connection.once('open',()=>console.log("CONNECTED TO MONGO DB WITH MONGOOSE"))

  }





