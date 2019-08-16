import * as React from 'react'
import { Spin } from 'antd'
import { getMenuData } from './menu'
import * as pathToRegexp from 'path-to-regexp'
import * as Loadable from 'react-loadable'

let routerDataCache:any

const getRouterDataCache = () => {
  if (!routerDataCache) {
    routerDataCache = getRouterData()
  }
  return routerDataCache
}

/**
 * 将 menu<[{}]> 转换为 {path: ...item}
 * @param menus 
 */
type MenuPrps = {
  icon?: string;
  name?: string;
  path: string;
  children?: any;
}
function getFlatMenuData(menus: Array<MenuPrps>) {
  let keys:any = {}
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = {...item}
      keys = {...keys, ...getFlatMenuData(item.children)}
    } else {
      keys[item.path] = {...item}
    }
  })
  return keys
}

/**
 * 
 * @param menuData 
 * @param path 
 */
function findMenuKey(menuData:MenuPrps, path:string):any {
  // 找到这种 /user/:id 路径
  const menuKey = Object.keys(menuData).find(key => pathToRegexp(path).test(key))
  if (menuKey === null) {
    if (path == '/') {
      return null
    }
    const lastIdx = path.lastIndexOf('/')
    if (lastIdx < 0) {
      return null
    }
    // 只有一段的路径 eg. /user
    if (lastIdx === 0) {
      return findMenuKey(menuData, '/')
    }
    // 如果没有， 使用上层的配置
    return findMenuKey(menuData, path.substr(0, lastIdx))
  }
  return menuKey
}

function dynamicWrapper (component:any) {
  return Loadable({
    loader: () => {
      return component().then((raw: any) => {
        const Component = raw.default || raw
        return (props: any) => 
          React.createElement(Component, {
            ...props,
            routerData: getRouterDataCache()
          })
      })
    },
    loading: () => {
      return <Spin />
    }
  })
}

type RouterDataProp = {
  name?: string;
  authority?: string;
  hideInBreadcrumb?: boolean;
  inherited?: boolean;
}
export const getRouterData = ():RouterDataProp => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(() => import('../layouts/BasicLayout'))
    },
    '/adver/adver-list': {
      component: dynamicWrapper(() => import('../views/Adver/AdverList'))
    },
    '/adver/adver-create': {
      component: dynamicWrapper(() => import('../views/Adver/AdverCreate'))
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(() => import('../views/Dashboard/Analysis'))
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(() => import('../views/Dashboard/Monitor')),
      authority: 'user'
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(() => import('../views/Dashboard/Workplace'))
    },
    '/user': {
      component: dynamicWrapper(() => import('../layouts/UserLayout'))
    },
    '/user/login': {
      component: dynamicWrapper(() => import('../views/User/Login'))
    },
    '/exception/403': {
      component: dynamicWrapper(() => import('../views/Exception/403'))
    },
    '/exception/404': {
      component: dynamicWrapper(() => import('../views/Exception/404'))
    },
    '/exception/500': {
      component: dynamicWrapper(() => import('../views/Exception/500'))
    },
  }

  const menuData = getFlatMenuData(getMenuData())

  const routerData:RouterDataProp = {}
  // 根据菜单 生成路由
  Object.keys(routerConfig).forEach(path => {
    // regular match item name
    // eg. router /user/:id === /user/chen
    const regPath = pathToRegexp(path)
    let menuKey = Object.keys(menuData).find(key => regPath.test(key))
    const inherited = menuKey == null
    if (menuKey == null) {
      menuKey = findMenuKey(menuData, path)
    }
    let menuItem:any = {}
    if (menuKey) {
      menuItem = menuData[menuKey]
    }
    let router = routerConfig[path]

    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
      inherited,
    }
    routerData[path] = router
  })
  console.log('=============')
  console.log('=============', routerData)
  console.log('=============')
  return routerData
}
