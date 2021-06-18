import  Author  from '../db/models/author.js'
import  Book  from '../db/models/book.js'
import { handler } from '../db/models/type.js'


export const getBooksByAuthor :handler =(parent:any , args:any )=>{
          return Book.find({ authorId:parent.id })
     }
     

export const getAuthorForBook :handler =(parent:any , args:any )=>{
          return Author.findById(parent.authorId)
     }


export const getBook:handler =(parent:any , args:any)=>{
          return Book.findById(args.id)
}

export const getBooks:handler =(parent:any , args:any)=>{
     return Book.find({})
}
     
export const getAuthor:handler = (parent:any , args:any) =>{
     return Author.findById(args.id)
}

export const getAuthors:handler = (parent:any , args:any) =>{
     return Author.find({})
}


export const addAuthor:handler =(parent:any , args:any )=>{
const { name, age } = args
 const author = new Author({name, age})
 return author.save()
}



export const addBook:handler = (parent:any , args:any)=>{
          const {name, genre, authorId } = args
          console.log(name, genre, authorId)
     const book = new Book({ name,genre,authorId})
     return book.save()
     
}