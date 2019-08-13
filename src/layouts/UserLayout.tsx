import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { Switch, Route } from 'react-router-dom'
import { getRoutes } from '../utils'
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'
import * as styles from './UserLayout.scss'

type Props = {
  routerData?: any;
  match?: any;
}

export default class UserLayout extends React.PureComponent<Props> {
  public render () {
    const {routerData, match} = this.props
    return (
      <DocumentTitle title="首页">
        <div className={styles.container}>
          <header>
            <Link to="#" className={styles.logoLink}>
              <img src={logo} alt="logo"/>
              <h3>Ant Design</h3>
            </Link>
          </header>
          <Switch>
            {getRoutes(match.path, routerData).map(item => (
              <Route 
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
          </Switch>
        </div>
      </DocumentTitle>
    )
  }
}