import React, { Fragment, useEffect, useState } from 'react';
import { Form, Button, Row, Modal } from 'antd';
import CForm from 'components/CForm';

function ComModal(props) {
  const [form] = Form.useForm();
  const { paramauthorize, onFinish } = props;
  const { record } = paramauthorize;
  useEffect(() => {
    form.setFieldsValue(record);
    if (record === null) {
      form.resetFields();
    }
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const formProps = {
    form,
    name: 'wechataccount',
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    },
    formItem: [
      {
        label: '微信支付分配的商户号',
        name: 'mchId',
        initialValue: '',
        placeholder: '微信支付分配的商户号',
        rules: [{ required: true, message: '微信支付分配的商户号不可为空' }],
      },
      {
        label: '微信支付密钥',
        name: 'mchKey',
        initialValue: '',
        placeholder: '微信支付密钥',
        rules: [{ required: true, message: '微信支付密钥不可为空' }],
      },
      {
        label: '支付回调地址',
        name: 'notifyUrl',
        initialValue: '',
        placeholder: '支付回调地址',
        rules: [{ required: true, message: '支付回调地址不可为空' }],
      },
      {
        label: '短信AppId',
        name: 'smsAppId',
        initialValue: '',
        placeholder: '短信AppId',
        rules: [{ required: true, message: '短信AppId不可为空' }],
      },
      {
        label: '短信AppKey',
        name: 'smsAppKey',
        initialValue: '',
        placeholder: '短信AppKey',
        rules: [{ required: true, message: '短信AppKey不可为空' }],
      },
      {
        label: '短信签名',
        name: 'smsSign',
        initialValue: '',
        placeholder: '短信签名',
        rules: [{ required: true, message: '短信签名不可为空' }],
      },
    ],
    onFinish,
    onFinishFailed,
  };
  return (
    <Fragment>
      <Row
        style={{ marginBottom: '10px' }}
        type="flex"
        align="middle"
        justify="end"
      >
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: '您确定要保存授权参数吗？',
              onOk: () => {
                form.submit();
              },
            });
          }}
        >
          保存
        </Button>
      </Row>
      <CForm {...formProps} />
    </Fragment>
  );
}

export default ComModal;
