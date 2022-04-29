import React, {useState}  from 'react';
import {useProfile} from "../../contexts/profile-context";
import * as usersService from "../../services/users-service";
import {Link, useNavigate} from "react-router-dom";

const EditProfile = () => {
    const {profile} = useProfile();
    const [editedUser, setEditedUser] = useState(profile);
    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.email);
    const navigate = useNavigate();

    const handleSaveButton = async () => {
        try {
            await usersService.updateUser(editedUser);
            navigate('/profile');
        } catch (e) {
            alert(e)
        }
    }

    return(
        <div>
            <h1>Edit Profile</h1>
            <input type="text" className="form-control" value={firstName}
                   onChange={(e) => {
                       setFirstName(e.target.value)
                       setEditedUser({...editedUser, firstName: e.target.value})}
                   }/>
            <input type="text" className="form-control" value={lastName}
                   onChange={(e) => {
                       setLastName(e.target.value)
                       setEditedUser({...editedUser, lastName: e.target.value})}
                   }/>
            <input type="text" className="form-control" value={email}
                   onChange={(e) => {
                       setEmail(e.target.value)
                       setEditedUser({...editedUser, email: e.target.value})}
                   }/>
            <button className="btn btn-primary" onClick={handleSaveButton}>Save</button>
        </div>
    );
}

export default EditProfile;