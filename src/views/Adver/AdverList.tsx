import React, { useState, useEffect } from 'react'
import { Card, Table, Modal, message, Spin } from 'antd'
import { getAdvers, deleteAdverById } from '../../api/Adver'
import dayjs from 'dayjs'

function createColumns(title: string, dataIndex: string, key: string, align?: any, render?: any) {
  return {title, dataIndex, key, align, render}
}


// const columns = [
//   {
//     title: '名称',
//     dataIndex: 'title',
//     key: 'title',
//     className: 'alignCenter'
//   },
//   {
//     title: '描述',
//     dataIndex: 'caption',
//     key: 'caption',
//     fixed: 'center'
//   },
//   {
//     title: '类型',
//     dataIndex: 'type',
//     key: 'type',
//     textAlign: 'center'
//   },
//   {
//     title: '点击人数',
//     dataIndex: 'visits',
//     key: 'visits',
//     textAlign: 'center'
//   },
//   {
//     title: '创建时间',
//     dataIndex: 'createdTime',
//     key: 'createdTime',
//     textAlign: 'center'
//   },
//   {
//     title: '更新时间',
//     dataIndex: 'updatedTime',
//     key: 'updatedTime',
//     textAlign: 'center'
//   }
// ]

// const dataSource = Array.from({ length: 10 }).map((item => {
//   return {
//     title: '机械战甲',
//     caption: '一套完美的战甲',
//     type: '书架',
//     visits: 100,
//     createdTime: '2019-8-24',
//     updatedTime: '2019-7-30'
//   }
// }))
export interface IAdverListProps {
  history: any;
}
const AdverList:React.FC<IAdverListProps> = (props) => {
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [page, setPage] = useState(1)
  async function getList () {
    try {
      setLoading(true)
      const result = await getAdvers({ page, rows: 10 })
      setLoading(false)
      if (result && result.code === 0) {
        setList(result.data.rows)
        setCount(result.data.count)
      }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }
  /**
   * 编辑
   * @param event 
   */
  function editItem (event: any, record: any) {
    event.preventDefault()
    props.history.push(`/adver/adver-create?id=${record.id}`)
  }
  /**
   * 删除单个
   * @param event 
   * @param record 
   */
  function deleteItem (event: any, record: any) {
    event.preventDefault()
    Modal.confirm({
      title: '提示',
      content: '确认删除当前行?',
      onOk() {
        deleteAdverItem(record.id)
      }
    })
  }
  // 删除数据
  async function deleteAdverItem (id: string) {
    try {
      setDeleteLoading(true)
      const result = await deleteAdverById({ id })
      setDeleteLoading(false)
      if (result && result.code === 0) {
        message.success(result.message || '删除成功')
        getList()
      } else {
        message.error(result.message || '删除失败')
      }
    } catch (error) {
      setDeleteLoading(false)
      throw error
    }
  }
  function onChange (currentPage: number) {
    setPage(currentPage)
  }
  useEffect(() => {
    getList()
  }, ['page'])
  const columns = [
    createColumns('名称', 'title', 'title', 'center'),
    createColumns('描述', 'caption', 'caption', 'center'),
    createColumns('类型', 'type', 'type', 'center'),
    createColumns('点击人数', 'visits', 'visits', 'center'),
    createColumns('创建时间', 'createdAt', 'createdAt', 'center', (text: string, record: any) => (
      <span>{dayjs(record.createdAt).format('YYYY-MM-DD HH:mm')}</span>
    )),
    createColumns('更新时间', 'updatedAt', 'updatedAt', 'center', (text: string, record: any) => (
      <span>{dayjs(record.updatedAt).format('YYYY-MM-DD HH:mm')}</span>
    )),
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <span>
          <a href='#' onClick={(e) => editItem(e, record)}>编辑</a>
          <a href='#' onClick={e => deleteItem(e, record)} style={{marginLeft: '10px'}}>删除</a>
        </span>
      )
    }
  ]
  return (
    <Spin spinning={deleteLoading}>
      <Card>
        <Table
          rowKey="id"
          loading={loading}
          size="small"
          dataSource={list}
          columns={columns}
          pagination={{
            total: count,
            showQuickJumper: true,
            defaultCurrent: page,
            onChange
          }}
        />
      </Card>
    </Spin>
  )
}
export default AdverList
