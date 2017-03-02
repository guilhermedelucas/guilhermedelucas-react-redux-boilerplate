import reducer from '../../src/reducers/articleReducers'

describe('Article reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({
            article: {
                price: {}
            },
            fetched: false,
            articleError: null
        })
    })

    it('should handle FETCH_ARTICLE_FULFILLED', () => {
        expect(
            reducer({}, {
                type: "FETCH_ARTICLE_FULFILLED"
            })
        ).toEqual({
            fetched: true,
            article: undefined
        })
    })

    it('should handle FETCH_RTICLE_REJECTED', () => {
        expect(
            reducer({}, {
                type: "FETCH_ARTICLE_REJECTED"
            })
        ).toEqual({
            articleError: true
        })
    })

    it('should handle CLEAR_ARTICLE_ERROR', () => {
        expect(
            reducer({}, {
                type: "CLEAR_ARTICLE_ERROR"
            })
        ).toEqual({
            articleError: null
        })
    })
})
