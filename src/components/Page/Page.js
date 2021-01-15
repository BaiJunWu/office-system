import React, { Component } from 'react';
import classnames from 'classnames';
import Loader from '../Loader';
import styles from './Page.less';

export default class Page extends Component {
  render() {
    const { className, children, loading = false, inner = false } = this.props;
    return (
      <div
        className={classnames(className, {
          [styles.contentInner]: inner,
        })}
      >
        {loading ? <Loader spinning /> : ''}
        {children}
      </div>
    );
  }
}
