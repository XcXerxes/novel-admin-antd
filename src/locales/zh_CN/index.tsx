/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 18:48:30
 * @LastEditTime: 2019-08-13 19:47:34
 * @LastEditors: Please set LastEditors
 */
import api from './api'
import menus from './menus'
import { getMessages } from '../../locales/util'

export default {
  ...getMessages(api, 'api'),
  ...getMessages(menus, 'menus')
}
