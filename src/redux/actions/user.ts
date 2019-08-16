/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 16:56:16
 * @LastEditTime: 2019-08-16 16:55:39
 * @LastEditors: Please set LastEditors
 */
import * as types from '../actionTypes'
import { signin } from '../../api/User'
import { setToken } from '../../utils/auth'

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

export function setAuth (token: string) {
  setToken(token)
  return {
    type: types.SET_AUTH,
    data: token
  }
}
