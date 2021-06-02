import React from "react";
import { ButtonProps } from "../../button/Button";
export interface PopoverListProps extends ButtonProps {
    source: (paging: any) => Promise<any>;
    transformer: (data: any) => any;
    renderItem?: (item: any, index: any) => React.ReactNode;
    setRef?: (ref: any) => void;
    onChange?: (value: any) => void;
    customView?: () => React.ReactNode | React.ReactNode;
    onClickItem?: (item: any, index: any) => void;
    onCreateNew?: () => void;
    buttonText?: string;
    buttonIconName?: ButtonProps["iconName"];
    buttonVariant?: ButtonProps["variant"];
    isClickOpen?: boolean;
    placeHolder?: string;
    loadMoreText?: string;
}
declare const PopoverList: React.FC<PopoverListProps>;
export default PopoverList;
