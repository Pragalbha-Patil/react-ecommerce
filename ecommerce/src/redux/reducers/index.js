const shirts = (state = [] , action) => {

    switch(action.type) {
        case 'FETCH_POSTS_SUCCESS':
            return action.payload.shirts
        default:
            return state
    }
}

export default shirts