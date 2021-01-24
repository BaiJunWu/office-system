import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import CForm from 'components/CForm';
import CUpload from 'components/CUpload';
import { WECHAT_PLATFORM_UPLOAD, WECHAT_PLATFORM_DOWNLOAD } from 'utils/config';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, banner, onFinish } = props;
  const { modalVisible, record } = banner;
  useEffect(() => {
    form.setFieldsValue(record);
    if (record === null) {
      form.resetFields();
    }
  }, [modalVisible]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const uploadProps = {
    uploadFile: WECHAT_PLATFORM_UPLOAD + '/resource/upload_file',
    downFile: WECHAT_PLATFORM_DOWNLOAD,
    picCount: 1,
  };
  const formProps = {
    form,
    name: 'banner',
    layout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    },
    formItem: [
      {
        label: '广告图',
        name: 'bannerPath',
        placeholder: '广告图',
        component: <CUpload {...uploadProps} />,
        rules: [{ required: true, message: '广告图不可为空' }],
      },
      {
        label: '跳转连接',
        name: 'bannerUrl',
        placeholder: '跳转连接',
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
        type: `banner/handleModalVisible`,
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
