import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import CForm from 'components/CForm';
import CSelect from 'components/CSelect';
import CTreeSelect from 'components/CTreeSelect';

function ComModal(props) {
  const [form] = Form.useForm();
  const { dispatch, menu, menuList, onFinish } = props;
  const { modalVisible, record } = menu;
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
    { id: 0, name: '不显示' },
    { id: 1, name: '显示' },
  ];
  const selectProps = {
    style: { width: '100%' },
    data: OptionsList,
    placeholder: '选择是否显示',
    id: 'id',
    name: 'name',
  };
  const TreeProps = {
    id: 'menuId',
    name: 'menuName',
    placeholder: '选择父级菜单',
    treeData: menuList,
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
        label: '父菜单',
        name: 'menuParentId',
        component: <CTreeSelect {...TreeProps} />,
      },
      {
        label: '名称',
        name: 'menuName',
        placeholder: '名称',
        rules: [{ required: true, message: '名称不能为空' }],
      },
      {
        label: '链接',
        name: 'menuUrl',
        placeholder: '链接',
        rules: [{ required: true, message: '链接不能为空' }],
      },
      {
        label: '图标',
        name: 'iconCls',
        placeholder: '图标',
      },
      {
        label: '显示顺序',
        name: 'menuOrder',
        placeholder: '显示顺序',
        rules: [{ required: true, message: '显示顺序不能为空' }],
      },
      {
        label: '是否显示',
        name: 'showMenu',
        component: <CSelect {...selectProps} />,
        rules: [{ required: true, message: '是否显示不能为空' }],
      },
    ],
    onFinish,
    onFinishFailed,
  };
  const modalProps = {
    title: '创建菜单',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    onOk: () => form.submit(),
    onCancel: () => {
      dispatch({
        type: `menu/handleModalVisible`,
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
