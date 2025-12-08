/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// react
// third-party
import classname from "classnames";
import React, { CSSProperties, ReactNode } from "react";
import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import ViewTextError from "../view/ViewTextError";
import WrapperComponent from "../wrapper/WrapperComponent";

// Define strict props for Ant Design Input integration
export interface InputTextProps {
    className?: string; // Wrapper class
    classNameLabel?: string;
    classNameInput?: string; // Input element class
    classNameError?: string;
    classNameInputContainer?: string;
    styleInput?: CSSProperties;
    styleInputContainer?: CSSProperties;
    styleLabel?: CSSProperties;
    style?: CSSProperties; // Wrapper style
    styles?: {
        container?: CSSProperties;
        input?: CSSProperties;
        label?: CSSProperties;
        error?: CSSProperties;
        inputContainer?: CSSProperties;
    };

    variant?: "standard" | "outline";
    multiple?: boolean;
    defaultValue?: string;
    value?: string | number | readonly string[];
    error?: string;
    name?: string;
    label?: ReactNode;
    placeholder?: string;
    type?: string;
    rows?: number;
    cols?: number;
    disabled?: boolean;
    required?: boolean;
    hidden?: boolean;
    prefix?: ReactNode;
    suffix?: ReactNode;

    wrapperElement?: any;

    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onClickSuffix?: () => any;
    onClickPrefix?: () => any;

    // Catch-all for other HTML/Input props
    [key: string]: any;
}

const InputText = ({
    className,
    classNameLabel,
    classNameInput,
    classNameError,
    classNameInputContainer,
    style,
    styleInput,
    styleInputContainer,
    styleLabel,
    styles,

    variant = "outline", // standard || outline
    multiple,
    value,
    defaultValue,
    error,
    name,
    label,
    placeholder,
    type,
    rows = 5,
    cols,
    disabled,
    prefix,
    suffix,
    required,
    hidden,
    wrapperElement,
    onChange,
    onBlur,
    onClickSuffix,
    onClickPrefix,
    size = "middle",
    ...inputProps
}: InputTextProps) => {
    // Wrapper container
    const containerClass = classname("flex flex-col w-full", className);

    // Label
    const labelClass = classname(
        "text-sm font-medium mb-1 text-text-main",
        { "after:content-['*'] after:ml-0.5 after:text-red-500": required },
        classNameLabel
    );

    // Ant Design status
    const status = error ? "error" : "";

    // Prefix/Suffix wrapper for click events
    const renderAddon = (addon: ReactNode, onClick?: () => void) => {
        if (!addon) return null;
        if (onClick) {
            return (
                <span className="cursor-pointer flex items-center" onClick={onClick}>
                    {addon}
                </span>
            );
        }
        return addon;
    };

    const prefixNode = renderAddon(prefix, onClickPrefix);
    const suffixNode = renderAddon(suffix, onClickSuffix);

    // Merge styles
    const mergedInputStyle = { ...styleInput, ...styles?.input };

    const commonProps = {
        name,
        value,
        defaultValue,
        disabled,
        placeholder,
        style: mergedInputStyle,
        onChange,
        onBlur,
        status: status as any,
        ...inputProps,
    };

    const renderInput = () => {
        // Check if border radius is overridden in styles
        const hasBorderRadiusOverride = mergedInputStyle.borderRadius !== undefined;

        // Tailwind classes to override/enhance Ant Design
        const baseInputClass = classname(
            // If variant is standard, we might want to remove borders and add only bottom border,
            // but AntD doesn't support 'standard' out of the box cleanly without 'borderless' + custom styling.
            // For now, mapping 'outline' to default, and 'standard' would need custom CSS or 'borderless' + utility.
            // Let's rely on AntD's default for 'outline'.
            {
                "!rounded-none": !hasBorderRadiusOverride, // Only enforce 0 radius if not overridden
                "!border-b !border-0 !border-b-neutral-300 focus:!shadow-none focus:!border-b-primary":
                    variant === "standard",

                "!px-4 !py-2": size === "middle",
            },
            classNameInput
        );

        if (multiple) {
            return (
                <Input.TextArea
                    {...commonProps}
                    rows={rows}
                    cols={cols}
                    className={baseInputClass}
                    variant={variant === "standard" ? "underlined" : "outlined"}
                    size={size}
                />
            );
        }

        return (
            <Input
                {...commonProps}
                type={type}
                prefix={prefixNode}
                suffix={suffixNode}
                className={baseInputClass}
                variant={variant === "standard" ? "underlined" : "outlined"}
                size={size}
            />
        );
    };

    return (
        <WrapperComponent element={wrapperElement || <div className={containerClass} style={style} hidden={hidden} />}>
            {label && (
                <label htmlFor={name} className={labelClass} style={styleLabel}>
                    {label}
                </label>
            )}
            <div className={classname("w-full", classNameInputContainer)} style={styleInputContainer}>
                {renderInput()}
            </div>
            <ViewTextError error={error} className={`mt-1 text-xs text-red-500 ${classNameError}`} />
        </WrapperComponent>
    );
};

export default InputText;
