import React, { Component } from 'react';
import { connect } from 'umi';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import Modal from './components/Modal';

class Banner extends Component {
  onFinish = (values) => {
    const { dispatch, banner } = this.props;
    const { record } = banner;
    if (record) {
      const { bannerPath, bannerUrl } = values;
      if (typeof bannerPath === 'string') {
        values.bannerPath = bannerPath;
      } else if (typeof bannerPath === 'object') {
        values.bannerPath = bannerPath[0].response.response.destinationFileName;
      } else {
        values.bannerPath = '';
      }
      if (bannerUrl) {
        values.bannerUrl = bannerUrl;
      } else {
        values.bannerUrl = '';
      }
      dispatch({
        type: 'banner/edit',
        payload: {
          bannerId: record.bannerId,
          ...values,
        },
      });
    } else {
      const { bannerPath, bannerUrl } = values;
      if (bannerPath) {
        values.bannerPath = bannerPath[0].response.response.destinationFileName;
      } else {
        values.bannerPath = '';
      }
      if (bannerUrl) {
        values.bannerUrl = url;
      } else {
        values.bannerUrl = '';
      }
      dispatch({
        type: 'banner/add',
        payload: {
          ...values,
        },
      });
    }
  };
  render() {
    const { dispatch, banner, loading } = this.props;
    let modal = {
      loading,
      dispatch,
      banner,
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

export default connect(({ banner, loading }) => ({ banner, loading }))(Banner);
