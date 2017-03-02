import reducer from '../../src/reducers/exampleReducers'

describe('Test reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({
            example: null
        })
    })

    it('should handle FETCH', () => {
        expect(
            reducer({}, {
                type: "FETCH"
            })
        ).toEqual({
            example: undefined
        })
    })
})
