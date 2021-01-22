import React, { Component } from 'react';
import { connect } from 'umi';
import { Divider, Modal } from 'antd';
import { prefix } from 'config';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';

class Permission extends Component {
  handleSelect_Change = (userId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/getPermission',
      payload: {
        userId,
      },
    });
  };
  handleAddList_Click = () => {
    const { dispatch, permission } = this.props;
    const { userId, menuPermission, vendorPermission } = permission;
    Modal.confirm({
      title: '您确定要保存权限吗？',
      onOk: () => {
        dispatch({
          type: 'permission/savePermission',
          payload: {
            userId,
            menuPermission,
            vendorPermission,
          },
        });
      },
    });
  };
  handleUserTree_Click = (menuPermission) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/handlePermission',
      payload: {
        menuPermission,
      },
    });
  };
  handleVendorTree_Click = (vendorPermission) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/handlePermission',
      payload: {
        vendorPermission,
      },
    });
  };
  render() {
    const menuList = JSON.parse(sessionStorage.getItem(`${prefix}menuList`));
    const { dispatch, permission, loading } = this.props;
    const {
      handleSelect_Change,
      handleAddList_Click,
      handleUserTree_Click,
      handleVendorTree_Click,
    } = this;
    let modal = {
      dispatch,
      permission,
      loading,
      menuList,
      handleSelect_Change,
      handleAddList_Click,
      handleUserTree_Click,
      handleVendorTree_Click,
    };
    return (
      <Page inner>
        <Filter {...modal} />
        <Divider style={{ margin: '10px 0' }} />
        <List {...modal} />
      </Page>
    );
  }
}

export default connect(({ permission, loading }) => ({ permission, loading }))(
  Permission,
);
