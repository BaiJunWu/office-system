import React, { useEffect } from 'react';
import { Modal, Form, Image } from 'antd';
import { WECHAT_PLATFORM_DOWNLOAD } from 'config';
import CForm from 'components/CForm';
import CTable from 'components/CTable';
import CSelect from 'components/CSelect';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, invoice, onFinish } = props;
  const { modalVisible, record, vendorList, ...search } = invoice;
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
    switch (record.invoiceType) {
      case 0:
        formProps.formItem.push({
          label: '发票信息',
          name: 'invoiceType',
          placeholder: '发票信息',
          initialValue: '不开票',
        });
        break;
      case 1:
        formProps.formItem.push(
          {
            label: '发票抬头',
            name: 'invoiceType',
            placeholder: '发票抬头',
            initialValue: record.invoiceTitle,
          },
          {
            label: '发票状态',
            name: 'invoiceState',
            placeholder: '发票状态',
            initialValue: record.invoiceTitle,
            initialValue: record.invoiceState == 0 ? '未开' : '已开',
          },
        );
        break;
      case 2:
        formProps.formItem.push(
          {
            label: '单位名称',
            name: 'invoiceTitle',
            placeholder: '单位名称',
            initialValue: record.invoiceTitle,
          },
          {
            label: '识别号',
            name: 'organizationCode',
            placeholder: '识别号',
            initialValue: record.organizationCode,
          },
          {
            label: '开户行',
            name: 'bankName',
            placeholder: '开户行',
            initialValue: record.bankName,
          },
          {
            label: '银行卡号',
            name: 'bankCard',
            placeholder: '银行卡号',
            initialValue: record.bankCard,
          },
          {
            label: '企业电话',
            name: 'contactPhone',
            placeholder: '企业电话',
            initialValue: record.contactPhone,
          },
          {
            label: '企业地址',
            name: 'contactAddress',
            placeholder: '企业地址',
            initialValue: record.contactAddress,
          },
          {
            label: '发票状态',
            name: 'invoiceState',
            placeholder: '发票状态',
            initialValue: record.invoiceState,
          },
        );
        break;
      default:
        break;
    }
    let orderState = '';
    switch (record.orderState) {
      case 1:
        orderState = '待支付';
        break;
      case 2:
        orderState = '待发货';
        break;
      case 3:
        orderState = '待收货';
        break;
      case 4:
        orderState = '已完成';
        break;
    }
    const selectProps = {
      style: { width: '100%' },
      disabled: true,
      data: [record.vendor],
      placeholder: '选择商户',
      id: 'vendorId',
      name: 'vendorName',
    };
    const selectProps2 = {
      disabled: true,
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
      id: 'id',
      name: 'name',
    };
    formProps.formItem.push(
      {
        label: '订单状态',
        name: 'orderState',
        placeholder: '订单状态',
        initialValue: orderState,
      },
      {
        label: '商户',
        name: 'vendorId',
        placeholder: '商户',
        component: <CSelect {...selectProps} />,
        initialValue: record.vendorId,
      },
      {
        label: '快递公司',
        name: 'expressCompany',
        placeholder: '快递公司',
        component: <CSelect {...selectProps2} />,
      },
      {
        label: '快递单号',
        name: 'expressNumber',
        placeholder: '快递单号',
        initialValue: orderState,
      },
      {
        label: '快递费用',
        name: 'expressFee',
        placeholder: '快递费用',
        initialValue: orderState,
      },
    );
  }
  const modalProps = {
    width: '60%',
    title: '创建菜单',
    okText: '立即开票',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    onOk: () => {
      Modal.confirm({
        title: '确定现在开票吗？',
        onOk: () => {
          dispatch({
            type: `invoice/invoiceorder`,
            payload: {
              orderId: record.orderId,
              ...search,
            },
          });
        },
      });
    },
    onCancel: () => {
      dispatch({
        type: `invoice/handleModalVisible`,
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
