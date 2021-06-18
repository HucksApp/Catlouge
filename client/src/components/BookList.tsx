import React,{useEffect,useState} from 'react'

import { book } from '../types/types.js';
import { getBookQuerys } from '../queries/queries'
import { useQuery,gql } from "@apollo/client";

import BookDetails from './BookDetails';



export default function BookList() {

    
    const { loading, error, data } = useQuery(getBookQuerys);
    const [ selected, updateSelected ]= useState("")

    const displayBooks = ()=>{
                if (loading) {
                    return <p>Loading...</p>;
                }else if (error){
                        return <p>Error loading Data ........</p>

                }else{
                    return data.books.map((book: book )=>{
                            return <li onClick = { e=>{updateSelected(book.id)}}  key={book.id}>{book.name}</li>
                    })
                }
            }



    


    return (

        <div >
        <ul id = "book-list" >

           {displayBooks()}

        </ul> 
        <BookDetails  bookId={selected}  />
        </div >
    )
}