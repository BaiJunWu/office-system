import React, { useState } from 'react';
import { pagination } from 'utils/common';
import CTable from 'components/CTable';

function List(props) {
  const { menuTree } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onEditItem = (record) => {
    console.log(record);
    console.log('成功！！');
  };
  const onDeleteItem = (record) => {
    console.log(record);
    console.log('成功！！');
  };
  const tableProps = {
    size: 'model',
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
      },
    ],
    dataSource: menuTree,
    rowKey: (record) => record.menuId,
    rowSelection: {
      columnWidth: 80,
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    },
    pagination: pagination(menuTree, (pageIndex, pageSize) => {}),
  };
  return <CTable {...tableProps} />;
}

export default List;
