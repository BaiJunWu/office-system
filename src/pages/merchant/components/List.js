import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { Modal } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const { merchant, dispatch, loading } = props;
  const { vendorList } = merchant;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onEditItem = (record) => {
    dispatch({
      type: `merchant/handleModalVisible`,
      payload: {
        modalVisible: true,
        record,
      },
    });
  };
  const onDeleteItem = (record) => {
    const { vendorName, state, pageIndex, pageSize } = merchant;
    Modal.confirm({
      title: '您确定要删除这条记录吗？',
      onOk: () => {
        dispatch({
          type: 'merchant/remove',
          payload: {
            id: record.vendorId,
            vendorName,
            state,
            pageIndex,
            pageSize,
          },
        });
      },
    });
  };
  const tableProps = {
    size: 'model',
    loading: loading.effects['merchant/query'],
    menuOptions: [
      { key: '1', name: '修改', func: onEditItem },
      { key: '2', name: '删除', func: onDeleteItem },
    ],
    columns: [
      {
        dataIndex: 'vendorName',
        title: '商户名称',
        align: 'center',
      },
      {
        dataIndex: 'state',
        title: '是否启用',
        align: 'center',
        render: (text) => (text === 1 ? '启用' : '停用'),
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
    dataSource: vendorList.list,
    rowKey: (record) => record.vendorId,
    rowSelection: {
      columnWidth: 80,
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    },
    pagination: pagination(vendorList, (pageIndex, pageSize) => {}),
  };
  return <CTable {...tableProps} />;
}

export default List;
