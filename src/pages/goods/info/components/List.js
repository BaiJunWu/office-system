import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { WECHAT_PLATFORM_DOWNLOAD } from 'config';
import { Modal, Image } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const { dispatch, loading, goodinfo } = props;
  const { productList, productName, categoryCode } = goodinfo;
  const onEditItem = (record) => {
    dispatch({
      type: `goodinfo/handleModalVisible`,
      payload: {
        modalVisible: true,
        record,
      },
    });
  };
  const onDeleteItem = (record) => {
    const { productName, categoryCode, pageIndex, pageSize } = goodinfo;
    Modal.confirm({
      title: '您确定要删除这条记录吗？',
      onOk: () => {
        dispatch({
          type: `goodinfo/remove`,
          payload: {
            productId: record.productId,
            productName,
            categoryCode,
            pageIndex,
            pageSize,
          },
        });
      },
    });
  };
  const tableProps = {
    size: 'model',
    loading: loading.effects['goodinfo/getVendorList'],
    menuOptions: [
      { key: '1', name: '修改', func: onEditItem },
      { key: '2', name: '删除', func: onDeleteItem },
    ],
    columns: [
      {
        dataIndex: 'productPath',
        title: '图片地址',
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
        dataIndex: 'vendor',
        title: '商户',
        align: 'center',
        render: (text) => text && text.vendorName,
        width: 150,
      },
      {
        dataIndex: 'expressFee',
        title: '快递费用',
        align: 'center',
        width: 100,
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
        dataIndex: 'productOrder',
        title: '显示顺序',
        align: 'center',
        width: 100,
      },
      {
        dataIndex: 'operation',
        type: 'Operation',
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: 150,
      },
    ],
    scroll: { x: 1500 },
    dataSource: productList.list,
    rowKey: (record) => record.productId,
    pagination: pagination(productList, (pageIndex, pageSize) => {
      dispatch({
        type: 'goodinfo/search',
        payload: {
          pageIndex,
          pageSize,
          productName,
          categoryCode,
        },
      });
    }),
  };
  return <CTable {...tableProps} />;
}

export default List;
