import * as React from 'react'
import { Card, Form, Input, Select, Upload, Icon, Button, Col } from 'antd'
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
  const ButtonItemLayout = {
    wrapperCol: {
      xs: { span: 24},
      sm: { span: 8, offset: 3 }
    }
  }
  function handleSubmit () {
    console.log('-----')
  }
  function handleSelectChange () {
    console.log('======================')
  }
  const normFile = (e:any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  const { getFieldDecorator } = props.form
  return (
    <Card>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="名称" hasFeedback={true}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="描述" hasFeedback={true}>
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
        <Form.Item label="类型" hasFeedback={true}>
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
          })(<Select
            placeholder="Select a option and change input text above"
            onChange={handleSelectChange}
          >
            <Select.Option value="male">首页</Select.Option>
            <Select.Option value="female">书架</Select.Option>
          </Select>)}
        </Form.Item>
        <Form.Item label="链接" hasFeedback={true}>
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
        <Form.Item label="上传图片">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>
        <Form.Item {...ButtonItemLayout}>
          <Col xs={24} sm={8}>
            <Button block={true}>重置信息</Button>
          </Col>
          <Col xs={24} sm={8} offset={2}>
            <Button block={true} type="primary">提交信息</Button>
          </Col>
        </Form.Item>
      </Form>
    </Card>
  )
}
const WrapperAdverCreateForm = Form.create({name: 'adverCreate'})(AdverCreate)
export default WrapperAdverCreateForm
