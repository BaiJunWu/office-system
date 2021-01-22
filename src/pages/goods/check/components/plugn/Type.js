import React, { Fragment, useState } from 'react';
import { Button, Row, Checkbox, Popconfirm, Modal, message } from 'antd';
import { v1 as uuidv1 } from 'uuid';
import CModal from './Modal';
import CTable from 'components/CTable';
import CTable2 from './Table';
import { deepCopy, pagination } from 'utils/common';

function Type(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(true);
  const [record, setRecord] = useState(null);
  const [valueList, setList] = useState([]);
  const { dispatch, check, app } = props;
  const { itemList } = check;
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onEditItem = (record) => {
    setChecked(record.isPrice == 1 ? true : false);
    setList(record.valueList);
    setRecord(record);
    setModalVisible(true);
  };
  const handleDelete = (key) => {
    let data = [];
    deepCopy(data, valueList);
    setList(data.filter((item) => item.key !== key));
  };
  const tableProps = {
    size: 'model',
    menuOptions: [{ key: '1', name: '详情', func: onEditItem }],
    columns: [
      {
        dataIndex: 'caption',
        title: '规格名称',
        align: 'center',
      },
      {
        dataIndex: 'maxCount',
        title: '最大显示个数',
        align: 'center',
      },
      {
        dataIndex: 'isPrice',
        title: '参与价格',
        align: 'center',
        render: (text) => (text === 1 ? '是' : '否'),
      },
      {
        dataIndex: 'operation',
        type: 'Operation',
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: 200,
      },
    ],
    dataSource: itemList,
    rowKey: (record) => record.productItemId,
    pagination: pagination(itemList, (pageIndex, pageSize) => {
      console.log(pageIndex);
      console.log(pageSize);
    }),
  };

  // 单元格
  const tableProps2 = {
    type: 'type',
    setList,
    appId: app.appId,
    size: 'model',
    columns: [
      {
        dataIndex: 'value',
        title: '型号',
        align: 'center',
        editable: true,
      },
      {
        dataIndex: 'operation',
        type: 'Operation',
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: 150,
        render: (_, record) =>
          valueList.length >= 1 ? (
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={(record) => handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ],
    id: 'productItemValueId',
    dataSource: valueList,
    rowKey: (record) => record.productItemValueId,
    pagination: pagination(valueList, (pageIndex, pageSize) => {
      console.log(pageIndex);
      console.log(pageSize);
    }),
  };
  const formProps = {
    name: 'type',
    layout: {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    },
    formItem: [
      {
        label: '规格名称',
        name: 'caption',
        placeholder: '规格名称',
        rules: [{ required: true, message: '规格名称不能为空' }],
      },
      {
        label: '最大显示个数',
        name: 'maxCount',
        placeholder: '最大显示个数',
      },
      {
        label: '参与价格',
        name: 'isPrice',
        component: (
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          >
            参与价格
          </Checkbox>
        ),
      },
    ],
    onFinishFailed,
  };
  // 弹出框对象
  const modalProps = {
    title: '创建规格型号',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    footer: null,
    setModalVisible,
    setRecord,
    record,
    setList,
    formProps,
    component: () => <CTable2 {...tableProps2} />,
  };

  return (
    <Fragment>
      <CTable {...tableProps} />
      <CModal {...modalProps} />
    </Fragment>
  );
}

export default Type;
