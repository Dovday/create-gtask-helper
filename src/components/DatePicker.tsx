import React from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";
const weekFormat = "MM/DD";

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const customFormat: DatePickerProps["format"] = (value) =>
  `custom format: ${value.format(dateFormat)}`;

const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
  `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
    .endOf("week")
    .format(weekFormat)}`;

const getToday = () => {
    let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let retval = dd + "/" + mm + "/" + yyyy;
  return retval;
};

const InputDate: React.FC = () => (
  <DatePicker
    defaultValue={dayjs(getToday(), dateFormatList[0])}
    format={dateFormatList}
    className="w-42 bg-stone-100 text-left text-xl text-stone-900 tracking-wide border-0 focus:border-b-2 focus:border-b-blue-600 focus:shadow-none"
    // onChange={(date, dateString) => {console.log(date, dateString)}}
  />
);

export default InputDate;
