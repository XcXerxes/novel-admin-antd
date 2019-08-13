import * as React from 'react'
import classnames from 'classnames'
import * as styles from './index.scss'
import { BreadcrumbContext } from '../../common/breadcrumbContext'
import * as pathToRegexp from 'path-to-regexp'
import { Breadcrumb } from 'antd'
import { urlToList } from '../_utils/pathTools'

type State = {
  breadcrumb: null | React.ReactNode;
}
type Props = {
  title?: string;
  logo?: string | React.ReactNode;
  action?: string | React.ReactNode;
  content?: string | React.ReactNode;
  extraContent?: string | React.ReactNode;
  className?: string;
  linkElement?: any;
}

/**
 * 面包屑
 * @param {Object} breadcrumbNameMap 面包屑配置
 * @param {Object} url 路由
 */
export function getBreadcrumb(breadcrumbNameMap:any, url: string) {
  let breadcrumb = breadcrumbNameMap[url]
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach((item: any) => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item]
      }
    })
  }
  return breadcrumb || {}
}

export default class PageHeader extends React.PureComponent<Props,State> {
  public state = {
    breadcrumb: null
  }
  public componentDidMount() {
    this.getBreadcrumbDom()
  }
  public getBreadcrumbDom = () => {
    const breadcrumb = this.conversionBreadcrumbList()
    this.setState({
      breadcrumb
    })
  }
  // 传入面包屑属性
  public getBreadcrumbProps = () => {
    const {routes: croutes, params: cparams, location: clocation, breadcrumbNameMap: cbreadcrumbNameMap} = this.context
    return {
      routes: croutes,
      params: cparams,
      routerLocation: clocation,
      breadcrumbNameMap: cbreadcrumbNameMap
    }
  }
  // 根据 location 生成面包屑
  public conversionFromLocation = (routerLocation:any, breadcrumbNameMap: any) => {
    const { linkElement = 'a' } = this.props
    const pathSnippets:Array<any> = urlToList(routerLocation.pathname)
    const extraBreadcrumbItems:Array<any> = pathSnippets.map((url: string, index: number) => {
      const currentBreadcrumb: any = getBreadcrumb(breadcrumbNameMap, url)
      if (currentBreadcrumb.inherited) {
        return null
      }
      console.log('currentBreadcrumb================', currentBreadcrumb)
      const isLink:boolean = index !== pathSnippets.length - 1 && currentBreadcrumb.component
      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          {React.createElement(
            isLink ? linkElement : 'span',
            { [linkElement === 'a' ? 'href' : 'to']: url},
            currentBreadcrumb.name
          )}
        </Breadcrumb.Item>
      ) : null
    })

    // 添加 home breadcrumbs
    const homeBreadcrumbItems = (
      <Breadcrumb.Item key="home">
        {
          React.createElement(
            linkElement,
            { [linkElement === 'a' ? 'href' : 'to']: '/'},
            '首页'
          )
        }
      </Breadcrumb.Item>
    )
    return (
      <Breadcrumb className={styles.breadcrumb}>
        {[homeBreadcrumbItems, ...extraBreadcrumbItems]}
      </Breadcrumb>
    )
  }
  // 渲染 bread 的子节点
  public itemRender = (route:any, params: any, routes: Array<any>, paths: any) => {
    const { linkElement = 'a' } = this.props
    const last = routes.indexOf(route) === routes.length - 1
    return last || !route.component ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      React.createElement(
        linkElement,
        {
          href: paths.join('/') || '/',
          to: paths.join('/') || '/'
        },
        route.breadcrumbName
      )
    )
  }
  // 将参数转化为面包屑导航
  public conversionBreadcrumbList = ():any => {
    const {routes, params, routerLocation, breadcrumbNameMap} = this.getBreadcrumbProps()
    // 传入 routes 和 params 属性
    if (routes && params) {
      return (
        <Breadcrumb 
          className={styles.breadcrumb}
          routes={routes.filter((route:any) => route.breadcrumbName)}
          params={params}
          itemRender={this.itemRender}
        />
      )
    }
    // 根据 location 生成面包屑
    if (routerLocation && routerLocation.pathname) {
      return this.conversionFromLocation(routerLocation, breadcrumbNameMap)
    }
  }
  public render() {
    const {
      title,
      logo,
      action,
      content,
      extraContent,
      className
    } = this.props
    const { breadcrumb } = this.state
    const clsString = classnames(styles.pageHeader, className)
    return (
      <div className={clsString}>
        {breadcrumb}
        <div className={styles.detail}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {action && <div className={styles.action}>{action}</div>}
            </div>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
              {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PageHeader.contextType = BreadcrumbContext
