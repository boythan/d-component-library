import React from "react";
import { DatePickerProps } from "antd";
export declare type TDateFormat = "DD/MM/YYYY HH:mm" | "DD/MM/YYYY" | "MM/YYYY" | "YYYY";
export interface DateInputNewProps {
    type?: "date" | "week" | "month" | "quarter" | "year";
    outline?: boolean;
    label?: string;
    showTime?: boolean;
    format?: TDateFormat;
    variant?: "single" | "range";
}
export declare type DateInputProp = DatePickerProps & DateInputNewProps;
declare const DateInput: React.FC<DateInputProp>;
export default DateInput;
