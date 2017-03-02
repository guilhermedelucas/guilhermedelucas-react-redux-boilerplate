import axios from 'axios';

export function fetchArticle(sku){
    var url = 'http://challenge.monoqi.net/article/' + sku
    return function(dispatch) {
    return axios.get(url)
        .then((response) => {
            dispatch({type: "FETCH_ARTICLE_FULFILLED", payload: response.data})
        })
        .catch((err) => {
            dispatch({type: "FETCH_ARTICLE_REJECTED"})
        })
    }
}

export function clearArticleError(){
    return {
        type: "CLEAR_ARTICLE_ERROR"
    }
}
