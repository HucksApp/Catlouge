import React from 'react'

import { useQuery,useMutation } from "@apollo/client";
import { getBookQuery } from '../queries/queries'
import { book } from '../types/types';





export default function BookDetails( props: { bookId:string } ) 
{

    const { data, error , loading } = useQuery(getBookQuery,{ variables: { id:props.bookId }})


        //console.log( props.bookId )
    const displayBookDetails =()=>{

        if(loading){
            //console.log(error)
            return <p>Loading .... </p>
        }/*else if (error){
            return <p>Error Fetching Book </p>
        } */
        if(data){

        const { book } = data
       
        return (

            <div >

                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All Books By Author</p>
                <ul className="other-books">
                    {
                        book.author.books.map(( item:book )=>{

                            return  <li key={item.id}>{item.name}</li>
                        })
                    }
                </ul>
            </div>

    
        )

        console.log(data) 
                }else{

                            return <li> No Book Selected </li>

                }


    }



    return (
        <div id="book-details">
           {displayBookDetails()}
            
        </div>
    )

}
