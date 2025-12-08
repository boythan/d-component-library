/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// react
// third-party
import classname from "classnames";
import React, { CSSProperties, InputHTMLAttributes } from "react";
import ViewTextError from "../view/ViewTextError";

export interface InputColorProps extends InputHTMLAttributes<any> {
    className?: string; // Wrapper class
    classNameLabel?: string;
    classNameInput?: string; // Input element class
    classNameError?: string;
    classNameInputContainer?: string;
    styleInput?: CSSProperties;
    styleInputContainer?: CSSProperties;
    styleLabel?: CSSProperties;
    style?: CSSProperties; // Wrapper style

    variant?: "standard" | "outline";

    // Style override
    styles?: {
        container?: CSSProperties;
        input?: CSSProperties;
        label?: CSSProperties;
        error?: CSSProperties;
        inputContainer?: CSSProperties;
    };

    value?: string;
    defaultValue?: string;
    error?: string;
    name?: string;
    label?: any;
    key?: string;
    placeholder?: string;

    disabled?: boolean;
    hidden?: boolean;
}

const InputColor = ({
    className,
    classNameInput,
    classNameInputContainer,
    style,
    styleInput,
    styleInputContainer,
    styleLabel,
    styles,

    variant = "outline", // standard || outline
    value,
    defaultValue,
    error,
    name,
    label,
    key,
    placeholder,

    disabled,
    hidden,

    onChange,
    onBlur,
    onClick,
    ...inputProps
}: InputColorProps) => {
    // Wrapper: flex flex-col to match .d-input-color__container
    const container = classname("flex flex-col w-full", className);

    // Label
    const labelClass = classname("text-sm font-medium mb-1 text-text-main", {
        "after:content-['*'] after:ml-0.5 after:text-red-500": inputProps.required,
    });

    // Input Container: matches .d-input-color__input-container (min-h-40px, padding 5px 16px -> py-1.5 px-4)
    const inputContainerClass = classname(
        "flex flex-row items-center min-h-[40px] px-4 py-1.5 w-full bg-white transition-all",
        // Borders based on variant
        {
            "border border-neutral-300 rounded": variant === "outline",
            "border-b border-neutral-300 rounded-none": variant === "standard",
            "bg-neutral-100 cursor-not-allowed opacity-60": disabled,
            "!border-red-500": !!error,
        },
        classNameInputContainer
    );

    // Legacy input class .d-input-color__input was likely minimal.
    // Using standard HTML color input styling reset.
    const inputClass = classname("w-8 h-8 p-0 border-0 bg-transparent cursor-pointer", classNameInput);

    // Value text display
    const inputValueClass = classname("text-xs ml-3 text-text-main font-mono uppercase");

    const renderInput = () => {
        return (
            <input
                {...inputProps}
                type="color"
                value={value}
                onChange={onChange}
                className={inputClass}
                name={name}
                key={key}
                placeholder={placeholder}
                onBlur={onBlur}
                disabled={disabled}
                defaultValue={defaultValue}
                style={{ ...styleInput, ...styles?.input }}
            />
        );
    };

    return (
        <div className={container} style={style} hidden={hidden}>
            {label && (
                <label htmlFor={name} className={labelClass} style={{ ...styleLabel, ...styles?.label }}>
                    <span>{label}</span>
                </label>
            )}
            <div
                className={inputContainerClass}
                style={{ ...styleInputContainer, ...styles?.inputContainer }}
                onClick={onClick}
            >
                {renderInput()}
                <div className={inputValueClass}>{value}</div>
            </div>
            <ViewTextError error={error} />
        </div>
    );
};

export default InputColor;
