import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { Modal, message } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { controller, dispatch, loading } = props;
  const { orderList, ...search } = controller;
  const onEditItem = (record) => {
    dispatch({
      type: `controller/handleModalVisible`,
      payload: {
        modalVisible: true,
        record,
      },
    });
  };
  const onDeleteItem = (record) => {
    Modal.confirm({
      title: '您确定要取消这条订单吗？',
      onOk: () => {
        if ([4].includes(record.orderState)) {
          message.error('无法取消订单！');
          return;
        } else {
          dispatch({
            type: `controller/cancelOrder`,
            payload: {
              orderId: record.orderId,
              appId: record.appId,
              appIdMp: record.appIdMp,
              search,
            },
          });
        }
      },
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
        width: 200,
      },
      {
        dataIndex: 'orderDateTime',
        title: '订单日期',
        align: 'center',
        render: (text, item) => item.orderDate + ' ' + item.orderTime,
        width: 200,
      },
      {
        dataIndex: 'vendor',
        title: '商户',
        align: 'center',
        render: (text) => text && text.vendorName,
        width: 100,
      },
      {
        dataIndex: 'customer',
        title: '客户',
        align: 'center',
        render: (text, item) => item.customerName + ' ' + item.customerPhone,
        width: 150,
      },
      {
        dataIndex: 'address',
        title: '收货信息',
        align: 'center',
        render: (text, item) =>
          item.province + item.city + item.area + item.address,
        width: 200,
      },
      {
        dataIndex: 'orderDateTime',
        title: '发票信息',
        align: 'center',
        render: (text, item) =>
          item.invoiceType == 0 ? '不开票' : item.invoiceTitle,
        width: 100,
      },
      {
        width: 100,
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
        width: 100,
      },
      {
        dataIndex: 'expressNumber',
        title: '快递单号',
        align: 'center',
        width: 100,
      },
      {
        dataIndex: 'expressFee',
        title: '快递费用',
        align: 'center',
        width: 100,
      },
      {
        dataIndex: 'operation',
        type: 'Operation',
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: 210,
      },
    ],
    scroll: { x: 1500 },
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
