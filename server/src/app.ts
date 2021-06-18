import express from 'express';
import { schema } from './schema/schema.js'
import { MongoClient } from 'mongodb'
import { startDB2 } from './db/config.js';
import cors from 'cors'


import { graphqlHTTP } from 'express-graphql'



const app = express()
const port = 4000
app.use(cors())


startDB2()



app.use('/catlouge', graphqlHTTP({
    schema,
    graphiql:true
}))


app.listen(port,()=>console.log('CATLOUGE LISTENING ON ' + port))