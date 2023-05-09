import React from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const getToday = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let retval = dd + "/" + mm + "/" + yyyy;
  return retval;
};


interface IProps {
  onChange: (dateString:string) => void;
}

const InputDate = (props: IProps) => {
  const { onChange } = props;
  return (
    <DatePicker
      defaultValue={dayjs(getToday(), dateFormatList[0])}
      format={dateFormatList}
      className="w-42 bg-stone-100 text-xl text-stone-900 font-medium border-0 shadow-none"
      onChange={(e:any) => {onChange(e.$d)}}
    />
  );
};

export default InputDate;
