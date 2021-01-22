import React, { useEffect, useState, useRef, useContext } from 'react';
import { Button, Table, Form, Input } from 'antd';
import { v1 as uuidv1 } from 'uuid';
import { deepCopy } from 'utils/common';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    const values = await form.validateFields();
    toggleEdit();
    handleSave({ ...record, ...values });
  };
  const focus = async () => {
    try {
      // const values = await form.validateFields();
      // form.setFieldsValue({
      //   value: '',
      //   productCodeErp: '',
      //   sku: '',
      //   skuType: '',
      // })
      inputRef.current.focus({
        cursor: 'all',
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `不能为空`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          onFocus={focus}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function CTable(props) {
  const {
    record,
    columns = [],
    appId,
    setList,
    type,
    id,
    ...tableProps
  } = props;
  const handleAddValueList_Click = () => {
    if (type == 'type') {
      const newData = {
        value: '点击这里填写型号',
        [id]: uuidv1(),
        appId,
      };
      let data = [];
      deepCopy(data, props.dataSource);
      data.push(newData);
      setList(data);
    } else {
      const newData = {
        productCodeErp: '填写erp编码',
        sku: '填写库存',
        skuType: 0,
        [id]: uuidv1(),
        appId,
      };
      let data = [];
      deepCopy(data, props.dataSource);
      data.push(newData);
      setList(data);
    }
  };

  const handleSave = (row) => {
    const newData = [...props.dataSource];
    const index = newData.findIndex((item) => row[id] === item[id]);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setList(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const data = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  return (
    <div>
      <Button type="primary" onClick={handleAddValueList_Click}>
        增加
      </Button>
      <Table components={components} bordered columns={data} {...tableProps} />
    </div>
  );
}

export default CTable;
