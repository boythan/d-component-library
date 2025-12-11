/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import ClassNames from "classnames";
import React, { DOMAttributes, ReactElement } from "react";
import Avatar, { AvatarProps } from "./Avatar";

export interface IUserBasic {
    fullName?: string;
    avatar?: string | null;
    name?: string;
    lastName?: string;
}

export interface AvatarNameProps {
    user: IUserBasic;
    position?: "before" | "after";
    size?: AvatarProps["size"];
    variant?: AvatarProps["variant"];
    subLabel?: string;
    className?: string;
    classNameTextWrap?: string;
    classNameText?: string;
    classNameSub?: string;
    customName?: ((props: { className: string; name: string }) => any) | Element | ReactElement;
    onClick?: DOMAttributes<any>["onClick"];
    avatarProps?: AvatarProps;
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
    onClick,
    variant,
    avatarProps = {},
}) => {
    const { avatar, fullName, name = "", lastName } = user;
    let displayName = name;
    if (fullName) {
        displayName = fullName;
    }

    const wrapperClass = ClassNames("flex items-center", className);
    const textClass = ClassNames(
        "flex flex-col",
        {
            "mr-2": position === "before",
            "ml-2": position === "after",
        },
        classNameTextWrap
    );
    const nameTextClass = ClassNames(
        "whitespace-nowrap font-medium",
        {
            "text-4xl": size === "large", // Adjusted approx
            "text-2xl": size === "medium",
            "text-base": size === "small",
            "text-sm": size === "x-small",
            "text-xs": size === "xx-small",
        },
        classNameText
    );

    const subTextClass = ClassNames(
        "text-gray-500",
        {
            "text-lg": size === "large",
            "text-sm": size === "medium",
            "text-xs": size === "small" || size === "x-small" || size === "xx-small",
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
            return <div className={`${nameTextClass}`}>{displayName}</div>;
        };
        return (
            <div className={textClass}>
                {renderName()}
                {subLabel && <div className={subTextClass}>{subLabel}</div>}
            </div>
        );
    };
    return (
        <div className={wrapperClass} onClick={onClick}>
            {position === "before" && renderText()}
            {avatar && <Avatar src={avatar} size={size} variant={variant} {...avatarProps} />}
            {!avatar && (
                <Avatar
                    text={displayName.charAt(0)}
                    secondText={lastName}
                    size={size}
                    variant={variant}
                    {...avatarProps}
                />
            )}
            {position === "after" && renderText()}
        </div>
    );
};

export default AvatarName;
