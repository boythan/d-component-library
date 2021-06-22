import React from "react";
import { AwesomeListComponentProps, IPaging } from "../list/awesomeList/AwesomeListComponent";
import { SelectProps } from "./Select";
export interface SelectInfinityProps extends Omit<AwesomeListComponentProps, "source" | "renderItem">, SelectProps {
    source?: (params: any, paging: IPaging) => Promise<any>;
}
export interface SelectInfinityMethod {
    onBlur: () => void;
    onFocus: () => void;
    onRefresh: () => void;
}
declare const _default: React.ForwardRefExoticComponent<SelectInfinityProps & React.RefAttributes<SelectInfinityMethod>>;
export default _default;
