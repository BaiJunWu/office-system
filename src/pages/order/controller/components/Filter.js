import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Form, Input, DatePicker } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import CSelect from 'components/CSelect';
import { FormatDate, BuildDate } from 'utils/common';

function Filter(props) {
  const [expand, setExpand] = useState(true);
  const { dispatch, controller } = props;
  const {
    vendorList,
    beginDate,
    endDate,
    customerName,
    vendorId,
    orderState,
    invoiceState,
    customerPhone,
    pageIndex,
    pageSize,
  } = controller;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      orderDate: [dayjs(lastMonthToday()), dayjs(FormatDate(BuildDate()))],
    });
    form.validateFields().then((values) => {
      let beginDate = dayjs(values.orderDate[0]).format('YYYY-MM-DD');
      let endDate = dayjs(values.orderDate[1]).format('YYYY-MM-DD');
      dispatch({
        type: 'controller/query',
        payload: {
          beginDate,
          endDate,
          customerName,
          vendorId,
          orderState,
          invoiceState,
          customerPhone,
          pageIndex,
          pageSize,
        },
      });
    });
  }, []);
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
  };
  const OptionsList = [
    { id: 0, name: '全部订单' },
    { id: 1, name: '待支付' },
    { id: 2, name: '待发货' },
    { id: 3, name: '待收货' },
    { id: 4, name: '已完成' },
  ];
  const vendorSelectProps = {
    style: { width: '100%' },
    data: vendorList,
    placeholder: '订单状态',
    id: 'vendorId',
    name: 'vendorName',
  };
  const selectProps = {
    style: { width: '100%' },
    data: OptionsList,
    placeholder: '订单状态',
    id: 'id',
    name: 'name',
  };
  const getFields = () => {
    const children = [];
    if (expand) {
      children.push(
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} key="orderDate">
          <Form.Item name="orderDate" label="订单日期" {...formItemLayout}>
            <RangePicker />
          </Form.Item>
        </Col>,
        <Col
          {...ColProps}
          xl={{ span: 8 }}
          md={{ span: 12 }}
          key="customerName"
        >
          <Form.Item name="customerName" label="客户名称" {...formItemLayout}>
            <Input allowClear placeholder="客户名称" />
          </Form.Item>
        </Col>,
        <Col
          {...ColProps}
          xl={{ span: 8 }}
          md={{ span: 12 }}
          key="customerPhone"
        >
          <Form.Item name="customerPhone" label="客户手机" {...formItemLayout}>
            <Input allowClear placeholder="客户手机" />
          </Form.Item>
        </Col>,
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} key="vendorId">
          <Form.Item name="vendorId" label="商户" {...formItemLayout}>
            <CSelect {...vendorSelectProps} />
          </Form.Item>
        </Col>,
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} key="orderState">
          <Form.Item name="orderState" label="全部订单" {...formItemLayout}>
            <CSelect {...selectProps} />
          </Form.Item>
        </Col>,
      );
    } else {
      children.push(
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} key="orderDate">
          <Form.Item name="orderDate" label="订单日期" {...formItemLayout}>
            <RangePicker />
          </Form.Item>
        </Col>,
        <Col
          {...ColProps}
          xl={{ span: 8 }}
          md={{ span: 12 }}
          key="customerName"
        >
          <Form.Item name="customerName" label="客户名称" {...formItemLayout}>
            <Input allowClear placeholder="客户名称" />
          </Form.Item>
        </Col>,
      );
    }
    return children;
  };
  const lastMonthToday = () => {
    let year = FormatDate(BuildDate(), 'YYYY');
    let month = FormatDate(BuildDate(), 'MM');
    let day = FormatDate(BuildDate(), 'DD');
    if (parseInt(month) == 1) {
      //如果是1月份，则取上一年的12月份
      return parseInt(year) - 1 + '-12-' + day;
    }
    var preSize = new Date(year, parseInt(month) - 1, 0).getDate(); //上月总天数
    if (preSize < parseInt(day)) {
      //上月总天数<本月日期，比如3月的30日，在2月中没有30
      return year + '-' + month + '-01';
    }
  };
  const handleSearch_Click = () => {
    form.validateFields().then((values) => {
      const {
        orderDate,
        customerName,
        customerPhone,
        orderState,
        vendorId,
      } = values;
      if (orderDate) {
        values.beginDate = dayjs(orderDate[0]).format('YYYY-MM-DD');
        values.endDate = dayjs(orderDate[1]).format('YYYY-MM-DD');
      } else {
        values.beginDate = '';
        values.endDate = '';
      }
      if (!customerName) {
        values.customerName = '';
      }
      if (!customerPhone) {
        values.customerPhone = '';
      }
      if (orderState == 0) {
        values.orderState = orderState;
      } else if (!orderState) {
        values.orderState = '';
      } else {
        values.orderState = orderState;
      }
      if (!vendorId) {
        values.vendorId = '';
      }
      values.invoiceState = '';
      dispatch({
        type: 'controller/query',
        payload: {
          beginDate,
          endDate,
          ...values,
          pageIndex,
          pageSize,
        },
      });
    });
  };
  const handleAdd_Click = () => {};
  return (
    <Form form={form} {...formProps}>
      <Row gutter={24}>
        {getFields()}
        <Col span={8} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={handleSearch_Click}>
            查询
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
          <Button type="ghost" style={{ marginRight: '10px' }}>
            下载
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />}{' '}
            {expand ? '收起' : '展开'}
          </a>
        </Col>
      </Row>
    </Form>
  );
}

export default Filter;
