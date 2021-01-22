import React from 'react';
import { Button, Row, Col, Form, Input } from 'antd';

function Filter(props) {
  const { dispatch, authorize } = props;
  const { pageIndex, pageSize } = authorize;
  const [form] = Form.useForm();
  const formProps = {
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    },
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const ColProps = {
    xs: 24,
    sm: 12,
    style: {
      marginBottom: 16,
    },
  };
  const handleSearch_Click = () => {
    form.validateFields().then((values) => {
      dispatch({
        type: 'authorize/search',
        payload: {
          ...values,
          pageIndex,
          pageSize,
        },
      });
    });
  };
  const handleAdd_Click = () => {
    dispatch({
      type: `authorize/handleModalVisible`,
      payload: {
        modalVisible: true,
      },
    });
  };
  return (
    <Form form={form} {...formProps}>
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }}>
          <Form.Item name="authorizeName" label="应用名称" {...formItemLayout}>
            <Input allowClear placeholder="根据应用名称搜索" />
          </Form.Item>
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }}></Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <Row type="flex" align="middle" justify="end">
            <Form.Item>
              <Button type="primary" onClick={handleSearch_Click}>
                查询
              </Button>
              <Button type="ghost" onClick={handleAdd_Click}>
                创建
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}

export default Filter;
