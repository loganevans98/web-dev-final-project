import React, {useEffect, useState, useRef} from 'react';
import {useProfile} from "../../contexts/profile-context";
import * as booksService from '../../services/books-service';
import {Link, useNavigate} from "react-router-dom";
import * as usersService from "../../services/users-service";
import {updateUser} from "../../services/users-service";


const Profile = () => {
    const {profile} = useProfile();
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const checkIfAdmin = () => {
        setIsAdmin(profile.userType === 'ADMIN') ;
    }

    const fetchUsers = async () => {
        const actualUsers = await usersService.findAllUsers();
        setUsers(actualUsers);
    }

    const fetchComments = async() => {
        const actualComments = await booksService.findCommentsByUserId(profile._id);
        setComments(actualComments);
    }

    const fetchUser = async() => {
        setUser(...profile);
    }

    const handleDeleteUser = async(profileID) => {
        await usersService.deleteUser(profileID);
        const updatedUsers = await usersService.findAllUsers();
        setUsers(updatedUsers);

    }

    useEffect( () => {
        fetchUser();
        checkIfAdmin();
        fetchUsers();
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
            <span className="badge bg-primary">{profile.userType}</span>
            <hr />
            {
                    isAdmin
                    ?
                   <div>
                       <h2>Users</h2>
                       <ul className="list-group">
                           {
                               users.map((user) =>
                                   <li className="list-group-item d-flex justify-content-between">
                                       <div>
                                           Name: <b>{user.firstName} {user.lastName}</b><br/>
                                           Email: <b>{user.email}</b><br/>
                                           <span className="badge bg-primary">{profile.userType}</span><br/>
                                       </div>
                                       <div>
                                           <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>delete</button>
                                       </div>
                                   </li>
                               )
                           }

                       </ul>
                       <hr />
                   </div>
                    :
                    <div></div>
            }
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