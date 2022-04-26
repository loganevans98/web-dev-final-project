import {React, useState, useRef, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const BrowseBooks = () => {
    const [books, setBooks] = useState([]);
    const {searchString} = useParams();
    const titleRef = useRef();
    const navigate = useNavigate();
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const API_URL = `https://www.googleapis.com/books/v1/volumes?key${API_KEY}&q`;
    const searchBooksByTitle = async () => {
        const response = await axios.get(`${API_URL}=${titleRef.current.value}`);
        setBooks(response.data.items);
        navigate(`/browse-books/${titleRef.current.value}`)
    }

    useEffect(() => {
        if(searchString) {
            titleRef.current.value = searchString
            searchBooksByTitle()
        }
    }, [])

    return(
        <div>
            <h1>Search Books</h1>
            <p>please search your favorite book here!</p>

            <ul className="list-group">
                <li className="list-group-item">
                    <input ref={titleRef} className="form-control"/>
                    <button onClick={searchBooksByTitle} className="btn btn-primary float-end ms-3">Search</button>
                </li>
                {

                    books.map(book =>
                        <li className="list-group-item">
                            <Link to={`/browse-books/details/${book.id}`}>
                                <img src={book.volumeInfo.imageLinks.thumbnail} height={100} className="me-2 float-start"/>
                                {book.volumeInfo.title} <br/>
                                {book.volumeInfo.authors}
                            </Link>/
                        </li>)
                }
            </ul>
        </div>
    );
};

export default BrowseBooks;