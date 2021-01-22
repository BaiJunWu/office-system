import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class Category extends Component {
  onFinish = (values) => {
    const { dispatch, app, category } = this.props;
    const { record } = category;
    const { appId } = app;
    const { productCategoryImagePath } = values;
    if (record) {
      if (typeof productCategoryImagePath === 'string') {
        values.productCategoryImagePath = productCategoryImagePath;
      } else if (typeof productCategoryImagePath === 'object') {
        values.productCategoryImagePath =
          productCategoryImagePath[0].response.response.destinationFileName;
      } else {
        values.productCategoryImagePath = '';
      }
      values.productCategoryId = record.productCategoryId;
      values.appId = appId;
      dispatch({
        type: 'category/edit',
        payload: {
          ...values,
        },
      });
    } else {
      if (productCategoryImagePath) {
        values.productCategoryImagePath =
          productCategoryImagePath[0].response.response.destinationFileName;
      } else {
        values.productCategoryImagePath = '';
      }
      values.appId = appId;
      dispatch({
        type: 'category/add',
        payload: {
          ...values,
        },
      });
    }
  };
  render() {
    const { dispatch, category, loading } = this.props;
    let modal = {
      dispatch,
      category,
      loading,
      onFinish: this.onFinish,
    };
    return (
      <Page inner>
        <Filter {...modal} />
        <List {...modal} />
        <Modal {...modal} />
      </Page>
    );
  }
}

export default connect(({ category, app, loading }) => ({
  category,
  app,
  loading,
}))(Category);
