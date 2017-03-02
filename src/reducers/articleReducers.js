export default function reducer(state={
    article: { price: {}},
    fetched: false,
    articleError: null
}, action) {
    switch (action.type) {
        case "FETCH_ARTICLE_FULFILLED": {
            return {
                ...state,
                fetched: true,
                article: action.payload
            }
        }
        case "FETCH_ARTICLE_REJECTED": {
            return {...state, articleError: true}
        }
        case "CLEAR_ARTICLE_ERROR": {
            return {...state, articleError: null}
        }
    }
    return state
}
