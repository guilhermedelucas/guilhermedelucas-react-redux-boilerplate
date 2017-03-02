import { fetch } from '../../src/actions/exampleAction'



//this imports are for asyn action//
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const sku = 199203;


import nock from 'nock';
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http';
axios.defaults.adapter = httpAdapter;

//this imports are for asyn action//


describe("sync actions", () => {
    it('TRIGGER FETCH', () => {
        const expectedAction = {
            type: "FETCH",
            payload: "World"
        }
        expect(fetch()).toEqual(expectedAction)
    })
});
