import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { WECHAT_PLATFORM_DOWNLOAD } from 'config';
import { Modal, Image } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const { dispatch, loading, banner } = props;
  const { bannerList } = banner;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onEditItem = (record) => {
    dispatch({
      type: `banner/handleModalVisible`,
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
          type: `banner/remove`,
          payload: {
            id: record.bannerId,
          },
        });
      },
    });
  };
  const tableProps = {
    size: 'banner',
    loading: loading.effects['banner/query'],
    menuOptions: [
      { key: '1', name: '修改', func: onEditItem },
      { key: '2', name: '删除', func: onDeleteItem },
    ],
    columns: [
      {
        dataIndex: 'bannerPath',
        title: '广告图',
        align: 'center',
        render: (bannerPath) => (
          <Image
            src={`${WECHAT_PLATFORM_DOWNLOAD}/${bannerPath}`}
            width={120}
            height={120}
          />
        ),
      },
      {
        dataIndex: 'bannerUrl',
        title: '跳转地址',
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
    dataSource: bannerList,
    rowKey: (record) => record.bannerId,
    rowSelection: {
      columnWidth: 80,
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    },
    pagination: pagination(bannerList, (pageIndex, pageSize) => {}),
  };
  return <CTable {...tableProps} />;
}

export default List;
