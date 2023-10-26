import React from "react";
import { AutoComplete } from "antd";

const options = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

const ListsPrompt = () => {
  return (
    <AutoComplete
      style={{ width: 200 }}
      options={options}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  );
};

export default ListsPrompt;
