import React, { PureComponent, Fragment } from 'react'
import { connect } from 'umi'
import { Button, Row, Form, Icon, Input } from 'antd'
import config from 'utils/config'

import styles from './index.less'
const FormItem = Form.Item

class Login extends PureComponent {
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('loginAccount', { // loginAccount  userName
                rules: [
                  {
                    required: true,
                    message: "用户名不可为空"
                  },
                ],
              })(
                <Input autoFocus prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  size="large" onPressEnter={this.handleOk} placeholder='用户名' />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('loginPrincipal', { //loginPrincipal pwd
                rules: [
                  {
                    required: true,
                    message: "密码不可为空"
                  },
                ],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password" size="large" onPressEnter={this.handleOk} placeholder='密码' />
              )}
            </FormItem>
            <Row>
              <Button type="primary" size='large' onClick={this.handleOk}>登录</Button>
            </Row>
          </form>
        </div>
      </Fragment>
    )
  }
}

Login = Form.create()(Login);
export default connect(({ login, loading }) => ({ login, loading }))(Login)