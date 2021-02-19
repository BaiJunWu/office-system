import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'antd';
import CForm from 'components/CForm';
import CSelect from 'components/CSelect';
import { deepCopy } from 'utils/common';

function ComModal(props) {
  const [wechatType, setWechatType] = useState(1);
  const [form] = Form.useForm();
  const { dispatch, wechataccount, onFinish } = props;
  const { modalVisible, record, brandList } = wechataccount;
  useEffect(() => {
    if (record != null) {
      let data = [];
      deepCopy(data, record);
      data.brandDtoList = data.brandDtoList.map((item) => {
        return item.erpBrandId;
      });
      setWechatType(data.wechatType);
      form.setFieldsValue(data);
    }
    if (record === null) {
      form.resetFields();
    }
  }, [modalVisible]);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const OptionsList = [
    { id: 0, name: '公众号' },
    { id: 1, name: '小程序' },
  ];
  const selectPropsBrand = {
    mode: 'multiple',
    style: { width: '100%' },
    data: brandList,
    placeholder: '选择品牌',
    id: 'brandId',
    name: 'brandName',
  };
  const selectProps = {
    tyle: { width: '100%' },
    data: OptionsList,
    placeholder: '选择微信类型',
    id: 'id',
    name: 'name',
    onChange: (key) => {
      setWechatType(key);
    },
  };
  const formProps = {
    form,
    name: 'wechataccount',
    layout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    },
    formItem: [
      {
        label: '品牌',
        name: 'brandDtoList',
        placeholder: '品牌',
        component: <CSelect {...selectPropsBrand} />,
        rules: [{ required: true, message: '品牌不可为空' }],
      },
      {
        label: '微信类型',
        name: 'wechatType',
        placeholder: '微信类型',
        component: <CSelect {...selectProps} />,
        rules: [{ required: true, message: '微信类型不可为空' }],
      },
      {
        label: '小程序appId',
        name: 'appIdMp',
        initialValue: '',
        placeholder: '小程序appId',
        rules: [
          {
            required: wechatType == 0 ? false : true,
            message: '小程序appId不可为空',
          },
        ],
      },
      {
        label: '小程序secret',
        name: 'secretMp',
        initialValue: '',
        placeholder: '小程序secret',
        rules: [
          {
            required: wechatType == 0 ? false : true,
            message: '小程序secret不可为空',
          },
        ],
      },
      {
        label: '公众号appId',
        name: 'appIdSa',
        initialValue: '',
        placeholder: '公众号appId',
        rules: [
          {
            required: wechatType == 1 ? false : true,
            message: '公众号appId不可为空',
          },
        ],
      },
      {
        label: '公众号secret',
        name: 'secretSa',
        initialValue: '',
        placeholder: '公众号secret',
        rules: [
          {
            required: wechatType == 1 ? false : true,
            message: '公众号secret不可为空',
          },
        ],
      },
    ],
    onFinish,
    onFinishFailed,
  };
  const modalProps = {
    title: '创建授权',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    onOk: () => form.submit(),
    onCancel: () => {
      dispatch({
        type: `wechataccount/handleModalVisible`,
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
    </Modal>
  );
}

export default ComModal;
