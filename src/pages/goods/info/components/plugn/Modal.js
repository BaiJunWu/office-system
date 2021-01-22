import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import CForm from 'components/CForm';

function ComModal(props) {
  const [form] = Form.useForm();
  const {
    formProps,
    component,
    record,
    setRecord,
    setList,
    setModalVisible,
  } = props;
  formProps.form = form;
  useEffect(() => {
    form.setFieldsValue(record);
    if (record === null) {
      if (setList) {
        setList([]);
      }
      form.resetFields();
    }
  }, [props.visible]);
  return (
    <Modal
      forceRender
      {...props}
      onOk={() => form.submit()}
      onCancel={() => {
        setModalVisible(false);
        setRecord(null);
      }}
    >
      <CForm {...formProps} />
      {component ? component() : ''}
    </Modal>
  );
}

export default ComModal;
