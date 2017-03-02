import axios from 'axios';

export function fetch(){
    dispatch({
        type: "FETCH_FULFILLED",
        payload: "World"})
}
