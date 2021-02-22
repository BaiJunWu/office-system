import React from 'react';
import { pagination } from 'utils/common';
import { WECHAT_PLATFORM_DOWNLOAD } from 'config';
import { Image } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const { loading, top, selectedRowKeys, setSelectedRowKeys } = props;
  const { modelproductList } = top;
  const tableProps = {
    style: {
      marginTop: '20px',
    },
    size: 'model',
    loading: loading.effects['top/modelsearch'],
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
        dataIndex: 'vendor',
        title: '商户',
        align: 'center',
        render: (text) => text && text.vendorName,
        width: 150,
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
    ],
    scroll: { x: 800 },
    dataSource: modelproductList.list,
    rowKey: (record) => record.productId,
    rowSelection: {
      type: 'radio',
      columnWidth: 80,
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    },
    pagination: pagination(modelproductList, (pageIndex, pageSize) => {}),
  };
  return <CTable {...tableProps} />;
}

export default List;
