import React, { useState } from 'react';
import { pagination } from 'utils/common';
import { Modal } from 'antd';
import CTable from 'components/CTable';

function List(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { dispatch, loading, wechataccount } = props;
  const { wechatList } = wechataccount;
  const onEditItem = (record) => {
    dispatch({
      type: `wechataccount/handleModalVisible`,
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
          type: 'wechataccount/remove',
          payload: {
            appId: record.appId,
            id: record.wechatId,
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
        dataIndex: 'wechatType',
        title: '微信类型',
        align: 'center',
        render: (wechatTyp) => (wechatTyp == 0 ? ' 公众号' : '小程序'),
      },
      {
        dataIndex: 'brandDtoList',
        title: '品牌',
        align: 'center',
        render: (text) =>
          text
            .map((val) => {
              val.erpBrandName;
            })
            .join('、'),
      },
      {
        dataIndex: 'appIdMp',
        title: '小程序appId',
        align: 'center',
      },
      {
        dataIndex: 'secretMp',
        title: '小程序secret',
        align: 'center',
      },
      {
        dataIndex: 'appIdSa',
        title: '公众号appId',
        align: 'center',
      },
      {
        dataIndex: 'secretSa',
        title: '公众号secret',
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
    dataSource: wechatList,
    rowKey: (record) => record.wechatId,
    rowSelection: {
      columnWidth: 80,
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    },
    pagination: pagination(wechatList, (pageIndex, pageSize) => {}),
  };
  return <CTable {...tableProps} />;
}

export default List;
