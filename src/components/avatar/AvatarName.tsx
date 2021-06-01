import React from "react";
import ClassNames from "classnames";
import Avatar, { AvatarProps } from "./Avatar";

export interface IUserBasic {
    fullName?: string;
    avatar?: string | null;
    name?: string;
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

const AvatarName: React.FC<AvatarNameProps> = ({
    user,
    position = "before",
    size = "x-small",
    subLabel,
    className,
    classNameText,
}) => {
    const { avatar, fullName, name = "" } = user;
    let displayName = name;
    if (fullName) {
        displayName = fullName;
    }

    const wrapperClass = ClassNames(`d-flex align-items-center`, className);
    const nameClass = ClassNames("d-flex flex-column", {
        "mr-2": position === "before",
        "ml-2": position === "after",
    });
    const nameTextClass = ClassNames(
        "text-nowrap",
        {
            "text-large font-weight-bold": size === "large" || size === "x-large",
            "text-medium": size === "medium",
            "text-small": size === "small",
            "text-x-small": size === "x-small",
            "text-xx-small": size === "xx-small",
        },
        classNameText
    );

    const renderName = () => {
        return (
            <div className={nameClass}>
                <div className={`${nameTextClass}`}>{displayName}</div>
                {subLabel && <div className="text-x-small">{subLabel}</div>}
            </div>
        );
    };
    return (
        <div className={wrapperClass}>
            {position === "before" && renderName()}
            {avatar && <Avatar src={avatar} size={size} />}
            {!avatar && <Avatar text={displayName.charAt(0)} size={size} />}
            {position === "after" && renderName()}
        </div>
    );
};

export default AvatarName;
