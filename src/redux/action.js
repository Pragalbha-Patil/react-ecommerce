import axios from 'axios'

//synchronous action creator
const fetchShirt = shirts => ({
    type: 'FETCH_POSTS_SUCCESS',
    payload: { shirts }
})

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchShirts =  () => {
    return async dispatch => {
        try {
            let shirts = await axios.get('https://www.prolicing.tech/get-shirts-data')
            dispatch(fetchShirt(shirts.data))
        }
        catch(e){
            console.log(e)
        }
    }
}