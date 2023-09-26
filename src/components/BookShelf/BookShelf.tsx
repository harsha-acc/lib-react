import React, { useEffect, useState } from 'react'
import NavbarSearch from '../NavbarSearch/NavbarSearch'
import axios from 'axios'

function BookShelf() {
    
    const [books, setBooks] = useState([])

    useEffect(() => {
    const lId = JSON.parse(sessionStorage.getItem('selectedLibraryId') as any).lid;
    console.log(lId)

    axios.get(`http://localhost:4000/api/v1/library/viewBooks/${lId}`)
      .then((response) => setBooks(response.data))
      .catch((err) => console.log(err));
    }, []);


  return (
    <>
    <NavbarSearch />
    {
        books && books.map((book: any, index: number) => {
            return(
                <li key={index}> {book.bName} </li>
            )
        })
    }
    </>
  )
}

export default BookShelf
