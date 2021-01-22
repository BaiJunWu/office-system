import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import CForm from 'components/CForm';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, user, onFinish } = props;
  const { modalVisible, record } = user;
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
    name: 'menu',
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    },
    formItem: [
      {
        label: '用户姓名',
        name: 'userName',
        placeholder: '用户姓名',
        rules: [{ required: true, message: '用户姓名不能为空' }],
      },
      {
        label: '用户手机',
        name: 'userPhone',
        placeholder: '用户手机',
        rules: [{ required: true, message: '用户手机不能为空' }],
      },
    ],
    onFinish,
    onFinishFailed,
  };
  const modalProps = {
    title: '创建用户',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    onOk: () => form.submit(),
    onCancel: () => {
      dispatch({
        type: `user/handleModalVisible`,
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
