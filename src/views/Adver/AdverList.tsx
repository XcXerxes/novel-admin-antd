import * as React from 'react'
import { Card, Table } from 'antd'

function createColumns(title: string, dataIndex: string, key: string, align: any, ...other:any) {
  return {title, dataIndex, key, align, ...other}
}

const columns = [
  createColumns('名称', 'title', 'title', 'center'),
  createColumns('描述', 'caption', 'caption', 'center'),
  createColumns('类型', 'type', 'type', 'center'),
  createColumns('点击人数', 'visits', 'visits', 'center'),
  createColumns('创建时间', 'createdTime', 'createdTime', 'center'),
  createColumns('更新时间', 'updatedTime', 'updatedTime', 'center'),
  {
    title: '操作',
    key: 'action',
    render: (text: string, record: any) => (
      <span>
        <a href="javascript:;">编辑</a>
        <a href="javascript:;" style={{marginLeft: '10px'}}>删除</a>
      </span>
    )
  }
]

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

const dataSource = Array.from({ length: 10 }).map((item => {
  return {
    title: '机械战甲',
    caption: '一套完美的战甲',
    type: '书架',
    visits: 100,
    createdTime: '2019-8-24',
    updatedTime: '2019-7-30'
  }
}))

const AdverList:React.FC = () => {
  return (
    <Card>
      <Table
        size="small"
        dataSource={dataSource}
        columns={columns}
      />
    </Card>
  )
}
export default AdverList
