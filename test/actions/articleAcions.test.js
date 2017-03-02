import {
    fetchArticle,
    clearArticleError
} from '../../src/actions/articleActions'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const sku = 199203;


import nock from 'nock';
import axios from 'axios' // v0.15.3
import httpAdapter from 'axios/lib/adapters/http';
axios.defaults.adapter = httpAdapter;

describe("clearArticleError", () => {
    it('should create an action to clear the article error', () => {
        const expectedAction = {
            type: "CLEAR_ARTICLE_ERROR",
        }
        expect(clearArticleError()).toEqual(expectedAction)
    })
})

describe('Fetch articles by the sku on url', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('creates FETCH_ARTICLE_FULFILLED when fetching article has been done', done => {
        const store = mockStore({})

        nock('http://challenge.monoqi.net')
            .get('/article/' + sku)
            .reply(200, {
                response: "somedata"
            });

        const expectedActions = [{
            type: "FETCH_ARTICLE_FULFILLED",
            payload: {
                response: "somedata"
            }
        }];

        return store.dispatch(fetchArticle(sku))
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
                done();
            })
    });

    it('FETCH_ARTICLE_FULFILLED request error, returns an empty response', done => {
        const store = mockStore({})

        nock('http://challenge.monoqi.net/')
            .get('/article/' + sku)
            .replyWithError();

        const expectedActions = [{
            type: "FETCH_ARTICLE_FULFILLED",
            payload: ""
        }];

        return store.dispatch(fetchArticle(sku))
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
                done();
            })
    });

    it('creates FETCH_ARTICLE_REJECTED 404', done => {
        const store = mockStore({})

        nock('http://challenge.monoqi.net/')
            .get('/article/' + sku)
            .reply(404);

        const expectedActions = [{
            type: "FETCH_ARTICLE_REJECTED"
        }];

        return store.dispatch(fetchArticle(sku))
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
                done();
            })
    });

    it('creates FETCH_ARTICLE_REJECT 500', done => {
        const store = mockStore({})

        nock('http://challenge.monoqi.net/')
            .get('/article/' + sku)
            .reply(500);

        const expectedActions = [{
            type: "FETCH_ARTICLE_REJECTED"
        }];

        return store.dispatch(fetchArticle(sku))
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
                done();
            })
    });


});
