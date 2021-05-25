import { DatePickerProps } from "antd";
import React from "react";
export declare type TDateFormat = "DD/MM/YYYY HH:mm" | "DD/MM/YYYY" | "MM/YYYY" | "YYYY";
export interface DateInputNewProps {
    type?: "date" | "week" | "month" | "quarter" | "year";
    outline?: boolean;
    label?: string;
    showTime?: boolean;
    format?: TDateFormat;
    isRangePicker?: boolean;
    variant?: "standard" | "outline";
    error?: string;
}
export declare type DateInputProp = DatePickerProps & DateInputNewProps;
declare const DateInput: React.FC<DateInputProp>;
export default DateInput;
