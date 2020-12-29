import React, { Fragment } from 'react'
import { Button, Row, Col } from 'antd'
import ComInput from 'components/ComInput'
const CardHeader = props => {
  return (
    <Fragment>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={8} >
          <ComInput />
        </Col>
        <Col span={2} offset={14}>
          <Button>提交</Button>
        </Col>
      </Row>
    </Fragment>
  )
}

export default CardHeader
