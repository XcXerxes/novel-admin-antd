/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 16:56:15
 * @LastEditTime: 2019-08-14 23:36:42
 * @LastEditors: Please set LastEditors
 */
import Request from './Request'

export interface ISigninParams {
  username: string;
  password: string;
}

export function signin (data:ISigninParams) {
  return Request('/signin', {
    body: JSON.stringify(data)
  })
}
