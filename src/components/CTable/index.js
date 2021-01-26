import React, { Fragment } from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import style from './index.less';

const CTable = (props) => {
  const { columns = [], ...tableProps } = props;
  const handleMenu_Click = (key, item, record) => {
    let index = item.findIndex((_) => _.key == key);
    item[index].func(record);
  };
  const MoreBtn = ({ result, record }) => {
    return (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => handleMenu_Click(key, result, record)}>
            {result.map((item) => {
              return <Menu.Item key={item.key}>{item.name}</Menu.Item>;
            })}
          </Menu>
        }
      >
        <a>
          更多 <DownOutlined />
        </a>
      </Dropdown>
    );
  };
  const btnList = (data, record) => {
    let btn = [];
    if (data.length <= 2) {
      data.forEach((item) => {
        btn.push(
          <Button type="link" key={item.key} onClick={() => item.func(record)}>
            {item.name}
          </Button>,
        );
      });
    } else {
      let result = data.filter((item, index) => index >= 1);
      btn.push(
        <Button
          type="link"
          key={data[0].key}
          onClick={() => data[0].func(record)}
        >
          {data[0].name}
        </Button>,
        <MoreBtn key="2" result={result} record={record} />,
      );
    }
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
    <Table className={style.table} bordered columns={tempArr} {...tableProps} />
  );
};

export default CTable;
