import React, { useMemo } from 'react';
import { Tabs } from 'antd';
import Img from './Img';
import Detail from './Detail';
import Type from './Type';
import Price from './Price';
const { TabPane } = Tabs;

function Plugn(props) {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="商品图片" key="1">
          <Img {...props} />
        </TabPane>
        <TabPane tab="商品详情" key="2">
          <Detail {...props} />
        </TabPane>
        <TabPane tab="规格型号" key="3">
          <Type {...props} />
        </TabPane>
        <TabPane tab="商品价格" key="4">
          <Price {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Plugn;
