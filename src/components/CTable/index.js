import React, { Fragment } from 'react';
import { Table, Button } from 'antd';
import style from './index.less';

const CTable = (props) => {
  const { columns = [], ...tableProps } = props;
  const btnList = (data, record) => {
    let btn = [];
    data.forEach((item) => {
      if (item.name === '删除') {
        btn.push(
          <Button
            type="text"
            danger
            key={item.key}
            onClick={() => item.func(record)}
          >
            {item.name}
          </Button>,
        );
        return;
      }
      btn.push(
        <Button type="text" key={item.key} onClick={() => item.func(record)}>
          {item.name}
        </Button>,
      );
    });
    return btn;
  };
  const resolveTableColumns = (data) => {
    return data.map((item) => {
      const { type } = item;
      if (type === 'Operation') {
        item.render = (text, record) => {
          const { menuOptions = [] } = tableProps;
          return btnList(menuOptions, record);
        };
      }
      return item;
    });
  };
  const tempArr = resolveTableColumns(columns);
  return (
    <Fragment>
      <Table
        className={style.table}
        bordered
        columns={tempArr}
        {...tableProps}
      />
    </Fragment>
  );
};

export default CTable;
