import React, { Component } from 'react';
import { history } from 'umi';
import { Button, Result } from 'antd';
class NotFound extends Component {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.push('/');
            }}
          >
            Back Home
          </Button>
        }
      />
    );
  }
}

export default NotFound;
