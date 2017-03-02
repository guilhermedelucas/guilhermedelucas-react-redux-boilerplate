export default function reducer(state={
    example: null
}, action) {
    switch (action.type) {
        case "FETCH": {
            return {
                ...state,
                example: action.payload
            }
        }
    }
    return state
}
