import React from 'react';
import { pagination } from 'utils/common';
import { WECHAT_PLATFORM_DOWNLOAD } from 'config';
import { Image, Tag } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const { dispatch, loading, check } = props;
  const { productList, productName, categoryCode, auditState } = check;
  const onEditItem = (record) => {
    dispatch({
      type: `check/handleModalVisible`,
      payload: {
        modalVisible: true,
        record,
      },
    });
  };
  const tableProps = {
    size: 'model',
    loading: loading.effects['check/search'],
    menuOptions: [{ key: '1', name: '详情', func: onEditItem }],
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
      {
        dataIndex: 'operation',
        type: 'Operation',
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: 100,
      },
    ],
    scroll: { x: 1450 },
    dataSource: productList.list,
    rowKey: (record) => record.productId,
    pagination: pagination(productList, (pageIndex, pageSize) => {
      dispatch({
        type: 'check/search',
        payload: {
          pageIndex,
          pageSize,
          productName,
          categoryCode,
          auditState,
        },
      });
    }),
  };
  return <CTable {...tableProps} />;
}

export default List;
