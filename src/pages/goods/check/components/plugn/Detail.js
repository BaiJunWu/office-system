import React, { Fragment } from 'react';
import { Image } from 'antd';
import CTable from 'components/CTable';
import { pagination } from 'utils/common';
import { WECHAT_PLATFORM_DOWNLOAD } from 'utils/config';
function Detail(props) {
  const { check } = props;
  const { detailList } = check;
  const tableProps = {
    size: 'model',
    columns: [
      {
        dataIndex: 'path',
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
        dataIndex: 'url',
        title: '商品链接',
        align: 'center',
      },
    ],
    dataSource: detailList,
    rowKey: (record) => record.productDetailId,
    pagination: pagination(detailList, (pageIndex, pageSize) => {
      console.log(pageIndex);
      console.log(pageSize);
    }),
  };
  return (
    <Fragment>
      <CTable {...tableProps} />
    </Fragment>
  );
}

export default Detail;
