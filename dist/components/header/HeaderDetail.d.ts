import React from "react";
import { IUserBasic } from "../avatar/AvatarName";
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
    status?: string;
    created?: number;
    user?: IUserBasic;
    customRight?: () => React.ReactNode;
    onButtonClick?: (item: IButtonItem) => void;
    Messages?: any;
}
declare const HeaderDetail: React.FC<HeaderDetailProps>;
export default HeaderDetail;
