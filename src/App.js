import Tuiter from "./tuiter";
import ExploreScreen from "./tuiter/ExploreScreen/ExploreScreen";
import HomeScreen from "./tuiter/home-screen";
import BrowseBooks from "./tuiter/BrowseBooks";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import React from "react";


function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Tuiter />}>
                            <Route index element={<HomeScreen />}/>
                            <Route path="home" exact={true} element={<HomeScreen />} />
                            <Route path="explore" element={<ExploreScreen />}/>
                            <Route path="browse-books" element={<BrowseBooks />}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}


export default App;