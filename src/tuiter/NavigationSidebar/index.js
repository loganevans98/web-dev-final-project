import React from "react";
import {BrowserRouter, Route, Routes, Link, useNavigate, NavLink} from "react-router-dom";
import SecureContent from "../Secure/SecureContent";
import {useProfile} from "../../contexts/profile-context";

const NavigationSidebar = ({active = ''}) => {
    const navigate = useNavigate();
    const {signout} = useProfile();

    const handleSignOutButton = async () => {
        try {
            signout()
            navigate('/')
            //forces a refresh so that the book collection section goes away
            window.location.reload(true);
        } catch (e) {
            alert(e)
        }
    }


    return(
        <div>
            <div className="list-group">
                <NavLink to="/" className="list-group-item list-group-item-action" activeClassName={"btn-primary"}>
                    <i className="fas fa-home"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Home</span>
                </NavLink>
                <NavLink to="/browse-books" className="list-group-item list-group-item-action" activeClassName={"btn-primary"}>
                    <i className="fas fa-book"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Books</span>
                </NavLink>
                <NavLink to="/collections" className="list-group-item list-group-item-action" activeClassName={"btn-primary"}>
                    <i className="fas fa-list-ul"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Collections</span>
                </NavLink>
                <NavLink to="/signup" className="list-group-item list-group-item-action" activeClassName={"btn-primary"}>
                    <i className="fas fa-user-plus"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Signup</span>
                </NavLink>
                <NavLink to="/signin" className="list-group-item list-group-item-action" activeClassName={"btn-primary"}>
                    <i className="fas fa-arrow-circle-right"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Sign In</span>
                </NavLink>
                <NavLink to="/profile" className="list-group-item list-group-item-action" activeClassName={"btn-primary"}>
                    <i className="fas fa-user"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Profile</span>
                </NavLink>
                <button class="list-group-item list-group-item-action" aria-current="true" onClick={handleSignOutButton}>
                    <i className="fas fa-arrow-circle-left"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Sign Out</span>
                </button>
            </div>
        </div>
    );
}
export default NavigationSidebar;
