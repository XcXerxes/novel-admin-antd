/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 16:44:40
 * @LastEditTime: 2019-08-16 16:50:33
 * @LastEditors: Please set LastEditors
 */
import Cookie from 'js-cookie'
const tokeName:string = 'authorization'

export function setToken (token: string) {
  Cookie.set(tokeName, token)
}

export function getToken () {
  return Cookie.get(tokeName)
}

export function removeToken () {
  Cookie.remove(tokeName)
}
