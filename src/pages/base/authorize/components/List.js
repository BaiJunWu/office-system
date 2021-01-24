import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { Modal } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const { dispatch, loading, authorize } = props;
  const { appidList, authorizeName } = authorize;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onEditItem = (record) => {
    dispatch({
      type: `authorize/handleModalVisible`,
      payload: {
        modalVisible: true,
        record,
      },
    });
  };
  const onDeleteItem = (record) => {
    const { authorizeName, pageIndex, pageSize } = authorize;
    Modal.confirm({
      title: '您确定要删除这条记录吗？',
      onOk: () => {
        dispatch({
          type: 'authorize/remove',
          payload: {
            id: record.authorizeId,
            authorizeName,
            pageIndex,
            pageSize,
          },
        });
      },
    });
  };
  const tableProps = {
    size: 'authorize',
    loading: loading.effects['authorize/search'],
    menuOptions: [
      { key: '1', name: '修改', func: onEditItem },
      { key: '2', name: '删除', func: onDeleteItem },
    ],
    columns: [
      {
        dataIndex: 'appId',
        title: 'appId',
        align: 'center',
      },
      {
        dataIndex: 'authorizeName',
        title: '应用名称',
        align: 'center',
      },
      {
        dataIndex: 'erpUrl',
        title: 'ERP接口地址',
        align: 'center',
      },
      {
        dataIndex: 'secret',
        title: '秘钥',
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
    dataSource: appidList.list,
    rowKey: (record) => record.authorizeId,
    rowSelection: {
      columnWidth: 80,
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    },
    pagination: pagination(appidList, (pageIndex, pageSize) => {
      dispatch({
        type: 'authorize/search',
        payload: {
          authorizeName,
          pageIndex,
          pageSize,
        },
      });
    }),
  };
  return <CTable {...tableProps} />;
}

export default List;