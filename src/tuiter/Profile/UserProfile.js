import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import * as booksService from "../../services/books-service";
import * as usersService from "../../services/users-service";

const UserProfile = () => {
    const [profile, setProfile] = useState();
    const [comments, setComments] = useState([]);
    const {profileID} = useParams();

    const fetchProfile = async() => {
        const actualProfile = await usersService.findUserById(profileID);
        setProfile(actualProfile)
    }

    const fetchComments = async() => {
        const actualComments = await booksService.findCommentsByUserId(profile._id);
        setComments(actualComments);
    }

    useEffect( () => {
        fetchProfile();
        fetchComments();
    }, [])

    return(
        <div>
            <h1>Profile</h1>
            Name: <b>{profile && profile.firstName} {profile && profile.lastName}</b> <br />

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
};

export default UserProfile;