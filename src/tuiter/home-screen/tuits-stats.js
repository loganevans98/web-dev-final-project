import {useDispatch} from "react-redux";
import {updateTuit} from "../../actions/tuits-actions";
import React from "react";

const TuitStats = ({tuit}) => {
    const dispatch = useDispatch();
    return (
        <div className="d-flex flex-row justify-content-between align-items-end pt-2 w-75">
            <div><i className="fas fa-comment pe-1"></i>{tuit.comments}</div>
            <div><i className="fas fa-retweet pe-1"></i>{tuit.retweets}</div>
                <div>
                    Likes: {tuit.likes}
                    <i onClick={() => updateTuit(dispatch, {
                        ...tuit,
                        likes: tuit.likes + 1
                    })} className="far fa-thumbs-up ms-2"></i>
                    </div>

                    <div>
                        Dislikes: {tuit.dislikes}
                        <i onClick={() => updateTuit(dispatch, {
                            ...tuit,
                            dislikes: tuit.dislikes + 1
                        })} className="far fa-thumbs-down ms-2"></i>
                    </div>
            <div><i className="fas fa-share-square"></i> </div>

        </div>
);
}
export default TuitStats;

