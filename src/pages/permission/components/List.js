import React from 'react';
import CTree from 'components/CTree';

function List(props) {
  const {
    dispatch,
    loading,
    menuList,
    permission,
    handleUserTree_Click,
    handleVendorTree_Click,
  } = props;
  const { vendorList, menuPermission, vendorPermission } = permission;
  const treeProps = {
    style: { width: 200 },
    id: 'menuId',
    fatherid: 'menuParentId',
    title: 'menuName',
    sort: 'menuOrder',
    treeData: menuList,
    checkedKeys: menuPermission,
    onCheck: (key) => handleUserTree_Click(key),
  };
  const treeProps2 = {
    style: { width: 200 },
    id: 'vendorId',
    fatherid: '',
    title: 'vendorName',
    treeData: vendorList,
    checkedKeys: vendorPermission,
    onCheck: (key) => handleVendorTree_Click(key),
  };
  return (
    <div style={{ display: 'flex' }}>
      <CTree {...treeProps} />
      <CTree {...treeProps2} />
    </div>
  );
}

export default List;
