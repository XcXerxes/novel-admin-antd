import * as React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { getRouterData } from './common/router'
import store from './redux/store'
import { Provider } from 'react-redux'
import Authorized from './utils/Authorized'
import { getQueryPath } from './utils'

const { AuthorizedRoute } = Authorized

export default () => {
  const routerData = getRouterData()
  const BasicLayout = routerData['/'].component
  const UserLayout = routerData['/user'].component
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/user" component={UserLayout} />
          <AuthorizedRoute 
            path="/"
            render={(props: any) => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath={getQueryPath('/user/login', {
              redirect: window.location.href,
            })}
          />
        </Switch>
      </Router>
    </Provider>
  )
}
