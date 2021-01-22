import React, { useState } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import CTreeSelect from 'components/CTreeSelect';
import CSelect from 'components/CSelect';

function Filter(props) {
  const [page, setPage] = useState({
    pageindex: 1,
    pagesize: 10,
  });
  const { dispatch, check } = props;
  const { categoryList, pageIndex, pageSize } = check;
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
  const TreeProps = {
    id: 'productCategoryCode',
    name: 'productCategoryName',
    placeholder: '选择菜单',
    treeData: categoryList,
    allowClear: true,
  };
  const handleSearch_Click = () => {
    form.validateFields().then((values) => {
      const { pageindex, pagesize } = page;
      values.pageIndex = pageIndex;
      values.pageSize = pageSize;
      if (values.productName) {
        values.productName = values.productName;
        values.pageIndex = pageindex;
        values.pageSize = pagesize;
      } else {
        values.productName = '';
      }
      if (values.categoryCode) {
        values.categoryCode = values.categoryCode;
        values.pageIndex = pageindex;
        values.pageSize = pagesize;
      } else {
        values.categoryCode = '';
      }
      if (values.auditState != undefined) {
        values.auditState = values.auditState;
        values.pageIndex = pageindex;
        values.pageSize = pagesize;
      } else {
        values.auditState = '';
      }
      dispatch({
        type: 'check/search',
        payload: {
          ...values,
        },
      });
    });
  };
  const OptionsList = [
    { id: 0, name: '未审核' },
    { id: 1, name: '已审核' },
  ];
  const selectProps = {
    style: { width: '100%' },
    data: OptionsList,
    placeholder: '选择状态',
    allowClear: true,
    id: 'id',
    name: 'name',
  };
  return (
    <Form form={form} {...formProps}>
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
          <Form.Item name="categoryCode" label="商品分类" {...formItemLayout}>
            <CTreeSelect {...TreeProps} />
          </Form.Item>
        </Col>
        <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
          <Form.Item name="productName" label="商品名称" {...formItemLayout}>
            <Input allowClear placeholder="根据商品名称搜索" />
          </Form.Item>
        </Col>
        <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
          <Form.Item name="auditState" label="状态" {...formItemLayout}>
            <CSelect {...selectProps} />
          </Form.Item>
        </Col>
        <Col {...ColProps} xl={{ span: 9 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <Row type="flex" align="middle" justify="end">
            <Form.Item>
              <Button type="primary" onClick={handleSearch_Click}>
                查询
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}

export default Filter;
