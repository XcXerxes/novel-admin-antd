import * as React from 'react'
import { Layout, Modal, message } from 'antd'
import { Switch, Redirect } from 'react-router-dom'
import { getMenuData } from '../common/menu'
import DocumentTitle from 'react-document-title'
import { ContainerQuery } from 'react-container-query'
import SiderMenu from '../components/SiderMenu/SiderMenu'
import classnames from 'classnames'
import { getRoutes } from '../utils'
import GlobalHeader from '../components/GlobalHeader'
import logo from '../assets/images/logo.svg'
import { BreadcrumbContext } from '../common/breadcrumbContext'
import Authorized from '../utils/Authorized'
import { logout } from '../api/User'
import { removeToken } from '../utils/auth'

const { AuthorizedRoute, check } = Authorized

const { Content, Header } = Layout

const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

/**
 * 获取面包屑配置
 * @param {Object} menuData 菜单
 * @param {Object} routerData 路由
 */
const getBreadcrumbNameMap = (menuData: any, routerData:any) => {
  const result = {}
  const childResult = {}
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData))
    }
  }
  return Object.assign({}, routerData, result, childResult)
}

type Props = {
  match?: any;
  location?: any;
  routerData?: any;
  history: any;
  collapsed: boolean;
}
type State = {
  collapsed: boolean;
  breadcrumbProps: any;
}
class BasicLayout extends React.PureComponent<Props, State> {
  public constructor(props:Props) {
    super(props)
    this.state = {
      collapsed: false,
      breadcrumbProps: {
        location: props.location,
        breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), props.routerData)
      }
    }
  }
  public componentDidMount() {
    getBreadcrumbNameMap(getMenuData(), this.props.routerData)
  }
  public handleMenuCollapse = (collapsed:boolean) => {
    this.setState({
      collapsed
    })
  }
  public handleMenuClick = (param:{key:string}) => {
    const { key } = param
    const { history } = this.props
    if (key === 'user') {
      console.log(key)
    } else if (key === 'setting') {
      console.log(key)
    } else if (key === 'logout') {
      Modal.confirm({
        title: '提示',
        content: '确认要退出吗?',
        async onOk() {
          try {
            const result = await logout()
            if (result && result.code === 0) {
              message.success(result.message || '退出成功')
              removeToken()
              history.replace('/user/login')
            } else {
              message.error(result.message || '退出失败')
            }
          } catch (error) {
            throw error
          }
        }
      })
    }
  }
  public getBaseRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      const { routerData } = this.props;
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(
        item => check(routerData[item].authority, item) && item !== '/'
      );
      return authorizedPath
    }
    return redirect
  }
  public render() {
    const {location, match, routerData} = this.props
    const { collapsed } = this.state
    const baseRedirect:any = this.getBaseRedirect()
    const layout = (
      <Layout>
        <SiderMenu 
          menusData={getMenuData()}
          location={location}
          collapsed={collapsed}
          onCollapse={this.handleMenuCollapse}
          logo={logo}
          Authorized={Authorized}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader 
              collapsed={collapsed}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
            />
          </Header>
          <Content style={{ margin: '24px 24px 24px', height: '100%' }}>
            <Switch>
              {getRoutes(match.path, routerData).map((item: any) => (
                <AuthorizedRoute 
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                  authority={item.authority}
                />
              ))}
              <Redirect exact={true} from="/" to={baseRedirect} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
    return (
      <BreadcrumbContext.Provider value={this.state.breadcrumbProps} >
        <DocumentTitle title="Ant-design">
          <ContainerQuery query={query} >
            {(params:any) => <div className={classnames(params)}>{layout}</div>}
          </ContainerQuery>
        </DocumentTitle>
      </BreadcrumbContext.Provider>
    )
  }
}

export default BasicLayout
