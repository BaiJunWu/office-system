import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import CForm from 'components/CForm';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, wechataccount, onFinish } = props;
  const { modalVisible, record } = wechataccount;
  useEffect(() => {
    form.setFieldsValue(record);
    if (record === null) {
      form.resetFields();
    }
  }, [modalVisible]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
        label: '微信类型',
        name: 'wechatType',
        placeholder: '微信类型',
        rules: [{ required: true, message: '微信类型不可为空' }],
      },
      {
        label: '品牌',
        name: 'brandDtoList',
        placeholder: '品牌',
        rules: [{ required: true, message: '品牌不可为空' }],
      },
      {
        label: '小程序appId',
        name: 'appIdMp',
        placeholder: '小程序appId',
        rules: [{ required: true, message: '小程序appId不可为空' }],
      },
      {
        label: '小程序secret',
        name: 'secretMp',
        placeholder: '小程序secret',
        rules: [{ required: true, message: '小程序secret不可为空' }],
      },
      {
        label: '公众号appId',
        name: 'appIdSa',
        placeholder: '公众号appId',
      },
      {
        label: '公众号secret',
        name: 'secretSa',
        placeholder: '公众号secret',
      },
    ],
    onFinish,
    onFinishFailed,
  };
  const modalProps = {
    title: '创建广告图',
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
