/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 16:56:16
 * @LastEditTime: 2019-08-16 16:58:42
 * @LastEditors: Please set LastEditors
 */
import { getToken } from '../../utils/auth'
import * as types from '../actionTypes'
export const users = (state:any={userInfo: {}, isSignin: !!getToken()}, action:any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userInfo: action.userInfo
      }
    case types.SET_AUTH:
      return {
        ...state,
        isSignin: !!action.data
      }
    default:
      return state
  }
}
