import React, { Fragment } from 'react';
import { Tree } from 'antd';
import { arrayToTree, compare, deepCopy } from 'utils/common';

const ComTree = (props) => {
  const { treeData, id, fatherid, title, sort, ...treeProps } = props;
  let data = [];
  deepCopy(data, treeData);
  if (data.length !== 0) {
    data.forEach((item) => {
      item.key = item[id];
      item.title = item[title];
    });
  }
  const tree = arrayToTree(data, id, fatherid).sort(compare(sort));
  return (
    <Fragment>
      <Tree
        checkable
        icon={false}
        expandAction="false"
        defaultExpandAll={true}
        treeData={tree}
        {...treeProps}
      />
    </Fragment>
  );
};

export default ComTree;
