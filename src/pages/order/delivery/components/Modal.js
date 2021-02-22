import React, { useEffect } from 'react';
import { Modal, Form, Image, Button } from 'antd';
import { WECHAT_PLATFORM_DOWNLOAD } from 'config';
import CForm from 'components/CForm';
import CTable from 'components/CTable';
import CSelect from 'components/CSelect';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, delivery, onFinish } = props;
  const { modalVisible, record, vendorList } = delivery;
  useEffect(() => {
    if (record != null) {
      form.setFieldsValue({
        orderNumber: record.orderNumber,
        orderDateTime: record.orderDate + ' ' + record.orderTime,
        orderCustomer: record.customerName + ' ' + record.customerPhone,
        orderAddress:
          record.province + record.city + record.area + record.address,
        transactionId: record.transactionId,
        cashFee: record.cashFee,
      });
    }
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
        label: '订单编号',
        name: 'orderNumber',
        placeholder: '订单编号',
      },
      {
        label: '订单日期',
        name: 'orderDateTime',
        placeholder: '订单日期',
      },
      {
        label: '收件人',
        name: 'orderCustomer',
        placeholder: '收件人',
      },
      {
        label: '收件地址',
        name: 'orderAddress',
        placeholder: '收件地址',
      },
      {
        label: '交易流水号',
        name: 'transactionId',
        placeholder: '交易流水号',
      },
      {
        label: '现金支付金额',
        name: 'cashFee',
        placeholder: '现金支付金额',
      },
    ],
    onFinish,
    onFinishFailed,
  };
  if (record != null) {
    const selectProps2 = {
      style: { width: '100%' },
      data: [
        { id: '1', name: 'EMS' },
        { id: '2', name: '圆通速递' },
        { id: '3', name: '韵达快递' },
        { id: '4', name: '天天快递' },
        { id: '5', name: '中通快递' },
        { id: '6', name: '百世汇通' },
        { id: '7', name: '申通快递' },
        { id: '8', name: '顺丰速运' },
        { id: '9', name: '联邦快递' },
        { id: '10', name: '国通快递' },
        { id: '11', name: '速尔' },
        { id: '12', name: '德邦快递' },
      ],
      placeholder: '选择快递',
      id: 'name',
      name: 'name',
    };
    formProps.formItem.push(
      {
        label: '快递公司',
        name: 'expressCompany',
        placeholder: '快递公司',
        component: <CSelect {...selectProps2} />,
        rules: [{ required: true, message: '请选择' }],
      },
      {
        label: '快递单号',
        name: 'expressNumber',
        placeholder: '快递单号',
        rules: [{ required: true, message: '快递单号不可为空' }],
      },
    );
  }
  const handleClose = () => {
    dispatch({
      type: `delivery/handleModalVisible`,
      payload: {
        modalVisible: false,
        record: null,
      },
    });
  };
  let buttonList = (
    <div>
      <Button type="default" onClick={() => handleClose()}>
        取消
      </Button>
      <Button type="default">上一个</Button>
      <Button type="default">下一个</Button>
      <Button type="primary" onClick={() => form.submit()}>
        立即发货
      </Button>
    </div>
  );
  const modalProps = {
    width: '60%',
    title: '创建菜单',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    footer: buttonList,
    okText: '发货',
    onCancel: () => {
      dispatch({
        type: `delivery/handleModalVisible`,
        payload: {
          modalVisible: false,
          record: null,
        },
      });
    },
  };
  const tableProps = {
    size: 'model',
    columns: [
      {
        dataIndex: 'productPath',
        title: '产品图片',
        align: 'center',
        render: (productPath) => (
          <Image
            src={`${WECHAT_PLATFORM_DOWNLOAD}/${productPath}`}
            width={120}
            height={120}
          />
        ),
      },
      {
        dataIndex: 'productCode',
        title: '产品编码',
        align: 'center',
        width: 200,
      },
      {
        dataIndex: 'productName',
        title: '产品名称',
        align: 'center',
        width: 200,
      },
      {
        dataIndex: 'itemValue',
        title: '规格型号',
        align: 'center',
        width: 150,
      },
      {
        dataIndex: 'count',
        title: '数量',
        align: 'center',
        width: 100,
      },
      {
        dataIndex: 'tagPrice',
        title: '标签金额',
        align: 'center',
        width: 150,
      },
      {
        dataIndex: 'realPrice',
        title: '结算金额',
        align: 'center',
        width: 150,
      },
      {
        dataIndex: 'costPrice',
        title: '成本金额',
        align: 'center',
        width: 150,
      },
      {
        dataIndex: 'point',
        title: '扣除积分',
        align: 'center',
        width: 150,
      },
    ],
    scroll: { x: 1250 },
    dataSource: record == null ? [] : record.detailList,
    rowKey: (record) => record.orderDetailId,
  };
  return (
    <Modal forceRender {...modalProps}>
      <CForm {...formProps} />
      <CTable {...tableProps} />
    </Modal>
  );
}

export default ComModal;
