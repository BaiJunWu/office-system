import React from 'react';
import { Button, Row, Col, Form } from 'antd';
import CSelect from 'components/CSelect';

function Filter(props) {
  const { permission, handleSelect_Change, handleAddList_Click } = props;
  const { userList } = permission;
  const selectProps = {
    style: { width: 200 },
    data: userList,
    placeholder: '选择用户',
    id: 'userId',
    name: 'userName',
    onChange: (key) => handleSelect_Change(key),
  };
  return (
    <Row
      style={{ marginBottom: '10px' }}
      align="middle"
      justify="space-between"
    >
      <Col>
        <Form.Item label="用户：" style={{ margin: 0 }}>
          <CSelect {...selectProps} />
        </Form.Item>
      </Col>
      <Col>
        <Button type="primary" onClick={handleAddList_Click}>
          提交
        </Button>
      </Col>
    </Row>
  );
}

export default Filter;
