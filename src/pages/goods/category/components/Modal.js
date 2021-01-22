import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import { WECHAT_PLATFORM_UPLOAD, WECHAT_PLATFORM_DOWNLOAD } from 'utils/config';
import CForm from 'components/CForm';
import CTreeSelect from 'components/CTreeSelect';
import CUpload from 'components/CUpload';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, category, onFinish } = props;
  const { modalVisible, record, categoryList } = category;
  useEffect(() => {
    form.setFieldsValue(record);
    if (record === null) {
      form.resetFields();
    }
  }, [modalVisible]);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const TreeProps = {
    id: 'productCategoryId',
    name: 'productCategoryName',
    placeholder: '选择父级菜单',
    treeData: categoryList,
  };
  const uploadProps = {
    uploadFile: WECHAT_PLATFORM_UPLOAD + '/resource/upload_file',
    downFile: WECHAT_PLATFORM_DOWNLOAD,
    picCount: 1,
  };
  const formProps = {
    form,
    name: 'category',
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    },
    formItem: [
      {
        label: '父分类',
        name: 'fatherProductCategoryId',
        placeholder: '父分类',
        component: <CTreeSelect {...TreeProps} />,
      },
      {
        label: '名称',
        name: 'productCategoryName',
        placeholder: '名称',
        rules: [{ required: true, message: '名称不能为空' }],
      },
      {
        label: '分类图片',
        name: 'productCategoryImagePath',
        component: <CUpload {...uploadProps} />,
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
        type: `category/handleModalVisible`,
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
