import React from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import CSelect from 'components/CSelect';

function Filter(props) {
  const { dispatch, merchant } = props;
  const { pageIndex, pageSize } = merchant;
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
  const OptionsList = [
    { id: 0, name: '停用' },
    { id: 1, name: '启用' },
  ];
  const selectProps = {
    style: { width: '100%' },
    data: OptionsList,
    placeholder: '选择状态',
    allowClear: true,
    id: 'id',
    name: 'name',
  };
  const handleSearch_Click = () => {
    form.validateFields().then((values) => {
      const { vendorName, state } = values;
      if (vendorName) {
        values.vendorName = vendorName;
      } else {
        values.vendorName = '';
      }
      if (state || state == 0) {
        values.state = state;
      } else {
        values.state = '';
      }
      dispatch({
        type: 'merchant/query',
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
      type: `merchant/handleModalVisible`,
      payload: {
        modalVisible: true,
      },
    });
  };
  return (
    <Form form={form} {...formProps}>
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }}>
          <Form.Item name="vendorName" label="商户名称" {...formItemLayout}>
            <Input allowClear placeholder="根据商户名称搜索" />
          </Form.Item>
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }}>
          <Form.Item name="state" label="状态" {...formItemLayout}>
            <CSelect {...selectProps} />
          </Form.Item>
        </Col>
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
