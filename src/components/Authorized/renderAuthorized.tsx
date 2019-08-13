let CURRENT:string|any = 'NULL'

const renderAuthorize =(Authorized:any) => {
  return (currentAuthority:any) => {
    if (currentAuthority) {
      if (currentAuthority.constructor.name === 'Function') {
        CURRENT = currentAuthority()
      }
      if (currentAuthority.constructor.name === 'String' ||
      currentAuthority.constructor.name === 'Array') {
        CURRENT = currentAuthority
      }
    } else {
      CURRENT = 'NULL'
    }
    return Authorized
  }
}

export { CURRENT }
export default (Authorized:any) => renderAuthorize(Authorized)
