import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { WECHAT_PLATFORM_DOWNLOAD } from 'config';
import { Modal, Image } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const { dispatch, top } = props;
  const {} = top;
  const onEditItem = (record) => {};
  const onDeleteItem = (record) => {
    const { productName, categoryCode, pageIndex, pageSize } = goodinfo;
    Modal.confirm({
      title: '您确定要删除这条记录吗？',
      onOk: () => {},
    });
  };
  const tableProps = {
    size: 'model',
    // loading: loading.effects['top/getVendorList'],
    menuOptions: [
      { key: '1', name: '修改', func: onEditItem },
      { key: '2', name: '删除', func: onDeleteItem },
    ],
    columns: [],
    scroll: { x: 1500 },
    // dataSource: productList.list,
    rowKey: (record) => record.productId,
    // pagination: pagination(productList, (pageIndex, pageSize) => {

    // }),
  };
  return <CTable {...tableProps} />;
}

export default List;
