import * as React from 'react'
import { Card, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

export interface IAdverCreateProps extends FormComponentProps {
  test: string;
}

const AdverCreate:React.FC<IAdverCreateProps> = (props) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  }
  function handleSubmit () {
    console.log('-----')
  }
  const { getFieldDecorator } = props.form
  return (
    <Card>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="名称" hasFeedback={true}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="名称" hasFeedback={true}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="名称" hasFeedback={true}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="名称" hasFeedback={true}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
      </Form>
    </Card>
  )
}
const WrapperAdverCreateForm = Form.create({name: 'adverCreate'})(AdverCreate)
export default WrapperAdverCreateForm
