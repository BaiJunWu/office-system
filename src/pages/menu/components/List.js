import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { Modal } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const { menuList, dispatch, loading } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onEditItem = (record) => {
    dispatch({
      type: `menu/handleModalVisible`,
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
          type: 'menu/remove',
          payload: { id: record.menuId },
        });
      },
    });
  };
  const tableProps = {
    size: 'model',
    loading: loading.effects['menu/query'],
    menuOptions: [
      { key: '1', name: '修改', func: onEditItem },
      { key: '2', name: '删除', func: onDeleteItem },
    ],
    columns: [
      {
        dataIndex: 'menuName',
        title: '名称',
        align: 'center',
      },
      {
        dataIndex: 'menuUrl',
        title: '链接',
        align: 'center',
      },
      {
        dataIndex: 'iconCls',
        title: '图标',
        align: 'center',
      },
      {
        dataIndex: 'menuOrder',
        title: '显示顺序',
        align: 'center',
      },
      {
        dataIndex: 'showMenu',
        title: '显示与否',
        align: 'center',
        render: (text) => (text === 1 ? '显示' : '不显示'),
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
    dataSource: menuList,
    rowKey: (record) => record.menuId,
    rowSelection: {
      columnWidth: 80,
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    },
    pagination: pagination(menuList, (pageIndex, pageSize) => {}),
  };
  return <CTable {...tableProps} />;
}

export default List;
