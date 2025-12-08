/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// react
import React from "react";

// third-party
import classname from "classnames";
import { Input } from "antd";

// application
import Icon from "../elements/icon/Icon";

export interface InputTextSearchProps {
    className?: string;

    variant?: "standard" | "outline";

    value?: string;
    defaultValue?: string;
    error?: string;

    placeholder?: string;

    disabled?: boolean;
    hidden?: boolean;

    // Style props
    style?: React.CSSProperties;
    styles?: {
        input?: React.CSSProperties;
    };

    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
}

const InputTextSearch = ({
    className,
    variant = "outline",
    value,
    defaultValue,
    error,
    placeholder,
    disabled,
    hidden,
    style,
    styles,

    onChange,
    onBlur,
    onSubmit,
}: InputTextSearchProps) => {
    // Merge styles
    const mergedInputStyle = { ...style, ...styles?.input };

    // Check if border radius is overridden in styles
    const hasBorderRadiusOverride = mergedInputStyle.borderRadius !== undefined;

    // Tailwind classes to override Ant Design
    const inputClass = classname(
        "!px-4 !py-2", // Match legacy padding (10px 16px -> py-2.5 px-4)
        {
            "!rounded-none": !hasBorderRadiusOverride, // Only enforce 0 radius if not overridden
            // Mimic legacy border styles if needed, but AntD default outline is usually fine.
            // Legacy had border: 0.5px solid #ececec. AntD is 1px.
            // We can enforce legacy border color closer to #ececec if desired, usually border-neutral-200.
            "!border-neutral-200": variant === "outline",
        },
        className
    );

    return (
        <div className="w-full" hidden={hidden}>
            <Input
                className={inputClass}
                style={mergedInputStyle}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                disabled={disabled}
                status={error ? "error" : ""}
                onChange={onChange}
                onBlur={onBlur}
                onPressEnter={onSubmit}
                prefix={<Icon name="search" className="mr-2 text-text-sub" />}
            />
        </div>
    );
};

export default InputTextSearch;
