import * as React from 'react'
import * as styles from './index.scss'
import { Icon, Menu, Dropdown } from 'antd'

type Props = {
  collapsed: boolean;
  onCollapse: (collapsed:boolean) => void;
  onMenuClick: (param:{key:string}) => void;
}

export default class GlobalHeader extends React.PureComponent<Props> {
  public toggle = () => {
    const { collapsed, onCollapse } = this.props
    onCollapse(!collapsed)
  }
  public render() {
    const { collapsed, onMenuClick } = this.props
    const menu = (
      <Menu className={styles.menu} onClick={onMenuClick} >
        <Menu.Item key="user">
          <Icon type="user" /> 个人中心
        </Menu.Item>
        <Menu.Item key="setting">
          <Icon type="setting" /> 设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" /> 推出登录
        </Menu.Item>
      </Menu>
    )
    return (
      <div className={styles.header}>
        <Icon 
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <span className={styles.name}>antony</span>
            </span>
          </Dropdown>
        </div>
      </div>
    )
  }
}
