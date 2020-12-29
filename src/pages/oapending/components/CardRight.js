import React, { Fragment, useState } from 'react'
import CardHeader from './CardHeader'
import ComTable from 'components/ComTable'

const CardRight = props => {
  let [selectedRowKeys, setSelectedRowKeys] = useState([])
  const tableProps = () => {
    const columns = [
      {
        title: '审批人编码',
        dataIndex: 'assigneeCode',
        width: 105
      },
      {
        title: '审批人名称',
        dataIndex: 'assigneeName',
        width: 105
      },
      {
        title: '流程定义名称',
        dataIndex: 'processDefinitionName',
        width: 120
      },
      {
        title: '流程实例开始时间',
        dataIndex: 'processInstanceStartTime',
        width: 165
      },
      {
        title: '流程实例结束时间',
        dataIndex: 'processInstanceEndTime',
        width: 165
      },
      {
        title: '流程实例发起人名称',
        dataIndex: 'processInstanceStarterName',
        width: 160
      },
      {
        title: '任务名称',
        dataIndex: 'taskName',
        width: 100
      },
      {
        title: '开始时间',
        dataIndex: 'taskStartTime',
        width: 165
      },
      {
        title: '结束时间',
        dataIndex: 'taskEndTime',
        width: 165
      }
    ]
    return {
      columns,
      dataSource: props.list,
      rowKey: record => record.assigneeId,
      scroll: {
        x: 1145
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          setSelectedRowKeys(keys)
        },
      },
    }
  }
  return (
    <Fragment>
      <CardHeader />
      <ComTable {...tableProps()} />
    </Fragment>

  )
}

export default CardRight
