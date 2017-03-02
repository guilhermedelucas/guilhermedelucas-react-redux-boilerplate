import {
    fetchCart, addToCart, updateQuantity, clearCartError, removeFromCart
} from '../../src/actions/cartActions'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const sku = 199203;


import nock from 'nock';
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http';
axios.defaults.adapter = httpAdapter;

describe("sync actions", () => {
    it('should empty the "CLEAR_CART_ERROR"', () => {
        const expectedAction = {
            type: "CLEAR_CART_ERROR",
        }
        expect(clearCartError()).toEqual(expectedAction)
    })
});

describe('async Fetch cart starting sessions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('creates FETCH_CART_FULFILLED when start the session', done => {
        const store = mockStore({})

        nock('http://challenge.monoqi.net')
            .get('/cart')
            .reply(200, {
                response: "somedata"
            });

        const expectedActions = [{
            type: "FETCH_CART_FULFILLED",
            payload: {
                response: "somedata"
            }
        }];

        return store.dispatch(fetchCart())
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
                done();
            })
    })

        it('creates FETCH_CART_REJECTED on error', done => {
            const store = mockStore({})

            nock('http://challenge.monoqi.net')
                .get('/cart')
                .reply(404)

            const expectedActions = [{
                type: "FETCH_CART_REJECTED"
            }];

            return store.dispatch(fetchCart())
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                    done();
                })
        })

        it('creact ADD_TO_CART and update quantity, one more item', done => {
            const articleSku = 199306;
            const articlesOnCart = { lines: [{sku: 199306, quantity: 1}]}
            const store = mockStore({})
            nock('http://challenge.monoqi.net')
                .put('/cart', articlesOnCart)
                .reply(200, { response: { data: { lines: [{sku: 199306, quantity: 2 }] } }})

            const expectedActions = [{
                type: "ADD_TO_CART",
                payload: {
                        serverCart: {
                            response: {
                                data: {
                                    lines: [{
                                        sku: 199306,
                                        quantity: 2
                                    }]
                                }
                            }
                        },
                    articlesOnCart: { lines: [{sku: 199306, quantity: 2}]}
                    //that case the initalarticleOnCart was updated
                }
                }];

            return store.dispatch(addToCart(articleSku, articlesOnCart))
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                    done();
                })
        })


        it('creact ADD_TO_CART and add article to empty cart', done => {
            const image = "somedata"
            const articleSku = 199306;
            const articlesOnCart = { lines: []}
            const store = mockStore({})
            nock('http://challenge.monoqi.net')
                .put('/cart', articlesOnCart)
                .reply(200, { response: { data: { lines: [{sku: 199306, quantity: 1 }] } }})

            const expectedActions = [{
                type: "ADD_TO_CART",
                payload: {
                        serverCart: {
                            response: {
                                data: {
                                    lines: [{
                                        sku: 199306,
                                        quantity: 1
                                    }]
                                }
                            }
                        },
                    articlesOnCart: { lines: [{sku: 199306, quantity: 1, image: image}]}
                }
                }];

            return store.dispatch(addToCart(articleSku, articlesOnCart, image))
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                    done();
                })
        })

        it('creact ADD_TO_CART but sent invalid SKU, server respond with last valid cart', done => {
            const image = "somedata"
            const articleSku = "0000000";
            const articlesOnCart = { lines: [{ sku: 199306, quantity: 2, image: image }]};
            const store = mockStore({})
            nock('http://challenge.monoqi.net')
                .put('/cart', articlesOnCart)
                .reply(200,
                    { response: { data: { lines: [{sku: 199306, quantity: 2 }] } }}
                )

            const expectedActions = [{
                type: "ADD_TO_CART",
                payload: {
                        serverCart: {
                            response: {
                                data: {
                                    lines: [{
                                        sku: 199306,
                                        quantity: 2
                                    }]
                                }
                            }
                        },
                    articlesOnCart: { lines: [{ sku: 199306, quantity: 2, image: image}, {sku: "0000000", quantity: 1, image: image}]}
                }}];
            return store.dispatch(addToCart(articleSku, articlesOnCart, image))
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                    done();
                })
            })

        it('creact ADD_TO_CART_FAIL server return error 400', done => {
            const image = "somedata"
            const articleSku = 199306;
            const articlesOnCart = { lines: []}
            const store = mockStore({})
            nock('http://challenge.monoqi.net')
                .put('/cart', articlesOnCart)
                .reply(400)

            const expectedActions = [{
                type: "ADD_TO_CART_FAIL",
                payload: articleSku
                }];
            return store.dispatch(addToCart(articleSku, articlesOnCart, image))
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                    done();
                })
            })


        it('creact UPDATE_CART_QUANTITY when successfully decrease the quantity', done => {
            const image = "somedata"
            const articleSku = 199306;
            const articlesOnCart = { lines: [{ sku: 199306, quantity: 2, image: image}]};
            const store = mockStore({})
            nock('http://challenge.monoqi.net')
                .put('/cart', articlesOnCart)
                .reply(200,
                    { response: { data: { lines: [{sku: 199306, quantity: 1 }] } }})

            const expectedActions = [{
                type: "UPDATE_CART_QUANTITY",
                payload: {
                        serverCart: {
                            response: {
                                data: {
                                    lines: [{
                                        sku: 199306,
                                        quantity: 1
                                    }]
                                }
                            }
                        },
                    articlesOnCart: { lines: [{sku: 199306, quantity: 1, image: image}]}
                }
                }];
            return store.dispatch(updateQuantity(articleSku, articlesOnCart, image))
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                    done();
                })
            })

        it('creact UPDATE_CART_QUANTITY and remove the object from the cart', done => {
            const image = "somedata"
            const articleSku = 199306;
            const articlesOnCart = { lines: [{ sku: 199306, quantity: 1, image: image}]};
            const store = mockStore({})
            nock('http://challenge.monoqi.net')
                .put('/cart', articlesOnCart)
                .reply(200,
                    { response: { data: { lines: [] } }})

            const expectedActions = [{
                type: "UPDATE_CART_QUANTITY",
                payload: {
                        serverCart: {
                            response: {
                                data: {
                                    lines: []
                                }
                            }
                        },
                    articlesOnCart: { lines: []}
                }
                }];
            return store.dispatch(updateQuantity(articleSku, articlesOnCart, image))
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                    done();
                })
            })

        it('creact UPDATE_CART_FAIL by server error 400', done => {
            const image = "somedata"
            const articleSku = 199306;
            const articlesOnCart = { lines: [{ sku: 199306, quantity: 5, image: image}]};
            const store = mockStore({})
            nock('http://challenge.monoqi.net')
                .put('/cart', articlesOnCart)
                .reply(400)

            const expectedActions = [{
                type: "UPDATE_CART_FAIL",
                payload: articleSku
            }];
            return store.dispatch(updateQuantity(articleSku, articlesOnCart, image))
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                    done();
                })
            })


        it('creact UPDATE_CART_FAIL removing the article, trigger by remove article on checkout', done => {
            const image = "somedata"
            const articleSku = 199306;
            //REMOVE THE ARTICLE 199306
            const articlesOnCart = { lines: [
                {
                    sku: 199306, quantity: 5, image: image
                },
                {
                    sku: 200000, quantity: 2, image: image
                }
            ]};
            const store = mockStore({})
            nock('http://challenge.monoqi.net')
                .put('/cart', articlesOnCart)
                .reply(200,
                    { response: {
                        data: {
                            lines: [{sku: 200000, quantity: 2}]
                        }
                    }
                })

            const expectedActions = [{
                type: "UPDATE_CART_QUANTITY",
                payload: {
                        serverCart: {
                            response: {
                                data: {
                                    lines: [{
                                        sku: 200000,
                                        quantity: 2
                                    }]
                                }
                            }
                        },
                    articlesOnCart: { lines: [{sku: 200000, quantity: 2, image: image}]}
                }
                }];
            return store.dispatch(removeFromCart(articleSku, articlesOnCart, image))
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                    done();
                })
            })
});
