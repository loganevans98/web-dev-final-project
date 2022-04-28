import React from "react";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import SecureContent from "../Secure/SecureContent";

const NavigationSidebar = ({active = ''}) => {
    return(
        <div>
            <div className="list-group">
                <Link to="/" className={`list-group-item list-group-item-action ${active === 'home' ? 'active' : ''}`}>
                    <i className="fas fa-home"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Home</span>
                </Link>
                <Link to="./browse-books" class="list-group-item list-group-item-action" aria-current="true">
                    <i className="fas fa-book"></i> <span class="d-xl-inline d-lg-none d-md-none d-sm-none">Books</span>
                </Link>
                <Link to="./collections" class="list-group-item list-group-item-action" aria-current="true">
                    <i className="fas fa-list-ul"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Collections</span>
                </Link>
                <Link to="./marketplace" class="list-group-item list-group-item-action" aria-current="true">
                    <i className="fas fa-store"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Marketplace</span>
                </Link>
                <Link to="./signup" class="list-group-item list-group-item-action " aria-current="true">
                    <i className="fas fa-user-plus"></i> <span class="d-xl-inline d-lg-none d-md-none d-sm-none">Signup</span>
                </Link>
                <Link to="./signin" class="list-group-item list-group-item-action" aria-current="true">
                    <i className="fas fa-arrow-circle-right"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Sign In</span>
                </Link>
                <Link to="./profile" class="list-group-item list-group-item-action" aria-current="true">
                    <i className="fas fa-user"></i> <span
                    className="d-xl-inline d-lg-none d-md-none d-sm-none">Profile</span>
                </Link>
            </div>
            <div className="d-grid mt-2">
                <a href="../tuit.html"
                   className="btn btn-primary btn-block rounded-pill w-100">
                    Tuit</a>
            </div>
        </div>
    );
}
export default NavigationSidebar;
