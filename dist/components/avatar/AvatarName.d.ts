import React from "react";
import { AvatarProps } from "./Avatar";
export interface IUserBasic {
    fullName: string;
    avatar?: string | null;
    [key: string]: any;
}
export interface AvatarNameProps {
    [key: string]: any;
    user: IUserBasic;
    position?: "before" | "after";
    size?: AvatarProps["size"];
    subLabel?: string;
    className?: string;
    classNameText?: string;
}
declare const AvatarName: React.FC<AvatarNameProps>;
export default AvatarName;
