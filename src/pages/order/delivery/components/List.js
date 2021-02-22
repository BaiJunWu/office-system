import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { Modal } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { delivery, dispatch, loading } = props;
  const { orderList, ...search } = delivery;
  const onEditItem = (record) => {
    dispatch({
      type: 'delivery/handleModalVisible',
      payload: {
        modalVisible: true,
        record,
      },
    });
  };
  const tableProps = {
    size: 'model',
    menuOptions: [{ key: '1', name: '发货', func: onEditItem }],
    loading: loading.effects['delivery/query'],
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
        dataIndex: 'operation',
        type: 'Operation',
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: 210,
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
        type: 'delivery/query',
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
