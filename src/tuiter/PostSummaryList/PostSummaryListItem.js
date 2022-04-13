import React from "react";

const PostSummaryListItem = ({
                                 post = {
                                     "topic": "Web Development",
                                     "userName": "ReactJS",
                                     "time": "2h",
                                     "title": "React.js is a component based front end library that makes it very easy to build Single Page Applications or SPAs",
                                     "image": "../../images/react.png"
                                 }
                             }
) => {
    return(
        <div>
            <li className="list-group-item d-flex flex-row justify-content-between align-items-center">
                <div className="wd-tuit-text float-left text-wrap">
                    <div className="text-muted">{post.topic} <br/></div>
                    <span className="d-inline"><b>{post.userName} <i className="fas fa-check-circle"></i></b> <span
                        className="text-muted">- {post.time} <br/></span></span>
                    <b>{post.title}</b>
                </div>
                <img className="wd-tuit-img rounded float-right" width="60" src={post.image}/>
            </li>
        </div>
    );
};

export default PostSummaryListItem;