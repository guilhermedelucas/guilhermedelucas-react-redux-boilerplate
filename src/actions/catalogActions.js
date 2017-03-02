import axios from 'axios';

export function fetchCatalog(){
    return function(dispatch) {
        return axios.get('http://challenge.monoqi.net/catalog')
            .then((response) => {
                dispatch({type: "FETCH_CATALOG_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_CATALOG_REJECTED"})
            })
    }
}

//need an action to CLEAR_THE_CATALOG erros
