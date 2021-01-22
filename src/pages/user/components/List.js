import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { Modal } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { dispatch, user, loading } = props;
  const { userList } = user;
  const onEditItem = (record) => {
    dispatch({
      type: `user/handleModalVisible`,
      payload: {
        modalVisible: true,
        record,
      },
    });
  };
  const onDeleteItem = (record) => {
    Modal.confirm({
      title: '您确定要删除这条记录吗？',
      onOk: () => {
        dispatch({
          type: 'user/remove',
          payload: { userId: record.userId },
        });
      },
    });
  };
  const onResetItem = (record) => {
    Modal.confirm({
      title: '您确定要重置密码吗？',
      onOk: () => {
        dispatch({
          type: 'user/resetUserPassword',
          payload: { userId: record.userId },
        });
      },
    });
  };
  const tableProps = {
    size: 'model',
    loading: loading.effects['user/query'],
    menuOptions: [
      { key: '1', name: '修改', func: onEditItem },
      { key: '2', name: '删除', func: onDeleteItem },
      { key: '3', name: '重置密码', func: onResetItem },
    ],
    columns: [
      {
        dataIndex: 'userName',
        title: '用户姓名',
        align: 'center',
      },
      {
        dataIndex: 'userPhone',
        title: '用户手机',
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
    dataSource: userList,
    rowKey: (record) => record.userId,
    rowSelection: {
      columnWidth: 80,
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    },
    pagination: pagination(userList, (pageIndex, pageSize) => {}),
  };
  return <CTable {...tableProps} />;
}

export default List;
