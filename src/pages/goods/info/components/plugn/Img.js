import React, { Fragment, useState } from 'react';
import { Button, Row, Image, Modal } from 'antd';
import { v1 as uuidv1 } from 'uuid';
import CModal from './Modal';
import CTable from 'components/CTable';
import CUpload from 'components/CUpload';
import { deepCopy, pagination } from 'utils/common';
import { WECHAT_PLATFORM_UPLOAD, WECHAT_PLATFORM_DOWNLOAD } from 'utils/config';

function Img(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const { dispatch, goodinfo, app } = props;
  const { imageList } = goodinfo;
  const onEditItem = (record) => {
    setRecord(record);
    setModalVisible(true);
  };
  const onDeleteItem = (record) => {
    Modal.confirm({
      title: '您确定要删除这条记录吗？',
      onOk: () => {
        let data = [];
        deepCopy(data, imageList);
        let index = data.findIndex(
          (_) => _.productImageId === record.productImageId,
        );
        data.splice(index, 1);
        dispatch({
          type: 'goodinfo/handleImageList',
          payload: {
            imageList: data,
          },
        });
      },
    });
  };
  const onFinish = (values) => {
    const { appId } = app;
    const { path, url } = values;
    if (record) {
      let data = [];
      deepCopy(data, imageList);
      data.forEach((item) => {
        if (item.productImageId === record.productImageId) {
          item.path = values.path;
          item.url = values.url;
        }
      });
      dispatch({
        type: 'goodinfo/handleImageList',
        payload: {
          imageList: data,
        },
      });
      setModalVisible(false);
      setRecord(null);
    } else {
      let data = [];
      deepCopy(data, imageList);
      if (path) {
        values.path = path[0].response.response.destinationFileName;
      } else {
        values.path = '';
      }
      if (url) {
        values.url = url;
      } else {
        values.url = '';
      }
      let id = uuidv1();
      values.appId = appId;
      values.productImageId = id;
      data.push(values);
      dispatch({
        type: 'goodinfo/handleImageList',
        payload: {
          imageList: data,
        },
      });
      setModalVisible(false);
      setRecord(null);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // table列表对象
  const tableProps = {
    size: 'model',
    // loading: loading.effects['goodinfo/query'],
    menuOptions: [
      { key: '1', name: '修改', func: onEditItem },
      { key: '2', name: '删除', func: onDeleteItem },
    ],
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
      {
        dataIndex: 'operation',
        type: 'Operation',
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: 200,
      },
    ],
    dataSource: imageList,
    rowKey: (record) => record.productImageId,
    pagination: pagination(imageList, (pageIndex, pageSize) => {
      console.log(pageIndex);
      console.log(pageSize);
    }),
  };
  // Form表单对象
  const uploadProps = {
    uploadFile: WECHAT_PLATFORM_UPLOAD + '/resource/upload_file',
    downFile: WECHAT_PLATFORM_DOWNLOAD,
    picCount: 1,
  };
  const formProps = {
    name: 'img',
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    },
    formItem: [
      {
        label: '商品图片',
        name: 'path',
        component: <CUpload {...uploadProps} />,
        rules: [{ required: true, message: '商品图片不能为空' }],
      },
      {
        label: '商品链接',
        name: 'url',
        placeholder: '商品链接',
      },
    ],
    onFinish,
    onFinishFailed,
  };
  // 弹出框对象
  const modalProps = {
    title: '创建商品图片',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    setModalVisible,
    setRecord,
    record,
    formProps,
  };
  const handleImage_Click = () => {
    setModalVisible(true);
  };
  return (
    <Fragment>
      <Row style={{ marginBottom: '10px' }} align="middle" justify="end">
        <Button type="primary" onClick={handleImage_Click}>
          创建
        </Button>
      </Row>
      <CTable {...tableProps} />
      <CModal {...modalProps} />
    </Fragment>
  );
}

export default Img;
