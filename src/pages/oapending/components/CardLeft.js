import React, { Fragment } from 'react'
import { Row, Col } from 'antd'
import ComInput from 'components/ComInput'
import ComTree from 'components/ComTree'

const CardLeft = props => {
  const treeProps = () => {
    const treeList = [
      {
        id: 1,
        name: '一级组件'
      },
      {
        id: 2,
        name: '二级组件',
        father: 1
      }
    ]
    return {
      treeList
    }
  }
  return (
    <div>
      <Fragment>
        <Row style={{ lineHeight: '40px', textAlign: 'center' }}>
          <Col span={8}>
            <span
              style={{
                marginRight: '3px', fontWeight: '900', fontSize: '12px'
              }}
            >全部类型</span>
          </Col>
          <Col span={16}>
            <ComInput />
          </Col>
        </Row>
        <ComTree {...treeProps()} />
      </Fragment>
    </div>
  )
}
export default CardLeft

