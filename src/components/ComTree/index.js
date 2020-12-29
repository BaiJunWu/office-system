import React, { Fragment } from 'react'
import { Tree } from 'antd'
const { TreeNode, DirectoryTree } = Tree
import { arrayToTree } from 'utils/common'

const ComTree = props => {
  const tree = arrayToTree(props.treeList, 'id', 'father')
  const loadTree = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            value={item.id}
            key={item.id}
            title={item.name}
          >
            {loadTree(item.children)}
          </TreeNode>
        )
      }
      return (
        <TreeNode
          value={item.id}
          key={item.id}
          title={item.name}
        ></TreeNode>
      )
    })
  }
  return (
    <Fragment>
      <DirectoryTree
        expandAction="false"
        defaultExpandAll={true}
        style={{ width: '100%' }}
      >
        {
          loadTree(tree)
        }
      </DirectoryTree>
    </Fragment>
  )
}

export default ComTree
