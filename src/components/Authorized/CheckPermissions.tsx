
import { CURRENT } from './renderAuthorized'
/**
 * 
 * @param authority {权限判定 Permission }
 * @param currentAuthority  { 当前的权限 }
 * @param target {通过的组件}
 * @param Exception {未通过的组件}
 */

const checkPermissions = (authority:string | Array<any> | any, currentAuthority:string|any, target: React.ReactNode, Exception: React.ReactNode):any => {
  // 如果没有权限 查看所有
  if (!authority) {
    return target
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return target
    }
    return Exception
  }

  // string处理
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target
    }
    return Exception
  }

  // function处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority)
      if (bool) {
        return target
      }
      return Exception
    } catch (error) {
      throw error
    }
  }
}

export { checkPermissions}
const check = (authority:string | Array<any> | any, target:React.ReactNode, Exception:React.ReactNode) => {
  return checkPermissions(authority, CURRENT, target, Exception)
}

export default check
