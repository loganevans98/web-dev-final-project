import React from 'react';
import axios from "axios";
import {useProfile} from "../../contexts/profile-context";


const Profile = () => {
    const {profile} = useProfile();
    return(
        <div>
            <h1>Profile</h1>
            {profile.email}
        </div>
    );
}


export default Profile;