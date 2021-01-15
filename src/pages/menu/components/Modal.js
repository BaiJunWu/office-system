import React from 'react';
import { Modal } from 'antd';

function ComModal(props) {
  const { dispatch, menu } = props;
  const { modalVisible } = menu;
  const modalProps = {
    visible: modalVisible,
    title: '创建菜单',
    okText: '确定',
    cancelText: '取消',
    centered: true,
    onCancel() {
      dispatch({
        type: `menu/handleModalVisible`,
        payload: {
          modalVisible: false,
        },
      });
    },
  };
  return <Modal {...modalProps}></Modal>;
}

export default ComModal;
