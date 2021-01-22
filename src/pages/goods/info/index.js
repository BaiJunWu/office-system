import React, { Component } from 'react';
import { connect } from 'umi';
import { message } from 'antd';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class GoodsInfo extends Component {
  onFinish = (values) => {
    const { dispatch, goodinfo } = this.props;
    const { record, imageList, itemList, detailList, priceList } = goodinfo;
    const { productName, categoryCode, pageIndex, pageSize } = goodinfo;
    if (record) {
      const { productPath, url, productOrder } = values;
      if (typeof productPath === 'string') {
        values.productPath = productPath;
      } else if (typeof productPath === 'object') {
        values.productPath =
          productPath[0].response.response.destinationFileName;
      } else {
        values.productPath = '';
      }
      if (url) {
        values.url = url;
      } else {
        values.url = '';
      }
      if (productOrder) {
        values.productOrder = productOrder;
      } else {
        values.productOrder = '';
      }
      values.productId = record.productId;
      const data = {
        ...values,
        imageList,
        itemList,
        detailList,
        priceList,
      };
      dispatch({
        type: 'goodinfo/edit',
        payload: {
          ...data,
          search: {
            productName,
            categoryCode,
            pageIndex,
            pageSize,
          },
        },
      });
    } else {
      const { productPath, url, productOrder } = values;
      if (productPath) {
        values.productPath =
          productPath[0].response.response.destinationFileName;
      } else {
        values.productPath = '';
      }
      if (url) {
        values.url = url;
      } else {
        values.url = '';
      }
      if (productOrder) {
        values.productOrder = productOrder;
      } else {
        values.productOrder = '';
      }
      const data = {
        ...values,
        imageList,
        itemList,
        detailList,
        priceList,
      };
      if (data.itemList.length < 1) {
        message.error('规格型号不能为空');
        return;
      }
      if (data.priceList.length < 1) {
        message.error('商品价格不能为空');
        return;
      }
      dispatch({
        type: 'goodinfo/add',
        payload: {
          ...data,
          search: {
            productName,
            categoryCode,
            pageIndex,
            pageSize,
          },
        },
      });
    }
  };
  render() {
    const { dispatch, app, goodinfo, loading } = this.props;
    let modal = {
      dispatch,
      goodinfo,
      loading,
      app,
      onFinish: this.onFinish,
    };
    return (
      <Page inner>
        <Modal {...modal} />
        <Filter {...modal} />
        <List {...modal} />
      </Page>
    );
  }
}

export default connect(({ goodinfo, app, loading }) => ({
  goodinfo,
  app,
  loading,
}))(GoodsInfo);
