import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { Modal } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { controller, dispatch, loading } = props;
  const { orderList, ...search } = controller;
  const onEditItem = (record) => {};
  const onDeleteItem = (record) => {
    const { vendorName, state, pageIndex, pageSize } = merchant;
    Modal.confirm({
      title: '您确定要删除这条记录吗？',
      onOk: () => {},
    });
  };
  const tableProps = {
    size: 'model',
    loading: loading.effects['controller/query'],
    menuOptions: [
      { key: '1', name: '查看详情', func: onEditItem },
      { key: '2', name: '取消订单', func: onDeleteItem },
    ],
    columns: [
      {
        dataIndex: 'orderNumber',
        title: '订单编号',
        align: 'center',
      },
      {
        dataIndex: 'orderDateTime',
        title: '订单日期',
        align: 'center',
        render: (text, item) => item.orderDate + ' ' + item.orderTime,
      },
      {
        dataIndex: 'vendor',
        title: '商户',
        align: 'center',
        render: (text) => text && text.vendorName,
      },
      {
        dataIndex: 'customer',
        title: '客户',
        align: 'center',
        render: (text, item) => item.customerName + ' ' + item.customerPhone,
      },
      {
        dataIndex: 'address',
        title: '收货信息',
        align: 'center',
        render: (text, item) =>
          item.province + item.city + item.area + item.address,
      },
      {
        dataIndex: 'orderDateTime',
        title: '发票信息',
        align: 'center',
        render: (text, item) =>
          item.invoiceType == 0 ? '不开票' : item.invoiceTitle,
      },
      {
        dataIndex: 'orderState',
        title: '订单状态',
        align: 'center',
        render: (text, item) => {
          let state = '';
          switch (item.orderState) {
            case 1:
              state = '待付款';
              break;
            case 2:
              state = '待发货';
              break;
            case 3:
              state = '待收货';
              break;
            case 4:
              state = '已完成';
              break;
          }
          return state;
        },
      },
      {
        dataIndex: 'expressCompany',
        title: '快递公司',
        align: 'center',
      },
      {
        dataIndex: 'expressNumber',
        title: '快递单号',
        align: 'center',
      },
      {
        dataIndex: 'expressFee',
        title: '快递费用',
        align: 'center',
      },
      {
        dataIndex: 'operation',
        type: 'Operation',
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: 200,
      },
    ],
    dataSource: orderList.list,
    rowKey: (record) => record.orderId,
    rowSelection: {
      columnWidth: 80,
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    },
    pagination: pagination(orderList, (pageIndex, pageSize) => {
      dispatch({
        type: 'controller/query',
        payload: {
          ...search,
          pageIndex,
          pageSize,
        },
      });
    }),
  };
  return <CTable {...tableProps} />;
}

export default List;
