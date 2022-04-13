import {React, useState, useRef} from "react";
import axios from "axios";

const BrowseBooks = () => {
    const [books, setBooks] = useState([]);
    const titleRef = useRef();
    const API_URL = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyDA76fpre3275WE_zcM-qKbCm4j59RCvTs&q'; //if includes API key, maybe make it an ENV variable? if so make sure to add it to heroku?
    const searchBooksByTitle = async (title) => {
        //const response = await axios.get(`${API_URL}=${titleRef.current.value}`);
        const response = await axios.get(`${API_URL}=${titleRef.current.value}`);
        setBooks(response.data.items); //search is the name of the actual array, this might be different depending on the API so maybe just start with .data and look at network tab, see what comes back and adjust accordingly
    }

    return(
        <div>
            <h1>Search Books</h1>

            <ul className="list-group">
                <li className="list-group-item">
                    <input ref={titleRef} className="form-control"/>
                    <button onClick={searchBooksByTitle} className="btn btn-primary float-end ms-3">Search</button>
                </li>
                {

                    books.map(book =>
                        <li className="list-group-item">
                            <img src={book.volumeInfo.imageLinks.thumbnail} height={100} className="me-2 float-start"/>
                            {book.volumeInfo.title} <br/>
                            {book.volumeInfo.authors}
                        </li>)
                }
            </ul>
        </div>
    );
};

export default BrowseBooks;