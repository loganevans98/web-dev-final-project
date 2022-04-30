import React, {useEffect, useState, useRef} from 'react';
import {useProfile} from "../../contexts/profile-context";
import * as booksService from '../../services/books-service';
import {Link} from "react-router-dom";


const Profile = () => {
    const {profile} = useProfile();
    const [comments, setComments] = useState([]);

    const fetchComments = async() => {
        const actualComments = await booksService.findCommentsByUserId(profile._id);
        setComments(actualComments);
    }

    useEffect( () => {
        fetchComments();
    }, [])

    return(
        <div>
            <span className="d-flex align-items-center"><h1>Profile</h1> <Link to="/profile/edit"><i className="fas fa-pencil-alt ps-2"></i></Link></span>
            <div>
                Name: <b>{profile.firstName && profile.firstName} {profile.lastName && profile.lastName}</b>
                <br />
            </div>
            <div>Email: <b>{profile.email && profile.email}</b></div>
            <hr />
            <h2>Comments</h2>
            <ul className="list-group">
                {comments.map((comment) =>
                    <Link to={comment.bookLink ? comment.bookLink : "/browse-books"}>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <b>Comment on:</b> <i>{comment.bookTitle}</i> <br/>
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
    );
}


export default Profile;