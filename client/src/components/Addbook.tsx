import React,{useState,useEffect} from 'react'

import { author, book } from '../types/types.js';
import { getAuthorQuery, addBookMutation,getBookQuerys } from '../queries/queries'
import { useQuery,useMutation,useLazyQuery } from "@apollo/client";
//import { useMutation,useQuery } from "@apollo/react-hooks"







export default function Addbook() {

    let initialState: book = {  name:"", genre:"", authorId:"", id:""  }

    const [state,updateState] = useState(initialState)

    const { data:authors, error , loading } = useQuery(getAuthorQuery)
    const [ addBook ] = useMutation(addBookMutation)




    let displayAuthors = ()=>{

            if (loading){
                return <option disabled>Loading  Author</option>
            }else if (error){
                return <option disabled>Error Loading Author</option>
            }else{
                console.log(authors.authors)

               return authors.authors.map(( author :author )=>{

                    return <option key={author.id} value={author.id} >{author.name}</option>
                })
            }
    }







    const handleChange = (e: React.FormEvent<HTMLInputElement>|React.FormEvent<HTMLSelectElement>  )=>{
        let copyData = {...state}
        if(e.currentTarget.id === "name"){
        copyData.name = e.currentTarget.value
            }else if(e.currentTarget.id === "genre"){
                copyData.genre = e.currentTarget.value
            }else if (e.currentTarget.id === "author-list"){
                copyData.authorId = e.currentTarget.value
            }
        updateState(copyData)    

    }



    const submitForm = (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            //add book to database and refetch books to update UI
            addBook({variables: {  ...state },refetchQueries:[{query:getBookQuerys}]})

            updateState(initialState)


    }
// schema for gtraph ql on pl........


    return (
        <form id="addbooks" onSubmit={submitForm}>
            <div className="field">
            <label htmlFor="">Book name:</label>
            <input type="text" value={state.name} id="name" onChange={handleChange}/>
            </div>

            <div className="field">
            <label htmlFor="">Genre:</label>
            <input id="genre" value={state.genre} type="text" onChange={handleChange} />
            </div>

            <div className="field">
            <label htmlFor="author-list">Author:</label>
            <select name="" id="author-list"  value={state.authorId} onChange={handleChange}>
                <option value="">select author</option>
               {displayAuthors()}
            </select>
            </div>
                <button>+</button>
        </form>
    )
}
