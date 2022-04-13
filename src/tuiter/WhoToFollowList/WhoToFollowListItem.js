import React from "react";

const WhoToFollowListItem = ({
                                who = {
                                    avatarIcon: '../../images/nasa.png',
                                    userName: 'NASA',
                                    handle: 'NASA',
                                }
                             }) => {
    return(
        <div>
            <li className="list-group-item d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex">
                    <img className="rounded-circle wd-avatar-img me-2" width="48" src={who.avatarIcon}/>
                        <div>
                            <div className="fw-bold text-nowrap w-75">{who.userName}
                                <i className="fas fa-check-circle"></i>
                            </div>
                            {who.handle}
                        </div>
                </div>
                <button className="btn btn-primary wd-follow-button">Follow</button>
            </li>
        </div>
    );
};

export default WhoToFollowListItem;