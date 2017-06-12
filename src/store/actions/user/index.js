export const FETCHING_USER = 'FETCHING_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

export function getUser(id) {
  console.log('action:getUser', id)
  return (dispatch) => {
    dispatch({
      type: FETCHING_USER
    })
    fetch(`http://localhost:9001/user/${id}`)
      .then(res => res.json())
      .then(user => {
        console.log('user', user)
        dispatch({
          type: FETCH_USER_SUCCESS,
          id,
          user
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: FETCH_USER_ERROR,
          id,
          err
        })
      })
  }
}
