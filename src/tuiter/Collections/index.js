import React from 'react';
import{useState, useEffect, useRef} from 'react';
import SecureContent from "../Secure/SecureContent";
import * as bookService from "../../services/books-service";
import * as saveService from "../../services/lists-service";
import {useProfile} from "../../contexts/profile-context";
import {Link} from "react-router-dom";



const Collections = () => {

    const {profile} = useProfile();
    const [lists, setlists] = useState([]);

    const findlist = async () => {
        try {
            // use findAllBooksSavedByUser to get a response with bookID in it
            const response = await saveService.findAllBooksSavedByUser(profile._id)
            // use variable allBooks to store all information from volumeInfo of google API's book info
            const allBooks = await Promise.all(
                response.map(async book => {
                    const res = await bookService.fetchBookById(book.bookID);
                    return {...book, volumeInfo: res.volumeInfo};
                }));
            setlists(allBooks);
        } catch(e) {
            console.log('error:', e);
        }
    }
    console.log('allBooks:', lists);

    useEffect(() => {
        findlist();
    },[]);

    return (
        <SecureContent>
            <div>
                <h2>My Collections</h2>
            </div>
            <ul className="list-group">
            {
                lists.map(book =>
                    <li className="list-group-item">
                        <Link to={`/browse-books/details/${book.bookID}`} className="wd-link">
                            <img src={book.volumeInfo.imageLinks.thumbnail} height={100} className="me-2 float-start"/>
                            <b>{book.volumeInfo.title}</b> <br/>
                            {book.volumeInfo.authors.map(author => <div>{author} <br/></div> )}
                        </Link>
                    </li>
                )
            }
            </ul>

        </SecureContent>
    );
};

export default Collections;