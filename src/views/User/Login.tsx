import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import * as styles from './User.scss'
import * as User from '../../api/User'
import { setAuth } from '../../redux/actions/user'

type Props = {
  form: any;
  sigin: any;
  history: any;
}

type State = {
  loading: boolean;
}

interface IFormProps {
  username: string;
  password: string;
}

class Login extends React.PureComponent<Props, State> {
  public state = {
    loading: false
  }
  public handleSubmit = (e:any) => {
    e.preventDefault()
    this.props.form.validateFields(async (err: Error, values: IFormProps) => {
      if (!err) {
        this.setState({ loading: true })
        try {
          const {username, password} = values
          const result = await User.signin({username, password})
          this.setState({ loading: false })
          if (result && result.code === 0){
            setAuth(result.data.token)
            this.props.history.push('/')
          }
        } catch (error) {
          this.setState({ loading: false })
          throw error
        }
      }
    })
  }
  public render () {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state
    return (
      <Form className={styles.form} onSubmit={this.handleSubmit} >
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!'}]
          })(
            <Input prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, .25)'}} />} placeholder="请输入用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!'}]
          })(
            <Input type="password" prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0, .25)'}} />} placeholder="请输入密码" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.submit} loading={loading} >
            登录
          </Button>
          Or <a href="">现在注册?</a>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(Login)
