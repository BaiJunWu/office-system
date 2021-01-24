import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import CForm from 'components/CForm';
import CSelect from 'components/CSelect';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, merchant, onFinish } = props;
  const { modalVisible, record } = merchant;
  useEffect(() => {
    form.setFieldsValue(record);
    if (record === null) {
      form.resetFields();
    }
  }, [modalVisible]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const OptionsList = [
    { id: 0, name: '停用' },
    { id: 1, name: '启用' },
  ];
  const selectProps = {
    style: { width: '100%' },
    data: OptionsList,
    placeholder: '选择状态',
    id: 'id',
    name: 'name',
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
        label: '商户名称',
        name: 'vendorName',
        placeholder: '商户名称',
        rules: [{ required: true, message: '商户名称不能为空' }],
      },
      {
        label: '是否启用',
        name: 'state',
        placeholder: '是否启用',
        component: <CSelect {...selectProps} />,
        rules: [{ required: true, message: '是否启用不能为空' }],
      },
    ],
    onFinish,
    onFinishFailed,
  };
  const modalProps = {
    title: '创建商户',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    onOk: () => form.submit(),
    onCancel: () => {
      dispatch({
        type: `merchant/handleModalVisible`,
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
