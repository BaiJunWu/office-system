import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Form, Input, DatePicker } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import CSelect from 'components/CSelect';
import { FormatDate, BuildDate } from 'utils/common';

function Filter(props) {
  const { dispatch, delivery } = props;
  const {
    beginDate,
    endDate,
    customerName,
    vendorId,
    orderState,
    invoiceState,
    customerPhone,
    pageIndex,
    pageSize,
    vendorList,
  } = delivery;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      orderDate: [dayjs(lastMonthToday()), dayjs(FormatDate(BuildDate()))],
    });
    form.validateFields().then((values) => {
      let beginDate = dayjs(values.orderDate[0]).format('YYYY-MM-DD');
      let endDate = dayjs(values.orderDate[1]).format('YYYY-MM-DD');
      dispatch({
        type: 'delivery/query',
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
  const vendorSelectProps = {
    style: { width: '100%' },
    data: vendorList,
    placeholder: '商户',
    id: 'vendorId',
    name: 'vendorName',
  };
  const getFields = () => {
    const children = [];
    children.push(
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} key="orderDate">
        <Form.Item name="orderDate" label="订单日期" {...formItemLayout}>
          <RangePicker />
        </Form.Item>
      </Col>,
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} key="customerName">
        <Form.Item name="customerName" label="客户名称" {...formItemLayout}>
          <Input allowClear placeholder="客户名称" />
        </Form.Item>
      </Col>,
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} key="customerPhone">
        <Form.Item name="customerPhone" label="客户手机" {...formItemLayout}>
          <Input allowClear placeholder="客户手机" />
        </Form.Item>
      </Col>,
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} key="vendorId">
        <Form.Item name="vendorId" label="商户" {...formItemLayout}>
          <CSelect {...vendorSelectProps} />
        </Form.Item>
      </Col>,
    );
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
    return year + '-' + (month - 1) + '-' + day;
  };
  const handleSearch_Click = (type = '') => {
    form.validateFields().then((values) => {
      const { customerName, customerPhone, orderDate, vendorId } = values;
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
      if (!vendorId) {
        values.vendorId = '';
      }
      values.orderState = '';
      values.invoiceState = '';
      if (type == '') {
        dispatch({
          type: 'delivery/query',
          payload: {
            beginDate,
            endDate,
            ...values,
            pageIndex,
            pageSize,
          },
        });
      } else {
      }
    });
  };
  return (
    <Form form={form} {...formProps}>
      <Row gutter={24}>
        {getFields()}
        <Col span={16} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => handleSearch_Click('')}>
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
          <Button
            type="ghost"
            onClick={() => handleSearch_Click('blob')}
            style={{ marginRight: '10px' }}
          >
            下载
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Filter;
