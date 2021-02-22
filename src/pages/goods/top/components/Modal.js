import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message } from 'antd';
import Plugn from './plugn/List';
import CForm from 'components/CForm';
import CTreeSelect from 'components/CTreeSelect';

function ComModal(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const { dispatch, top } = props;
  const { modalVisible, categoryList, pageIndex, pageSize } = top;
  useEffect(() => {
    if (modalVisible == true) {
      dispatch({
        type: `top/modelsearch`,
        payload: {
          productName: '',
          categoryCode: '',
          pageIndex,
          pageSize,
        },
      });
    }
  }, [modalVisible]);
  const onFinish = (values) => {
    values.pageIndex = pageIndex;
    values.pageSize = pageSize;
    if (!values.productName) {
      values.productName = '';
    }
    if (!values.categoryCode) {
      values.categoryCode = '';
    }
    dispatch({
      type: 'top/modelsearch',
      payload: {
        ...values,
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const TreeProps = {
    id: 'productCategoryCode',
    name: 'productCategoryName',
    placeholder: '选择分类',
    treeData: categoryList,
    allowClear: true,
  };

  const formProps = {
    form,
    name: 'info',
    layout: {
      layout: 'inline',
    },
    formItem: [
      {
        label: '商品分类',
        name: 'categoryCode',
        placeholder: '商品分类',
        component: <CTreeSelect style={{ width: '200px' }} {...TreeProps} />,
      },
      {
        label: '商品名称',
        name: 'productName',
        placeholder: '商品名称',
      },
      {
        label: '',
        name: 'btn',
        component: (
          <Button type="primary" onClick={() => form.submit()}>
            查询
          </Button>
        ),
      },
    ],
    onFinish,
    onFinishFailed,
  };
  const modalProps = {
    width: '60%',
    title: '选取商品',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    onOk: () => {
      if (selectedRowKeys.length == 0) {
        message.error('未选择商品');
        return;
      }
      dispatch({
        type: `top/recommendedGoods`,
        payload: {
          recommendedProduct: '1',
          productIdList: selectedRowKeys,
          pageIndex,
          pageSize,
        },
      });
    },
    onCancel: () => {
      dispatch({
        type: `top/handleModalVisible`,
        payload: {
          modalVisible: false,
          record: null,
          pageIndex: 1,
          pageSize: 10,
        },
      });
    },
  };
  return (
    <Modal forceRender {...modalProps}>
      <CForm {...formProps} />
      <Plugn
        {...props}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </Modal>
  );
}

export default ComModal;
