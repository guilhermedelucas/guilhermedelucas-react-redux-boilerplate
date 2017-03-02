import axios from 'axios';

export function fetchCart(){
    return function(dispatch) {
        return axios.get('http://challenge.monoqi.net/cart')
            .then((response) => {
                dispatch({type: "FETCH_CART_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_CART_REJECTED"})
            })
    }
}

export function addToCart(articleSku, articlesOnCart, image){
    if (articlesOnCart.lines.findIndex(item => item.sku === articleSku) !== -1) {
        articlesOnCart.lines.map((item) => {
            if (articleSku == item.sku) {
                item.quantity = item.quantity + 1;
            }
        })
    } else {
        articlesOnCart = { lines : [...articlesOnCart.lines, {sku: articleSku, quantity: 1, image}]};
    }
    return function(dispatch) {
    return axios.put('http://challenge.monoqi.net/cart', articlesOnCart)
        .then((response) => {
            dispatch({type: "ADD_TO_CART", payload: { serverCart: response.data, articlesOnCart: articlesOnCart}})
        }).catch((err) => {
            dispatch({type: "ADD_TO_CART_FAIL", payload: articleSku})
        })
    }
}

export function updateQuantity(articleSku, articlesOnCart){
    articlesOnCart.lines.map((item, index) => {
        if (articleSku == item.sku) {
            item.quantity = item.quantity - 1;
            if (item.quantity == 0) {
                articlesOnCart.lines.splice(index, 1);
            }
        }
    })
    return function(dispatch) {
    return axios.put('http://challenge.monoqi.net/cart', articlesOnCart)
        .then((response) => {
            dispatch({type: "UPDATE_CART_QUANTITY", payload: { serverCart: response.data, articlesOnCart: articlesOnCart}})
        }).catch((err) => {
            dispatch({type: "UPDATE_CART_FAIL", payload: articleSku})
        })
    }
}

export function removeFromCart(articleSku, articlesOnCart){
    articlesOnCart.lines.map((item, index) => {
        if (item.sku == articleSku) {
            articlesOnCart.lines.splice(index, 1)
        }
    })
    return function(dispatch) {
    return axios.put('http://challenge.monoqi.net/cart', articlesOnCart)
        .then((response) => {
            dispatch({type: "UPDATE_CART_QUANTITY", payload: { serverCart: response.data, articlesOnCart: articlesOnCart}})
        }).catch((err) => {
            dispatch({type: "UPDATE_CART_FAIL", payload: articleSku})
        })
    }
}

export function clearCartError() {
    return {
        type: "CLEAR_CART_ERROR",
    }
}
