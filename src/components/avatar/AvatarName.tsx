/* eslint-disable no-nested-ternary */
import React, { ReactElement } from "react";
import ClassNames from "classnames";
import Avatar, { AvatarProps } from "./Avatar";

export interface IUserBasic {
    fullName?: string;
    avatar?: string | null;
    name?: string;
    [key: string]: any;
}

export interface AvatarNameProps {
    user: IUserBasic;
    position?: "before" | "after";
    size?: AvatarProps["size"];
    subLabel?: string;
    className?: string;
    classNameTextWrap?: string;
    classNameText?: string;
    classNameSub?: string;
    customName?: ((props: { className: string; name: string }) => any) | Element | ReactElement;
}

const AvatarName: React.FC<AvatarNameProps> = ({
    user,
    position = "after",
    size = "x-small",
    subLabel,
    className,
    classNameText,
    classNameSub,
    classNameTextWrap,
    customName,
}) => {
    const { avatar, fullName, name = "" } = user;
    let displayName = name;
    if (fullName) {
        displayName = fullName;
    }

    const wrapperClass = ClassNames(`d-flex align-items-center`, className);
    const textClass = ClassNames(
        "d-flex flex-column",
        {
            "mr-2": position === "before",
            "ml-2": position === "after",
        },
        classNameTextWrap
    );
    const nameTextClass = ClassNames(
        "text-nowrap",
        {
            "h1 font-weight-normal": size === "large",
            "h3 font-weight-normal": size === "medium",
            "text-medium": size === "small",
            "text-small": size === "x-small",
            "text-x-small": size === "xx-small",
        },
        classNameText
    );

    const subTextClass = ClassNames(
        {
            "text-large": size === "large",
            "text-medium": size === "medium",
            "text-x-small": size === "small",
            "text-xx-small": size === "x-small" || size === "xx-small",
        },
        classNameSub
    );

    const renderText = () => {
        const renderName = () => {
            if (customName) {
                if (typeof customName === "function") {
                    return customName({ className: nameTextClass, name: displayName });
                }
                return customName;
            }
            return (
                <div
                    className={`${nameTextClass}`}
                    style={{
                        fontSize: size === "x-large" ? "56px" : undefined,
                        lineHeight: size === "x-large" ? "70px" : undefined,
                    }}
                >
                    {displayName}
                </div>
            );
        };
        return (
            <div className={textClass}>
                {renderName()}
                {subLabel && (
                    <div className={subTextClass} style={{ fontSize: size === "x-large" ? "32px" : undefined }}>
                        {subLabel}
                    </div>
                )}
            </div>
        );
    };
    return (
        <div className={wrapperClass}>
            {position === "before" && renderText()}
            {avatar && <Avatar src={avatar} size={size} />}
            {!avatar && <Avatar text={displayName.charAt(0)} size={size} />}
            {position === "after" && renderText()}
        </div>
    );
};

export default AvatarName;
