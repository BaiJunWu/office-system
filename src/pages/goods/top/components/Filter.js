import React, { useState } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import CTreeSelect from 'components/CTreeSelect';

function Filter(props) {
  const { dispatch, top } = props;
  const {} = top;
  const [form] = Form.useForm();
  const formProps = {
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    },
  };

  const ColProps = {
    xs: 24,
    sm: 12,
    style: {
      marginBottom: 16,
    },
  };
  const handleDelete_Click = () => {};
  const handleAdd_Click = () => {};
  return (
    <Form form={form} {...formProps}>
      <Row gutter={24}>
        <Col
          {...ColProps}
          xl={{ span: 24 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="end">
            <Form.Item>
              <Button
                type="primary"
                style={{ marginRight: '10px' }}
                onClick={handleAdd_Click}
              >
                畅销
              </Button>
              <Button type="ghost" onClick={handleDelete_Click}>
                删除
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}

export default Filter;
