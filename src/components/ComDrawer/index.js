import React, { Fragment } from 'react'
import { Drawer } from 'antd'

const ComDrawer = props => {
  return (
    <Fragment>
      <Drawer
        placement="top"
        getContainer={false}
        style={{ position: 'absolute' }}
      ></Drawer>
    </Fragment>
  )
}

export default ComDrawer
