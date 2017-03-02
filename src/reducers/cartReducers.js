
//defining the state on the start of the reduce
export default function reducer(state = {
        articlesOnCart: { lines:[] },
        fetched: false,
        articlesOnServerCart: { lines: [ { price: {}, lineTotal: {} }]},
        errorCart: { err: null , errorSku: null},
    }, action) {

    switch (action.type) {

        case "FETCH_CART_FULFILLED": {
            return {...state, articlesOnServerCart: action.payload, articlesOnCart: action.payload, fetched: true}
        }
        case "FETCH_CART_REJECTED": {
            return {...state, error: action.payload}
        }

        case "ADD_TO_CART": {
            return {...state, articlesOnCart: { lines: action.payload.articlesOnCart.lines}, articlesOnServerCart: { lines:  action.payload.serverCart.lines}}
        }

        case "ADD_TO_CART_FAIL": {
            return {
                ...state,
                errorCart: {
                    err: true,
                    skuError: action.payload
                }
            }
        }

        case "UPDATE_CART_QUANTITY": {
            return {
                ...state,
                articlesOnCart: { lines: action.payload.articlesOnCart.lines}, articlesOnServerCart: { lines:  action.payload.serverCart.lines}
            }
        }

        case "UPDATE_CART_FAIL": {
            return {
                ...state,
                errorCart: {
                    err: true,
                    skuError: action.payload
                }
            }
        }

        case "CLEAR_CART_ERROR": {
            return {
                ...state,
                errorCart: {
                    err: null,
                    skuError: null
                }
            }
        }

        case "REMOVE_FROM_CART": {
            return {
                ...state,
                tweet: state.tweets.filter(tweet => tweet.id =! action.paylod)
            }
        }
    }
    return state

}
