import { pathToRegexp } from 'path-to-regexp';
import { request } from 'umi';

export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(pathname);
}

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

export function BuildDate(aDate) {
  if (aDate == '' || aDate == null || typeof aDate == 'undefined') {
    return new Date();
  } else if (typeof aDate == 'string') {
    switch (aDate.length) {
      case 14:
        aDate =
          aDate.substr(0, 4) +
          '/' +
          aDate.substr(4, 2) +
          '/' +
          aDate.substr(6, 2) +
          ' ' +
          aDate.substr(8, 2) +
          ':' +
          aDate.substr(10, 2) +
          ':' +
          aDate.substr(12, 2);
        break;
      case 8:
        aDate =
          aDate.substr(0, 4) +
          '/' +
          aDate.substr(4, 2) +
          '/' +
          aDate.substr(6, 2);
        break;
    }
    aDate = aDate
      .replace(/-/g, '/')
      .replace('年', '/')
      .replace('月', '/')
      .replace('日', '')
      .replace('时', ':')
      .replace('分', ':')
      .replace('秒', '');
    return new Date(aDate);
  } else {
    return aDate;
  }
}

export function FormatDate(aDate, aFormat) {
  aDate = BuildDate(aDate);
  if (typeof aFormat == 'undefined') aFormat = 'yyyy-MM-dd';
  var _date = aDate;

  var _week = ['日', '一', '二', '三', '四', '五', '六'];
  aFormat = aFormat.replace(/yyyy|YYYY/, _date.getFullYear());
  aFormat = aFormat.replace(/yy|YY/, ('' + _date.getYear()).substr(2, 2));

  var _month = '00' + (_date.getMonth() + 1);
  aFormat = aFormat.replace(/MM/, _month.substr(_month.length - 2, 2));
  aFormat = aFormat.replace(/M/g, _date.getMonth() + 1);

  aFormat = aFormat.replace(/w|W/g, _week[_date.getDay()]);

  var _day = '00' + _date.getDate();
  aFormat = aFormat.replace(/dd|DD/, _day.substr(_day.length - 2, 2));
  aFormat = aFormat.replace(/d|D/g, _date.getDate());

  var _hour = '00' + _date.getHours();
  aFormat = aFormat.replace(/hh|HH/, _hour.substr(_hour.length - 2, 2));
  aFormat = aFormat.replace(/h|H/g, _date.getHours());

  var _minute = '00' + _date.getMinutes();
  aFormat = aFormat.replace(/mm/, _minute.substr(_minute.length - 2, 2));
  aFormat = aFormat.replace(/m/g, _date.getMinutes());

  var _second = '00' + _date.getSeconds();
  aFormat = aFormat.replace(/ss|SS/, _second.substr(_second.length - 2, 2));
  aFormat = aFormat.replace(/s|S/g, _date.getSeconds());
  return aFormat;
}

export function pagination(data, callback) {
  return {
    onChange: (page, pageSize) => {
      callback(page, pageSize);
    },
    current: data.pageIndex || 1, // 当前页数
    pageSize: data.pageSize || 10, // 每页条数
    showSizeChanger: true,
    total: data.total || data.length,
    pageSizeOptions: [10, 20, 30, 50],
    showTotal: (total) => {
      return `共${total}条`;
    },
    position: ['none', 'bottomCenter'],
  };
}

//处理下载流
export function download(blob, fileName) {
  const url = window.URL.createObjectURL(blob); //URL.createObjectURL(object)表示生成一个File对象或Blob对象  ,{type: 'application/zip'}
  let link = document.createElement('a'); //设置一个隐藏的a标签，href为输出流，设置download
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', fileName); //指示浏览器下载url,而不是导航到它；因此将提示用户将其保存为本地文件
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href); //销毁url对象
}
