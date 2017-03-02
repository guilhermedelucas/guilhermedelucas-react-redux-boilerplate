import axios from 'axios';

export function fetch(){
    return{
        type: "FETCH",
        payload: "World"
    }
}

//example for asyn
// export function fetchArticle(sku){
//     var url = 'url'
//     return function(dispatch) {
//     return axios.get(url)
//         .then((response) => {
//             dispatch({type: "FETCH_ARTICLE_FULFILLED", payload: response.data})
//         })
//         .catch((err) => {
//             dispatch({type: "FETCH_ARTICLE_REJECTED"})
//         })
//     }
// }
