import React, { Fragment } from 'react'
import { Table } from 'antd'

const ComTable = (props) => {
  const { columns = [], ...tableProps } = props
  const resolveTableColumns = obj => {
    const newObj = { ...obj }
    const title = newObj.title
    const { dataIndex, type } = newObj;
    return { title, ...newObj, dataIndex, key: dataIndex }
  }
  const tempArr = columns.map(item => resolveTableColumns(item));
  return (
    <Fragment>
      <Table bordered columns={tempArr} {...tableProps} />
    </Fragment>
  )
}

export default ComTable
