import React, { PureComponent, Fragment } from 'react';
import { connect } from 'umi';
import { Button, Row, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import config from 'utils/config';

import styles from './index.less';
const FormItem = Form.Item;

class Login extends PureComponent {
  formRef = React.createRef();
  handleOk = () => {
    const { dispatch } = this.props;
    const { validateFields } = this.formRef.current;
    validateFields().then((value) => {
      dispatch({ type: 'login/login', payload: value });
    });
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <Form ref={this.formRef}>
            <FormItem
              hasFeedback
              name="loginAccount"
              rules={[{ required: true, message: '用户名不可为空' }]}
            >
              <Input
                autoFocus
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                size="large"
                onPressEnter={this.handleOk}
                placeholder="用户名"
              />
            </FormItem>
            <FormItem
              hasFeedback
              name="loginPrincipal"
              rules={[{ required: true, message: '密码不可为空' }]}
            >
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                size="large"
                onPressEnter={this.handleOk}
                placeholder="密码"
              />
            </FormItem>
            <Row>
              <Button type="primary" size="large" onClick={this.handleOk}>
                登录
              </Button>
            </Row>
          </Form>
        </div>
      </Fragment>
    );
  }
}
export default connect(({ login, loading }) => ({ login, loading }))(Login);
