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
  const { dispatch, goodinfo, app } = props;
  const { itemList } = goodinfo;
  const onFinish = (values) => {
    if (record) {
      let data = [];
      deepCopy(data, itemList);
      data.forEach((item) => {
        if (item.productItemId === record.productItemId) {
          item.isPrice = checked ? 1 : 0;
          item.caption = values.caption;
          item.maxCount = values.maxCount;
          item.valueList = valueList;
        }
      });
      if (valueList.length < 1) {
        message.error('型号不能为空');
        return;
      }
      dispatch({
        type: 'goodinfo/handleImageList',
        payload: {
          itemList: data,
        },
      });
      setModalVisible(false);
      setRecord(null);
    } else {
      // 添加
      let data = [];
      deepCopy(data, itemList);
      values.appId = app.appId;
      values.isPrice = checked ? 1 : 0;
      values.valueList = valueList;
      values.productItemId = uuidv1();
      data.push(values);
      if (valueList.length < 1) {
        message.error('型号不能为空');
        return;
      }
      dispatch({
        type: 'goodinfo/handleImageList',
        payload: {
          itemList: data,
        },
      });
      setModalVisible(false);
      setRecord(null);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onEditItem = (record) => {
    setChecked(record.isPrice == 1 ? true : false);
    setList(record.valueList);
    setRecord(record);
    setModalVisible(true);
  };
  const onDeleteItem = (record) => {
    Modal.confirm({
      title: '您确定要删除这条记录吗？',
      onOk: () => {
        let data = [];
        deepCopy(data, itemList);
        let index = data.findIndex(
          (_) => _.productItemId === record.productItemId,
        );
        data.splice(index, 1);
        dispatch({
          type: 'goodinfo/handleImageList',
          payload: {
            itemList: data,
          },
        });
      },
    });
  };
  const handleDelete = (key) => {
    let data = [];
    deepCopy(data, valueList);
    setList(data.filter((item) => item.productItemValueId !== key));
  };
  const tableProps = {
    size: 'model',
    menuOptions: [
      { key: '1', name: '修改', func: onEditItem },
      { key: '2', name: '删除', func: onDeleteItem },
    ],
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
              onConfirm={() => handleDelete(record.productItemValueId)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ],
    id: 'productItemValueId',
    dataSource: valueList,
    rowKey: (record) => record.productItemValueId,
    // pagination: pagination(valueList, (pageIndex, pageSize) => {
    //   console.log(pageIndex);
    //   console.log(pageSize);
    // }),
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
    onFinish,
    onFinishFailed,
  };
  // 弹出框对象
  const modalProps = {
    title: '创建规格型号',
    centered: true,
    maskClosable: false,
    visible: modalVisible,
    setModalVisible,
    setRecord,
    record,
    setList,
    formProps,
    component: () => <CTable2 {...tableProps2} />,
  };
  const handleImage_Click = () => {
    setModalVisible(true);
  };
  return (
    <Fragment>
      <Row style={{ marginBottom: '10px' }} align="middle" justify="end">
        <Button type="primary" onClick={handleImage_Click}>
          创建
        </Button>
      </Row>
      <CTable {...tableProps} />
      <CModal {...modalProps} />
    </Fragment>
  );
}

export default Type;
