export default function reducer(state={
    catalog: [],
    errorCatalog: null
}, action) {
    switch (action.type) {
        case "FETCH_CATALOG_FULFILLED": {
            return {
                ...state,
                catalog: action.payload.articles
            }
        }
        case "FETCHED_CATALOG_REJECT": {
            return {...state, errorCatalog: true}
        }
    }
    return state
}
