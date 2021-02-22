import React from 'react';
import { Button, Row, Col, Form, Modal, message } from 'antd';

function Filter(props) {
  const { dispatch, top } = props;
  const { selectProductList, pageIndex, pageSize } = top;
  const [form] = Form.useForm();
  const formProps = {
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    },
  };

  const ColProps = {
    xs: 24,
    sm: 12,
    style: {
      marginBottom: 16,
    },
  };
  const handleAdd_Click = () => {
    dispatch({
      type: `top/handleModalVisible`,
      payload: {
        modalVisible: true,
        pageIndex: 1,
        pageSize: 10,
      },
    });
  };
  const handleDelete_Click = () => {
    Modal.confirm({
      title: '您确定要删除记录吗？',
      onOk: () => {
        if (selectProductList.length == 0) {
          message.error('未选择商品');
          return;
        }
        dispatch({
          type: `top/recommendedGoods`,
          payload: {
            recommendedProduct: '0',
            productIdList: selectProductList,
            pageIndex,
            pageSize,
          },
        });
      },
    });
  };
  return (
    <Form form={form} {...formProps}>
      <Row gutter={24}>
        <Col
          {...ColProps}
          xl={{ span: 24 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="end">
            <Form.Item>
              <Button
                type="primary"
                style={{ marginRight: '10px' }}
                onClick={handleAdd_Click}
              >
                畅销
              </Button>
              <Button
                style={{ marginRight: '10px' }}
                onClick={handleDelete_Click}
              >
                删除
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}

export default Filter;
