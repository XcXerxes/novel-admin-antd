import Authorized from './Authorized'
import AuthorizedRoute from './AuthorizedRoute'
import check from './CheckPermissions'
import renderAuthorize from './renderAuthorized'
import './NProgress.css'

const NAuthorized:any = Authorized

NAuthorized.AuthorizedRoute = AuthorizedRoute
NAuthorized.check = check

export default renderAuthorize(NAuthorized)