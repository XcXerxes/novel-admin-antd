/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 16:56:16
 * @LastEditTime: 2019-08-16 17:14:25
 * @LastEditors: Please set LastEditors
 */
import * as dayjs from 'dayjs'
import queryString from 'query-string'

function getRelation(str1:string, str2:string) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

/**
 * 
 * @param routes Array<string>
 */
function getRenderArr(routes: Array<string>):Array<string> {
  let renderArr = []
  renderArr.push(routes[0])
  for (let i = 1; i < routes.length; i++) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1)
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3)
    if (isAdd) {
      renderArr.push(routes[i])
    }
  }
  return renderArr
}

/**
 * 
 * @param path 
 * @param routerData 
 */
type routerDataProps = {
  name?: string;
  path?: string;
}
export function getRoutes(path:string, routerData: routerDataProps): Array<any> {
  // 过滤掉根路径
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  )
  // 替换 path 为 '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''))
  // 获取要渲染的路径 同时 删除深层的渲染
  const renderArr = getRenderArr(routes)
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1)
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`
    }
  })
  return renderRoutes
}

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export function isUrl(path:string) {
  return reg.test(path)
}

/**
 * 
 * @param type 时间的类型 eg. today/week/mouth/year
 */
export function getTimeDistance(type:string) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24
  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [dayjs(now), dayjs(now.getTime() + (oneDay))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    
    // 用于计算 星期- 到 星期天
    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }
    const beginTime = now.getTime() - day * oneDay
    return [dayjs(beginTime), dayjs(beginTime + (7 * oneDay))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = dayjs(now).add(1, 'month')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [
      dayjs(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      dayjs(dayjs(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ]
  }

  if (type === 'year') {
    const year = now.getFullYear()
    return [dayjs(`${year}-01-01 00:00:00`), dayjs(`${year}-12-31 23:59:59`)]
  }
  return 
}

export function fixedZero(val:number) {
  return val * 1 < 10 ? `0${val}` : val
}

export function getQueryPath(path:string = '', query = {}) {
  const search = queryString.stringify(query);
  if (search.length) {
    return `${path}?${search}`
  }
  return path
}
