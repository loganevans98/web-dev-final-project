import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FIND_ALL_TUITS, findAllTuits} from "../../actions/tuits-actions";
import * as service from '../../services/tuits-service';
import TuitListItem from "./tuit-list-item";


const TuitList = () => {
    const tuits = useSelector(
        state => state.tuits);
    const dispatch = useDispatch();

    useEffect(async () => {
        let tuitsFromService = await service.findAllTuits();
        dispatch({
            type: FIND_ALL_TUITS,
            tuitsFromService
        });

    },[]);

    useEffect(() => {
        async function findAllTuits(dispatch) {
            const tuits = await service.findAllTuits();
            dispatch({
                type: 'FIND_ALL_TUITS',
                tuits
            });
        }

        findAllTuits(dispatch)
    }, []);



    return (
        <ul className="ttr-tuits list-group">
            {
                tuits.map && tuits.map(tuit =>
                    <TuitListItem key={tuit._id}
                                  tuit={tuit}/>)
            }
        </ul>
    );
}

export default TuitList;

