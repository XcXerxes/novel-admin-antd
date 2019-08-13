import * as types from '../actionTypes'
import { signin } from '../../api/User'

export const sigin = (data:{username:string, password:string}) => async (dispatch:any) => {
  try {
    const result = await signin(data)
    return dispatch({
      type: types.LOGIN_SUCCESS,
      result
    })
  } catch (error) {
    throw error
  }
}
