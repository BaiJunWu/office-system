import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { Modal } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { dispatch, category, loading } = props;
  const { categoryList } = category;
  const onEditItem = (record) => {
    dispatch({
      type: `category/handleModalVisible`,
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
          type: 'category/remove',
          payload: { id: record.productCategoryId },
        });
      },
    });
  };
  const tableProps = {
    size: 'model',
    loading: loading.effects['category/query'],
    menuOptions: [
      { key: '1', name: '修改', func: onEditItem },
      { key: '2', name: '删除', func: onDeleteItem },
    ],
    columns: [
      {
        dataIndex: 'productCategoryName',
        title: '名称',
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
    dataSource: categoryList,
    rowKey: (record) => record.productCategoryId,
    rowSelection: {
      columnWidth: 80,
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    },
    pagination: pagination(categoryList, (pageIndex, pageSize) => {}),
  };
  return <CTable {...tableProps} />;
}

export default List;
