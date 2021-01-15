import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter } from 'umi';
import style from './Bread.less';

class Bread extends Component {
  generateBreadcrumbs = (location, menuList) => {
    let breadList = [];
    menuList.map((item, index) => {
      if (item.menuUrl === location.pathname) {
        for (const item2 of menuList) {
          if (item.menuParentId === item2.menuId) {
            breadList.push(
              <Breadcrumb.Item key={item2.menuId}>
                {item2.menuName}
              </Breadcrumb.Item>,
            );
          }
        }
        breadList.push(
          <Breadcrumb.Item key={item.menuId}>{item.menuName}</Breadcrumb.Item>,
        );
      }
    });
    return breadList;
  };
  render() {
    const { location, model } = this.props;
    return (
      <Breadcrumb className={style.bread}>
        {this.generateBreadcrumbs(location, model.menuList)}
      </Breadcrumb>
    );
  }
}

export default withRouter(Bread);
