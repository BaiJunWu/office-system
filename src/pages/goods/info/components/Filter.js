import React, { useState } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import CTreeSelect from 'components/CTreeSelect';

function Filter(props) {
  const [page, setPage] = useState({
    pageindex: 1,
    pagesize: 10,
  });
  const { dispatch, goodinfo } = props;
  const { categoryList, pageIndex, pageSize } = goodinfo;
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
      values.pageIndex = pageindex;
      values.pageSize = pagesize;
      if (!values.productName && !values.categoryCode) {
        values.categoryCode = '';
        values.productName = '';
        values.pageIndex = pageIndex;
        values.pageSize = pageSize;
      }
      if (!values.productName) {
        values.productName = '';
      }
      if (!values.categoryCode) {
        values.categoryCode = '';
      }
      dispatch({
        type: 'goodinfo/search',
        payload: {
          ...values,
        },
      });
    });
  };
  const handleAdd_Click = () => {
    dispatch({
      type: `goodinfo/handleModalVisible`,
      payload: {
        modalVisible: true,
      },
    });
  };
  return (
    <Form form={form} {...formProps}>
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }}>
          <Form.Item name="categoryCode" label="商品分类" {...formItemLayout}>
            <CTreeSelect {...TreeProps} />
          </Form.Item>
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }}>
          <Form.Item name="productName" label="商品名称" {...formItemLayout}>
            <Input allowClear placeholder="根据商品名称搜索" />
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
