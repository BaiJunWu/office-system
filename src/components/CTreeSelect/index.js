import React from 'react';
import { TreeSelect } from 'antd';
import { deepCopy } from 'utils/common';
const { TreeNode } = TreeSelect;

function CTreeSelect(props) {
  const { treeData, id, name, value, ...treeProps } = props;
  let data = [];
  deepCopy(data, treeData);
  const loadTree = (data) => {
    return data.map((item) => {
      if (item.children) {
        item.id = item[id];
        item.name = item[name];
        return (
          <TreeNode value={item.id} key={item.id} title={item.name}>
            {loadTree(item.children)}
          </TreeNode>
        );
      }
      item.id = item[id];
      item.name = item[name];
      return (
        <TreeNode value={item.id} key={item.id} title={item.name}></TreeNode>
      );
    });
  };
  return (
    <TreeSelect
      style={{ width: '100%' }}
      value={value || undefined}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeDefaultExpandAll
      {...treeProps}
    >
      {loadTree(data)}
    </TreeSelect>
  );
}

export default CTreeSelect;
