import { query } from 'express'
import { GraphQLString, 
        GraphQLObjectType,
        GraphQLSchema,
        GraphQLID ,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull                  
    
} from 'graphql'

import { addAuthor,
        addBook,
        getAuthorForBook,
        getBooksByAuthor,
        getAuthor,
        getAuthors,
        getBook,
        getBooks
             } from '../handlers/handler.js'

import _ from 'lodash'
import { resolve } from 'path/posix'



/** 

type book = { name:string, genre:string, id:string, authorId:string }
type author = { name:string, age:Number, id:string } 



let books:book[]
let authors:author[]


 books = [
    {name:"Tales by moonLight ", genre: "Short stoties", id:"1",authorId:"1"},
    {name:"cornan the babarian ", genre: "triller", id:"2",authorId:"2"},
    {name:"Bashorun gaa ", genre: "history", id:"3",authorId:"3"},
    {name:"chaka the zulu ", genre: "history", id:"4",authorId:"2"},
    {name:"shon ho ogun lola ", genre: "history and heritage", id:"5",authorId:"2"},
    

]

 authors = [
    {name:"Robert Denion ",age: 89, id:"1"},
    {name:"Samuel L Jackson ", age: 45, id:"2"},
    {name:"John Grishian ", age: 27, id:"4"}
]
**/





const BookType:GraphQLObjectType = new GraphQLObjectType({
    name:"Book",
    fields:()=>{
       return {
           id: {type:GraphQLID},
           name:{type:GraphQLString},
           genre:{type:GraphQLString},
           author:{
                type:AuthorType,
                resolve:getAuthorForBook
           }
       } 
    }
})




const AuthorType:GraphQLObjectType = new GraphQLObjectType({
        name:"Author",
        fields:()=>{
            return{
                id: {type:GraphQLID},
                name:{type:GraphQLString},
                age:{type:GraphQLInt},
                books:{
                    type: new GraphQLList(BookType),
                    resolve:getBooksByAuthor
                }

            }
        }
})







const RootQuery = new GraphQLObjectType({
            name:"RootQueryType",
            fields:{
                book:{
                    type:BookType,
                    args:{id:{type:GraphQLID}},
                    resolve:getBook
                    
                },
                author:{
                        type:AuthorType,
                        args:{id:{type:GraphQLID}},
                        resolve:getAuthor

                },

                books:{
                    type: new GraphQLList(BookType),
                    resolve:getBooks
                    

                },
                authors:{

                    type:new GraphQLList(AuthorType),
                    resolve:getAuthors
                }

            }

})




const Mutation = new GraphQLObjectType({

    name:"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull( GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:addAuthor
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve:addBook
            
        }
    }
})













export  const  schema = new GraphQLSchema({
                query:RootQuery,
                mutation:Mutation
})