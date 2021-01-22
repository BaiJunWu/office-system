import React, { Component } from 'react';
import { Form, Input } from 'antd';

class CForm extends Component {
  renderFormItem = (item) => {
    return (
      <Form.Item key={item.name} {...item}>
        {item.component || <Input {...item} key={item.name} />}
      </Form.Item>
    );
  };
  render() {
    const { formItem, layout, form, ...formProps } = this.props;
    const formItems = formItem.map((item) => this.renderFormItem(item));
    return (
      <Form form={form} {...formProps} {...layout}>
        {formItems}
      </Form>
    );
  }
}

export default CForm;
