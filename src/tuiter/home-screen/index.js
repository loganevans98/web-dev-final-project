import {useProfile} from "../../contexts/profile-context";
import * as booksService from "../../services/books-service";
import * as listsService from "../../services/lists-service";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import SecureContent from "../Secure/SecureContent";
import * as saveService from "../../services/lists-service";
import * as bookService from "../../services/books-service";

const HomeScreen = () => {
    const {profile} = useProfile();
    const [comments, setComments] = useState([]);
    const [saves, setSaves] = useState([]);

    const fetchRecentComments = async () => {
        const actualComments = await booksService.findAllMostRecentComments();
        setComments(actualComments);
    }

    const fetcRecentSavedBooks = async () => {
        try {
            // use findAllBooksSavedByUser to get a response with bookID in it
            const response = await listsService.findMostRecentSavesByUser(profile._id)
            // use variable allBooks to store all information from volumeInfo of google API's book info
            const allBooks = await Promise.all(
                response.map(async book => {
                    const res = await bookService.fetchBookByIdFromGoogle(book.bookID);
                    return {...book, volumeInfo: res.volumeInfo};
                }));
            setSaves(allBooks);
        } catch(e) {
            console.log('error:', e);
        }
    }

    useEffect(() => {
        fetchRecentComments();
        fetcRecentSavedBooks();
    }, []);

    return(
        <div>
            <h1>Welcome{profile && ` ${profile.firstName}`}!</h1>
            <hr />
            <SecureContent>
                <div className="pb-3">
                    <h2>Your Most Recent Saves</h2>
                    {
                        saves.map(book =>
                            <li className="list-group-item">
                                <Link to={`/browse-books/details/${book.bookID}`} className="wd-link">
                                    <b>{book.volumeInfo.title}</b> <br/>
                                    {book.volumeInfo.authors.map(author => <div>{author} <br/></div> )}
                                </Link>
                            </li>
                        )
                    }
                </div>
                <hr />
            </SecureContent>
            <div className="mt-3">
                <h2>Most Recent Comments</h2>
                <ul className="list-group">
                    {comments.map((comment) =>
                        <Link to={comment.bookLink ? comment.bookLink : "/browse-books"}>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <b>{comment.commenterEmail}</b>  commented on: <i>{comment.bookTitle}</i> <br/>
                                    {comment.comment}
                                </div>
                                <div>
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </li>
                        </Link>
                    )}
                </ul>
            </div>

        </div>
    )
}
export default HomeScreen;