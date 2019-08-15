import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Authorized from './Authorized'
import * as NProgress from 'nprogress'

type Props = {
  component: any;
  render: (props: any) => any;
  authority: string | any | Array<any>;
  redirectPath: any;
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
  public render() {
    const {component: Component, render, authority, redirectPath, ...rest} = this.props
    return (
      <Authorized 
        authority={authority}
        noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath}} />} />}
      >
        <Route {...rest} render={(props:any) => (Component ? <Component {...props} /> : render(props))} />
      </Authorized>
    )
  }
}
