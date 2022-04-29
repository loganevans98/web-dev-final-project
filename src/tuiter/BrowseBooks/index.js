import {React, useState, useRef, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import * as booksService from '../../services/books-service';

const BrowseBooks = () => {
    const [books, setBooks] = useState([]);
    const {searchString} = useParams();
    const titleRef = useRef();
    const navigate = useNavigate();
    const searchBooksByTitle = async () => {
        const response = await booksService.fetchBooksByTitleFromGoogle(titleRef.current.value);
        setBooks(response.items);
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
                            <Link to={`/browse-books/details/${book.id}`} className="wd-link">
                                <img src={book.volumeInfo.imageLinks.thumbnail} height={100} className="me-2 float-start"/>
                                <b>{book.volumeInfo.title}</b> <br/>
                                {book.volumeInfo.authors.map(author => <div>{author} <br/></div> )}
                            </Link>
                        </li>)
                }
            </ul>
        </div>
    );
};

export default BrowseBooks;