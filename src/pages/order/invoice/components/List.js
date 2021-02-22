import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { Modal } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { invoice, dispatch, loading } = props;
  const { orderList, ...search } = invoice;
  const onEditItem = (record) => {
    dispatch({
      type: `invoice/handleModalVisible`,
      payload: {
        modalVisible: true,
        record,
      },
    });
  };
  const onDeleteItem = (record) => {
    Modal.confirm({
      title: '您确定要删除这条记录吗？',
      onOk: () => {},
    });
  };
  const tableProps = {
    size: 'model',
    loading: loading.effects['invoice/query'],
    menuOptions: [{ key: '1', name: '查看详情', func: onEditItem }],
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
        width: 100,
      },
      {
        dataIndex: 'invoiceState',
        title: '发票状态',
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
        width: 200,
      },
    ],
    scroll: { x: 1350 },
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
        type: 'invoice/query',
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
