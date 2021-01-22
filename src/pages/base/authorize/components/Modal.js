import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import CForm from 'components/CForm';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, authorize, onFinish } = props;
  const { modalVisible, record } = authorize;
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
    name: 'authorize',
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    },
    formItem: [
      {
        label: 'appId',
        name: 'appId',
        rules: [{ required: true, message: 'appId不可为空' }],
      },
      {
        label: '授权名称',
        name: 'authorizeName',
        placeholder: '授权名称',
        rules: [{ required: true, message: '授权名称不能为空' }],
      },
      {
        label: 'erp接口地址',
        name: 'erpUrl',
        placeholder: 'erp接口地址',
        rules: [{ required: true, message: 'erp接口地址不能为空' }],
      },
      {
        label: '秘钥',
        name: 'secret',
        placeholder: '秘钥',
        rules: [{ required: true, message: '秘钥不能为空' }],
      },
    ],
    onFinish,
    onFinishFailed,
  };
  const modalProps = {
    title: '创建菜单',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    onOk: () => form.submit(),
    onCancel: () => {
      dispatch({
        type: `authorize/handleModalVisible`,
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
