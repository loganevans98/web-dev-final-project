import React, {useContext, useState} from 'react';
import axios from "axios";
import * as authService from "../services/auth-service";

const ProfileContext = React.createContext();

const api = axios.create({withCredentials: true});

export const useProfile = () => {
    return useContext(ProfileContext);
}

export const ProfileProvider = ({children}) => { //the children is whatever we are wrapping around, we want to return this body that was given to us wrapped in a provider and context
    const [profile, setProfile] = useState();

    const signup = async (user) => {
        try {
            const response = await authService.signup(user);
            setProfile(response.data)
        } catch(e) {
            throw e;
        }
    }

    const signin = async (credentials) => {
        try {
            const response = await authService.signin(credentials);
            setProfile(response.data);
        } catch(e) {
            throw e;
        }
    }

    //check to see if someone is logged in so that when you refresh the information doesn't go away, we also want to use this to protect certain screens, don't show profile if not logged in
    const checkLoggedIn = async() => {
        try {
            const response = await authService.profile();
            setProfile(response);
            return response;
        } catch(e) {
            throw e
        }
    }

    const signout = async() => {
        const response = await authService.signout();
        setProfile(null);
    }


    const value = {profile, signup, signin, checkLoggedIn, signout}
    return(
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}