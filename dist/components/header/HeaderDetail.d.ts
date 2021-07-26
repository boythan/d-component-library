import React, { CSSProperties } from "react";
import { ButtonProps } from "../button/Button";
import { IUserBasic } from "../avatar/AvatarName";
import { ViewLabelStatusProps } from "../view/ViewLabelStatus";
export interface IStatusItem {
    id: string;
    label: string;
    color?: string;
    [key: string]: any;
}
interface IButtonItem {
    id: string;
    label: string;
    icon: string;
}
export interface HeaderDetailProps {
    [key: string]: any;
    title?: string;
    listStatus?: Array<IStatusItem>;
    listButton?: Array<IButtonItem>;
    buttonProps?: ButtonProps;
    status?: string;
    created?: number;
    user?: IUserBasic;
    customRight?: () => React.ReactNode;
    onButtonClick?: (item: IButtonItem) => void;
    customCreated?: (props?: any) => any;
    customStatus?: (status?: any) => any;
    viewStatusProps?: ViewLabelStatusProps;
    style?: CSSProperties;
    className?: string;
    classNameButton?: string;
    classNameStatus?: string;
    Messages: any;
}
declare const HeaderDetail: React.FC<HeaderDetailProps>;
export default HeaderDetail;
