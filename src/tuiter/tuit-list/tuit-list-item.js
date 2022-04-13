import React from "react";
import {useDispatch} from "react-redux";
import TuitStats from "../home-screen/tuits-stats";
import {deleteTuit} from "../../actions/tuits-actions";


const TuitListItem = ({tuit = {
    "_id": "123",
    "topic": "Web Development",
    "postedBy": {
        "username": "ReactJS"
    },
    "liked": true,
    "verified": false,
    "handle": "ReactJS",
    "time": "2h",
    "title": "React.js is a component based front end library that makes it very easy to build Single Page Applications or SPAs",
    "tuit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "attachments": {
        "video": "unKvMC3Y1kI"
    },
    "logo": "../images/react.png",
    "avatar": "../images/react.png",
    "stats": {
        "comments": 123,
        "retuits": 234,
        "likes": 345
    }
    }}) => {
    const dispatch = useDispatch();

    return(
        <div>
            <div>
                <li className="list-group-item d-flex flex-row justify-content-between">

                    <img className="wd-tuit-list-item-img float-left mt-0" src={tuit.avatar}/>
                    <div className="wd-tuit-list-item-text text-wrap">
                        <span>
                            <div className="fw-bold d-inline">{tuit.handle}</div>
                            <div className="text-muted d-inline"><b> @{tuit.postedBy.username}</b></div>
                            <i onClick={() => deleteTuit(dispatch, tuit)} className="fa fa-window-close float-end"></i>
                        </span> <br />
                        {tuit.tuit} <br />
                        <div>
                            {tuit.attachments ?
                                (tuit.attachments.video ?
                                    <div>
                                        <iframe width="540" height="300" src={"https://www.youtube.com/embed/" + tuit.attachments.video}
                                                title="YouTube video player" frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                className="wd-tuit-list-item-attachment-video"
                                                allowFullScreen>

                                        </iframe>
                                    </div>
                                    : <div><img className="wd-tuit-list-item-attachment-img" src={tuit.attachments.image}/></div>)
                                : <div></div>}
                        </div>
                        <div>
                            <TuitStats tuit={tuit}/>
                        </div>
                    </div>
                </li>
            </div>
        </div>
    );
};

export default TuitListItem;