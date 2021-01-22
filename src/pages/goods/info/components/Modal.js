import React, { useEffect, useMemo } from 'react';
import { Modal, Form } from 'antd';
import Plugn from './plugn';
import CForm from 'components/CForm';
import CSelect from 'components/CSelect';
import CTreeSelect from 'components/CTreeSelect';
import CUpload from 'components/CUpload';
import { WECHAT_PLATFORM_UPLOAD, WECHAT_PLATFORM_DOWNLOAD } from 'utils/config';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, goodinfo, onFinish } = props;
  const { modalVisible, record, categoryList, vendorList } = goodinfo;
  useEffect(() => {
    if (record != null) {
      form.setFieldsValue(record);
      const { detailList, imageList, itemList, priceList } = record;
      dispatch({
        type: 'goodinfo/handleImageList',
        payload: {
          detailList,
          imageList,
          itemList,
          priceList,
        },
      });
    }
    if (record == null) {
      form.resetFields();
      dispatch({
        type: 'goodinfo/handleImageList',
        payload: {
          detailList: [],
          imageList: [],
          itemList: [],
          priceList: [],
        },
      });
    }
  }, [modalVisible]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const selectProps = {
    style: { width: '100%' },
    data: vendorList,
    placeholder: '选择商户',
    id: 'vendorId',
    name: 'vendorName',
  };
  const TreeProps = {
    id: 'productCategoryId',
    name: 'productCategoryName',
    placeholder: '选择分类',
    treeData: categoryList,
  };
  const uploadProps = {
    uploadFile: WECHAT_PLATFORM_UPLOAD + '/resource/upload_file',
    downFile: WECHAT_PLATFORM_DOWNLOAD,
    picCount: 1,
  };
  const formProps = {
    form,
    name: 'info',
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    },
    formItem: [
      {
        label: '商户',
        name: 'vendorId',
        component: <CSelect {...selectProps} />,
        rules: [{ required: true, message: '商户不能为空' }],
      },
      {
        label: '快递费用',
        name: 'expressFee',
        placeholder: '快递费用',
        rules: [{ required: true, message: '快递费用不能为空' }],
      },
      {
        label: '商品分类',
        name: 'categoryId',
        placeholder: '商品分类',
        component: <CTreeSelect {...TreeProps} />,
        rules: [{ required: true, message: '商品分类不能为空' }],
      },
      {
        label: '商品名称',
        name: 'productName',
        placeholder: '商品名称',
        rules: [{ required: true, message: '商品名称不能为空' }],
      },
      {
        label: '商品编码',
        name: 'productCode',
        placeholder: '商品编码',
        rules: [{ required: true, message: '商品编码不能为空' }],
      },
      {
        label: '商品链接',
        name: 'url',
      },
      {
        label: '显示顺序',
        name: 'productOrder',
        rules: [
          {
            required: false,
            pattern: /(^[0-9]$)|(^[1-9]\d*$)/,
            message: '请输入正确格式数字',
          },
        ],
      },
      {
        label: '商品图片',
        name: 'productPath',
        component: <CUpload {...uploadProps} />,
      },
    ],
    onFinish,
    onFinishFailed,
  };
  const modalProps = {
    width: '60%',
    title: '创建菜单',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    onOk: () => form.submit(),
    onCancel: () => {
      dispatch({
        type: `goodinfo/handleModalVisible`,
        payload: {
          modalVisible: false,
          record: null,
        },
      });
    },
  };
  return (
    <Modal forceRender {...modalProps}>
      <CForm {...formProps} />
      <Plugn {...props} />
    </Modal>
  );
}

export default ComModal;
