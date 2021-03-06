import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { WECHAT_PLATFORM_DOWNLOAD } from 'config';
import { Tag, Image } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const { dispatch, loading, top } = props;
  const { productList, selectProductList } = top;
  const tableProps = {
    size: 'model',
    loading: loading.effects['top/search'],
    columns: [
      {
        dataIndex: 'productPath',
        title: '商品图片',
        align: 'center',
        render: (productPath) => (
          <Image
            src={`${WECHAT_PLATFORM_DOWNLOAD}/${productPath}`}
            width={120}
            height={120}
          />
        ),
        width: 150,
      },
      {
        dataIndex: 'productId',
        title: '商品Id',
        align: 'center',
        width: 200,
      },
      {
        dataIndex: 'productCategory',
        title: '商品分类',
        align: 'center',
        render: (text) => text && text.productCategoryName,
        width: 100,
      },
      {
        dataIndex: 'productName',
        title: '商品名称',
        align: 'center',
        width: 120,
      },
      {
        dataIndex: 'productCode',
        title: '商品编码',
        align: 'center',
        width: 100,
      },
      {
        dataIndex: 'url',
        title: '商品链接',
        align: 'center',
        width: 100,
      },
      {
        dataIndex: 'auditState',
        title: '状态',
        align: 'center',
        width: 100,
        render: (auditState) =>
          auditState == 0 ? (
            <Tag color="red">未审核</Tag>
          ) : (
            <Tag color="green">已审核</Tag>
          ),
      },
      {
        dataIndex: 'productOrder',
        title: '显示顺序',
        align: 'center',
        width: 100,
      },
    ],
    scroll: { x: 1100 },
    dataSource: productList,
    rowKey: (record) => record.productId,
    rowSelection: {
      columnWidth: 80,
      selectProductList,
      onChange: (keys) => {
        dispatch({
          type: 'top/handleList',
          payload: {
            selectProductList: keys,
          },
        });
      },
    },
    pagination: pagination(productList, (pageIndex, pageSize) => {}),
  };
  return <CTable {...tableProps} />;
}

export default List;
