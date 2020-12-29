import React, { Fragment } from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs

const ComTabs = props => {
  const tabPaneList = (data) => {
    return data.map(item => {
      return <TabPane tab={item.tab} key={item.key}></TabPane>
    })
  }

  return (
    <Fragment>
      <Tabs defaultActiveKey="1">
        {
          tabPaneList(props.tabList)
        }
      </Tabs>
    </Fragment>
  )
}

export default ComTabs
