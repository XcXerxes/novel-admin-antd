import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Authorized from './Authorized'
import * as NProgress from 'nprogress'
import { getToken } from '../../utils/auth'

type Props = {
  component: any;
  render: (props: any) => any;
  authority: string | any | Array<any>;
  redirectPath: any;
  history: any;
}

export default class AuthorizedRoute extends React.PureComponent<Props> {
  public componentWillMount() {
    NProgress.start()
  }
  public componentDidMount() {
    console.log('end=======')
    NProgress.done()
  }
  public componentDidCatch() {
    NProgress.done()
  }
  public handleRender = (props: any):React.ReactNode => {
    const {component: Component, render } = this.props
    if (!getToken()) {
      return (
        <Redirect to="/user/login" />
      )
    }
    return Component ? <Component {...props} /> : render(props)
  }
  public render() {
    const {component: Component, render, authority, redirectPath, ...rest} = this.props
    return (
      <Authorized 
        authority={authority}
        noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath}} />} />}
      >
        <Route {...rest} render={this.handleRender} />
      </Authorized>
    )
  }
}
