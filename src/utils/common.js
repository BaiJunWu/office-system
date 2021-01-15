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
    total: data.total,
    pageSizeOptions: [10, 20, 50, 100],
    showTotal: (total) => {
      return `共${total}条`;
    },
    position: ['none', 'bottomCenter'],
  };
}
