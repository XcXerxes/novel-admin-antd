import * as React from 'react'
import { Layout, Menu, Icon } from 'antd'
import {Link} from 'react-router-dom'
import * as styles from  './SiderMenu.scss'
import * as pathToRegexp from 'path-to-regexp'
import { urlToList } from '../_utils/pathTools'

const { Sider } = Layout
const { SubMenu } = Menu

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => [path,path2]
 * @param  menu
 */
export const getFlatMenuKeys = (menu:any) =>
  menu.reduce((keys: any, item:any) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys:any, paths:any) =>{
  console.log('flatMenuKeys===========', paths)
  return paths.reduce(
    (matchKeys:any, path:string) =>
      matchKeys.concat(flatMenuKeys.filter((item:any) => pathToRegexp(item).test(path))),
    []
  )
}

type Props = {
  menusData?: any;
  location?: any;
  onCollapse?: (collapsed:boolean) => void;
  collapsed: boolean;
  logo?: string;
  Authorized?: any;
}
type State = {
  openKeys: Array<any>;
}
export default class SideMenu extends React.PureComponent<Props, State> {
  private flatMenuKeys:any;
  constructor(props: Props) {
    super(props)
    this.flatMenuKeys = getFlatMenuKeys(props.menusData)
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props)
    }
  }
  public getDefaultCollapsedSubMenus = (props:Props) => {
    const {
      location: { pathname },
    } = props || this.props
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  }
  public getIcon = (icon:any) => {
    if (typeof icon === 'string') {
      if (icon.indexOf('http') === 0) {
        return <img src={icon} alt="icon" className="sider-menu-item-img" />
      }
      return <Icon type={icon} />
    }
    return icon
  }
  // conversion Path
  // 转化路径
  public conversionPath = (path:string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  }
  /**
   * 判断是否是http链接，返回Link 或者a
   */
  public getMenuItemPath = (item:any) => {
    const itemPath = this.conversionPath(item.path)
    const icon = this.getIcon(item.icon)
    const { target, name } = item
    // 如果是 http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={item.path} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      )
    }
    const { location } = this.props
    return (
      <Link
        to={item.path}
        target={target}
        replace={itemPath === location.pathname}
      >
        {icon}
        <span>{name}</span>
      </Link>
    )
  }
  /**
   * 获取二级菜单
   */
  public getSubMenuOrItem = (item:any) => {
    if (item.children && item.children.some((child: any) => child.name)) {
      const childrenItems = this.getMenuItems(item.children)
      // 当无子菜单就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            key={item.path}
            title={
              item.icon ? (
                <span>
                  {this.getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (item.name)
            }
          >
            {childrenItems}
          </SubMenu>
        )
      }
      return null
    } else {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
    }
  }
  /**
   * 获取菜单子节点
   */
  public getMenuItems = (menusData:any) => {
    if (!menusData) {
      return []
    }
    return menusData.filter((item: any) => item.name && !item.hideInMenu)
      .map((item: any) => {
        const ItemDOm = this.getSubMenuOrItem(item)
        return this.checkPremissionItem(item.authority, ItemDOm)
      })
  }
  /**
   * 返回带权限的 菜单
   */
  public checkPremissionItem = (authority: string, ItemDOm: any) => {
    const { Authorized } = this.props
    if (Authorized && Authorized.check) {
      return Authorized.check(authority, ItemDOm)
    }
    return ItemDOm 
  }
  public isMainMenu = (openKey:any) => {
    const { menusData } = this.props
    return menusData.some((item:any) => openKey && (item.key === openKey || item.path === openKey))
  }
   // Get the currently selected menu
   public getSelectedMenuKeys = () => {
    const {
      location: { pathname }
    } = this.props
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname))
  };
  public handleOpenChange = (openKeys:any) => {
    const lastOpenKey = openKeys[openKeys.length - 1]
    const moreThanOne = openKeys.filter((openKey: any) => this.isMainMenu(openKey)).length > 1
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys]
    })
  }
  public render() {
    const { menusData, onCollapse, collapsed, logo } = this.props
    const { openKeys } = this.state
    let selectedKeys = this.getSelectedMenuKeys()
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]]
    }
    const menuProps = collapsed ? {} : { openKeys }
    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        breakpoint="lg"
        width={256}
        onCollapse={onCollapse}
        className={styles.container}
      >
        <a className={styles.logoContent}>
          <img src={logo} alt=""/>
          {!collapsed && <h3>Ant Design</h3>}
        </a>
        <Menu
          key="Menu"
          mode="inline"
          theme="dark"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getMenuItems(menusData)}
        </Menu>
      </Sider>
    )
  }
}
