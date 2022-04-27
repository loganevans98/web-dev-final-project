import Tuiter from "./tuiter";
import ExploreScreen from "./tuiter/ExploreScreen/ExploreScreen";
import HomeScreen from "./tuiter/home-screen";
import BrowseBooks from "./tuiter/BrowseBooks";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import React from "react";
import BookDetails from "./tuiter/BrowseBooks/book-details";
import Signup from "./tuiter/Signup/signup";
import Profile from "./tuiter/Profile";
import Collections from "./tuiter/Collections";
import {ProfileProvider} from "./contexts/profile-context";
import Signin from "./tuiter/Signin";
import SecureRoute from "./tuiter/Secure/SecureRoute";


function App() {
    return (
        <ProfileProvider>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Tuiter />}>
                            <Route index element={<HomeScreen />}/>
                            <Route path="home" exact={true} element={<HomeScreen />} />
                            <Route path="explore" element={<ExploreScreen />}/>
                            <Route path="browse-books" element={<BrowseBooks />}/>
                            <Route path="browse-books/:searchString" element={<BrowseBooks />}/>
                            <Route path="browse-books/details/:bookID" element={<BookDetails />}/>
                            <Route path="signup" element={<Signup />}/>
                            <Route path="profile" element={
                                <SecureRoute>
                                    <Profile />
                                </SecureRoute>
                            }/>
                            <Route path="collections" element={<Collections />}/>
                            <Route path="signin" element={<Signin />}/>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </ProfileProvider>
    );
}


export default App;
