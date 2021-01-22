import React from 'react';
import { Select } from 'antd';

function CSelect(props) {
  const { id, name, data, ...selectProps } = props;
  const addValueAndLabel = (Option, array, value, label) => {
    if (array instanceof Array) {
      return array.map((item) => {
        if (item[value] !== null) {
          return (
            <Option value={item[value]} key={item[value]}>
              {item[label]}
            </Option>
          );
        }
      });
    } else if (array instanceof Object) {
      return (
        <Option value={array[value]} key={array[value]}>
          {array[label]}
        </Option>
      );
    } else {
      return null;
    }
  };
  return (
    <Select {...selectProps}>
      {addValueAndLabel(Select.Option, data, id, name)}
    </Select>
  );
}

export default CSelect;
