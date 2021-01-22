import { Pagination } from 'antd';

export function deepCopy(newobj, oldobj) {
  for (var k in oldobj) {
    // 判断我们的属性值属于那种数据类型
    // 1. 获取属性值  oldobj[k]
    var item = oldobj[k];
    // 2. 判断这个值是否是数组
    if (item instanceof Array) {
      newobj[k] = [];
      deepCopy(newobj[k], item);
    } else if (item instanceof Object) {
      // 3. 判断这个值是否是对象
      newobj[k] = {};
      deepCopy(newobj[k], item);
    } else {
      // 4. 属于简单数据类型
      newobj[k] = item;
    }
  }
}

// 排序
export function compare(prop) {
  return function (a, b) {
    let v1 = a[prop],
      v2 = b[prop];
    return v1 - v2;
  };
}

export function arrayToTree(
  array,
  id = 'id',
  parentId = 'pid',
  children = 'children',
) {
  const result = [];
  const hash = {};
  const data = JSON.parse(JSON.stringify(array));
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    const hashParent = hash[item[parentId]];
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = []);
      hashParent[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

export function pagination(data, callback) {
  return {
    onChange: (page, pageSize) => {
      callback(page, pageSize);
    },
    current: data.pageIndex, // 当前页数
    pageSize: data.pageSize, // 每页条数
    showSizeChanger: true,
    total: data.total,
    pageSizeOptions: [10, 20, 50, 100],
    showTotal: (total) => {
      return `共${total}条`;
    },
    position: ['none', 'bottomCenter'],
  };
}
