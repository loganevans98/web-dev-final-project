import React, {useEffect, useState} from 'react';
import {useProfile} from "../../contexts/profile-context";

const SecureContent = ({children}) => {
    const {checkLoggedIn} = useProfile();
    const [currentUser, setCurrentUser] = useState();
    const [waiting, setWaiting] = useState(true);
    const check = async () => {
        try {
            const user = await checkLoggedIn();
            setCurrentUser(user);
            setWaiting(false);
        } catch(e) {
            setWaiting(false);
        }
    }
    useEffect(() => { check() }, []);

    if(currentUser) {
        return children;
    }
    return null;
}

export default SecureContent;