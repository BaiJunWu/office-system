import React from 'react';
import { Button, Row } from 'antd';

function Filter(props) {
  const { dispatch } = props;
  const handleAddList_Click = () => {
    dispatch({
      type: `menu/handleModalVisible`,
      payload: {
        modalVisible: true,
      },
    });
  };
  return (
    <Row style={{ marginBottom: '10px' }} align="middle" justify="end">
      <Button type="primary" onClick={handleAddList_Click}>
        创建
      </Button>
    </Row>
  );
}

export default Filter;
