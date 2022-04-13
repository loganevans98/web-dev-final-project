import React from "react";
import PostSummaryList from "../PostSummaryList/index";
import "./explore.css";

const ExploreComponent = ({active = 'for-you'}) => {
    return(
        <div>
            <div className="d-flex align-items-center mb-2">
                <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                    <input type="text" className="form-control" placeholder="Search Tuiter"/>
                </div>
                <a href="../explore-settings.html"><i className="fas fa-cog fa-2x text-primary ms-4"></i></a>
            </div>
            <ul className="nav mb-2 nav-tabs mb-2 text-wrap">
                <li className="nav-item">
                    <a className={`nav-link ${active === 'for-you' ? 'active' : ''}`} href="../../">For You</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${active === 'trending' ? 'active' : ''}`} href="../trending.html">Trending</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${active === 'news' ? 'active' : ''}`} href="../news.html">News</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${active === 'sports' ? 'active' : ''}`} href="../sports.html">Sports</a>
                </li>
                <li className="nav-item d-none d-md-block d-lg-block d-xl-block">
                    <a className={`nav-link ${active === 'entertainment' ? 'active' : ''}`} href="../entertainment.html">Entertainment</a>
                </li>
            </ul>
            <div className="card rounded-0 border-bottom-0">
                <img src="../../images/starship.jpeg" className="card-img-top rounded-0"/>
                    <div className="card-img-overlay">
                        <h3 className="card-title">SpaceX's Starship</h3>
                    </div>
            </div>
            <PostSummaryList />
        </div>
    );
}
export default ExploreComponent;
