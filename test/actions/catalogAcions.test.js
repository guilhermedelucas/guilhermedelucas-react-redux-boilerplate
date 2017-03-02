import { fetchCatalog } from '../../src/actions/catalogActions'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import nock from 'nock';
import axios from 'axios' // v0.15.3
import httpAdapter from 'axios/lib/adapters/http';
axios.defaults.adapter = httpAdapter;

// describe("clearArticleError", () => {
//     it('should create an action to clear the article error', () => {
//         const expectedAction = {
//             type: "CLEAR_ARTICLE_ERROR",
//         }
//         expect(clearArticleError()).toEqual(expectedAction)
//     })
// })

describe('Fetch catalog when load the page', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('creates FETCH_CATALOG_FULFILLED when fetching article has been done', done => {
        const store = mockStore({})

        nock('http://challenge.monoqi.net')
            .get('/catalog')
            .reply(200, { response: "somedata" });

        const expectedActions = [{
            type: "FETCH_CATALOG_FULFILLED",
            payload: { response: "somedata" }}];

        return store.dispatch(fetchCatalog())
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
                done();
            })
    });

    it('creates FETCH_CATALOG_FULFILLED request error, returns an empty response', done => {
        const store = mockStore({})

        nock('http://challenge.monoqi.net/')
            .get('/catalog')
            .replyWithError();

        const expectedActions = [{
            type: "FETCH_CATALOG_FULFILLED", payload: ""
        }];

        return store.dispatch(fetchCatalog())
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
                done();
            })
    });

    it('FETCH_CATALOG_REJECTED 404', done => {
        const store = mockStore({})

        nock('http://challenge.monoqi.net/')
            .get('/catalog')
            .reply(404);

        const expectedActions = [{
            type: "FETCH_CATALOG_REJECTED"
        }];

        return store.dispatch(fetchCatalog())
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
                done();
            })
    });

    it('FETCH_CATALOG_REJECTED by 500', done => {
        const store = mockStore({})

        nock('http://challenge.monoqi.net/')
            .get('/catalog')
            .reply(500);

        const expectedActions = [{
            type: "FETCH_CATALOG_REJECTED"
        }];

        return store.dispatch(fetchCatalog())
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
                done();
            })
    });


});
