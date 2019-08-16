/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 16:56:15
 * @LastEditTime: 2019-08-16 20:57:08
 * @LastEditors: Please set LastEditors
 */
import { isUrl } from '../utils'
import { getValue } from '../locales/util'

const menuData = [
  {
    name: getValue('menus.dashboard'),
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: getValue('menus.analysis'),
        path: 'analysis'
      },
      {
        name: getValue('menus.monitor'),
        path: 'monitor',
        authority: 'user'
      },
      {
        name: getValue('menus.workplace'),
        path: 'workplace'
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ]
  },
  {
    name: getValue('menus.form'),
    icon: 'form',
    path: 'form',
    children: [
      {
        name: getValue('menus.basicForm'),
        path: 'basic-form'
      }
    ]
  },
  {
    name: getValue('menus.adverManager'),
    icon: 'book',
    path: 'adver',
    children: [
      {
        name: getValue('menus.adverList'),
        path: 'adver-list'
      },
      {
        name: getValue('menus.createAdver'),
        path: 'adver-create'
      }
    ]
  },
  {
    name: getValue('menus.exception'),
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: getValue('menus.403'),
        path: '403'
      },
      {
        name: getValue('menus.404'),
        path: '404'
      },
      {
        name: getValue('menus.500'),
        path: '500'
      },
    ]
  }
]
type MenuProps = {
  path: string;
  children?: Array<any>;
  name: string;
  icon?: string;
  authority?: any;
}

function formatter(data: Array<MenuProps>, parentPath = '/', parentAuthority?: string) {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
    }
    return result
  })
}

export const getMenuData = ():Array<MenuProps> => formatter(menuData)
