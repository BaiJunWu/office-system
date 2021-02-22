import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import CForm from 'components/CForm';
import CSelect from 'components/CSelect';
import CTreeSelect from 'components/CTreeSelect';
import { WECHAT_PLATFORM_UPLOAD, WECHAT_PLATFORM_DOWNLOAD } from 'utils/config';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, top, onFinish } = props;
  const { modalVisible, record } = top;
  useEffect(() => {
    if (record != null) {
      form.setFieldsValue(record);
    }
    if (record == null) {
      form.resetFields();
    }
  }, [modalVisible]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const formProps = {
    form,
    name: 'info',
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    },
    formItem: [],
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
    onCancel: () => {},
  };
  return (
    <Modal forceRender {...modalProps}>
      <CForm {...formProps} />
    </Modal>
  );
}

export default ComModal;
