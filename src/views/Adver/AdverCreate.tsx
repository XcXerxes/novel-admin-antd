import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Card, Form, Input, Select, Upload, Icon, Button, Col, Modal, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { getRootUrl } from '../../api/Request'
import { createAdver, getAdverById, updateAdverById } from '../../api/Adver'

export interface IAdverCreateProps extends FormComponentProps {
  test: string;
  history: any;
  location: any;
}

const AdverCreate:React.FC<IAdverCreateProps> = (props) => {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [type, setType] = useState(1)
  const [url, setUrl] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [cardLoading, setCardLoading] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [fileList, setFileList] = useState<any>([])
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
  useEffect(() => {
    const { location } = props
    if (location.search) {
      const id = location.search.split('=')[1]
      getInfo(id)
    }
  }, [])
  /**
   * 获取单个的信息
   * @param id 
   */
  async function getInfo (id: string) {
    try {
      setCardLoading(true)
      const result = await getAdverById({ id })
      setCardLoading(false)
      if (result && result.code === 0) {
        setTitle(result.data.title)
        setCaption(result.data.caption)
        setType(result.data.type)
        setUrl(result.data.url)
        setImgUrl(result.data.imgUrl)
        setFileList([
          {uid: '-1', name: result.data.imgUrl, status: 'done', url: `${getRootUrl()}/public/${result.data.imgUrl}`}
        ])
      }
    } catch (error) {
      setCardLoading(false)
      throw error
    }
  }
  /**
   * 提交信息
   * @param e 
   */
  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    props.form.validateFields(async(err, values) => {
      if (!err) {
        const { location } = props
        if (location.search) {
          const id = location.search.split('=')[1]
          updateAdver(id)
        } else {
          createAdverItem()
        }
      }
    })
  }
  async function createAdverItem () {
    try {
      setLoading(true)
      const result = await createAdver({ title, caption, type, url, imgUrl })
      setLoading(false)
      if (result && result.code === 0) {
        message.success(result.message || '创建成功')
        props.history.push('/adver/adver-list')
      } else {
        message.error(result.message || '提交成功')
      }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }
  async function updateAdver (id: string) {
    try {
      setLoading(true)
      const result = await updateAdverById({ title, caption, type, url, imgUrl, id })
      setLoading(false)
      if (result && result.code === 0) {
        message.success(result.message || '更新成功')
        props.history.push('/adver/adver-list')
      } else {
        message.error(result.message || '更新失败')
      }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }
  function handleSelectChange (value: number) {
    console.log('======================')
    setType(value)
  }
  /**
   * input输入值改变时
   * @param value input的值
   * @param type  input的类型
   */
  function handleChange (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, inputType: string):void {
    const value = event.target.value
    if (inputType === 'title') {
      setTitle(value)
    } else if (inputType === 'caption') {
      setCaption(value)
    } else if (inputType === 'url') {
      setUrl(value)
    }
  }
  /**
   * 上传图片
   * @param info 
   */
  const uploadHandleChange = (info:any) => {
    setFileList(info.fileList)
    if (info.file.status === 'uploading') {
      setLoading(true)
    }
    console.log('========================', info)
    if (info.file.status === 'done') {
      setLoading(false)
      setImgUrl(info.file.name)
    }
  }
  /**
   * 取消预览
   */
  function handleCancel () {
    setPreviewVisible(false)
  }
  /**
   * 打开预览
   */
  function handlePreview () {
    setPreviewVisible(true)
  }
  const { getFieldDecorator } = props.form
  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">上传图片</div> 
    </div>
  )
  const previewImage:string = getRootUrl() + '/public/' + imgUrl
  return (
    <Card loading={cardLoading}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="广告名称" hasFeedback={true}>
          {getFieldDecorator('title', {
            initialValue: title,
            rules: [
              {
                required: true,
                message: '请输入名称!'
              },
            ],
          })(<Input placeholder="请输入名称" onChange={(e: ChangeEvent<HTMLInputElement>):void => handleChange(e, 'title')} />)}
        </Form.Item>
        <Form.Item label="广告描述" hasFeedback={true}>
          {getFieldDecorator('caption', {
            initialValue: caption,
            rules: [
              {
                required: true,
                message: '请输入描述!'
              },
            ],
          })(<Input.TextArea placeholder="请输入描述" onChange={(e: ChangeEvent<HTMLTextAreaElement>):void => handleChange(e, 'caption')} />)}
        </Form.Item>
        <Form.Item label="广告类型" hasFeedback={true}>
          {getFieldDecorator('type', {
            initialValue: type,
            rules: [
              {
                required: true,
                message: '请选择类型!',
              },
            ],
          })(<Select
            placeholder="请选择类型"
            onChange={handleSelectChange}
          >
            <Select.Option value={1}>书架</Select.Option>
            <Select.Option value={2}>排行榜</Select.Option>
            <Select.Option value={3}>搜索</Select.Option>
            <Select.Option value={4}>详情</Select.Option>
            <Select.Option value={5}>主内容</Select.Option>
          </Select>)}
        </Form.Item>
        <Form.Item label="广告链接" hasFeedback={true}>
          {getFieldDecorator('url', {
            initialValue: url,
            rules: [
              {
                required: true,
                message: '请输入广告链接',
              },
            ],
          })(<Input placeholder="请输入广告链接" onChange={(e: ChangeEvent<HTMLInputElement>):void => handleChange(e, 'url')} />)}
        </Form.Item>
        <Form.Item label="广告图片">
          {getFieldDecorator('imgUrl', {
            initialValue: imgUrl
          })(
            <div className="clearfix">
              <Upload name="logo" action={`${getRootUrl()}/upload`} listType="picture-card" onChange={uploadHandleChange}
                fileList={fileList}
                onPreview={handlePreview}
              >
                { imgUrl ? null : uploadButton }
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
            ,
          )}
        </Form.Item>
        <Form.Item {...ButtonItemLayout}>
          <Col xs={24} sm={8}>
            <Button block={true}>重置信息</Button>
          </Col>
          <Col xs={24} sm={8} offset={2}>
            <Button loading={loading} block={true} htmlType="submit" type="primary">提交信息</Button>
          </Col>
        </Form.Item>
      </Form>
    </Card>
  )
}
const WrapperAdverCreateForm = Form.create({name: 'adverCreate'})(AdverCreate)
export default WrapperAdverCreateForm
