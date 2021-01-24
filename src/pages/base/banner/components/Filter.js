import React from 'react';
import { Button, Row } from 'antd';

function Filter(props) {
  const { dispatch } = props;
  const handleAdd_Click = () => {
    dispatch({
      type: `banner/handleModalVisible`,
      payload: {
        modalVisible: true,
      },
    });
  };
  return (
    <Row
      style={{ marginBottom: '10px' }}
      type="flex"
      align="middle"
      justify="end"
    >
      <Button type="primary" onClick={handleAdd_Click}>
        创建
      </Button>
    </Row>
  );
}

export default Filter;
