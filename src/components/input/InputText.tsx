/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// react
// third-party
import classname from "classnames";
import React, { CSSProperties, InputHTMLAttributes } from "react";
import ViewTextError from "../view/ViewTextError";
import WrapperComponent from "../wrapper/WrapperComponent";

export interface InputTextProps extends InputHTMLAttributes<any> {
    className?: string;
    classNameLabel?: string;
    classNameInput?: string;
    classNameError?: string;
    classNameInputContainer?: string;
    styleInput?: CSSProperties;
    styleInputContainer?: CSSProperties;
    styleLabel?: CSSProperties;

    variant?: "standard" | "outline";
    multiple?: boolean;
    defaultValue?: string;
    error?: string;
    name?: string;
    label?: any;
    key?: string;
    placeholder?: string;
    type?: string;
    rows?: number;
    cols?: number;
    disabled?: boolean;
    required?: boolean;
    hidden?: boolean;
    prefix?: any;
    suffix?: any;

    wrapperElement?: any;

    onClickSuffix?: () => any;
    onClickPrefix?: () => any;
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

    variant = "outline", // standard || outline
    multiple,
    value,
    defaultValue,
    error,
    name,
    label,
    key,
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
    ...inputProps
}: InputTextProps) => {
    const container = classname("d-input-text__container", className);
    const labelClass = classname("text-label", { "text-label-required": required }, classNameLabel);

    const inputClass = classname("text-x-small", "d-input-text__input", classNameInput);

    const inputContainerClass = classname(
        "d-input-text__input-container",
        `d-input-text__input-container-${variant}`,
        {
            "d-input-text__input-container-disabled": disabled,
            "d-input-text__error": !!error,
        },
        classNameInputContainer
    );

    const inputPrefixClass = classname("text-x-small", "d-input-text__prefix-container", {
        "d-none": !prefix,
        "border-0": disabled,
        "hover-pointer": !!onClickPrefix,
    });
    const inputSuffixClass = classname("text-x-small", "d-input-text__suffix-container", {
        "d-none": !suffix,
        "border-0": disabled,
        "hover-pointer": !!onClickSuffix,
    });

    const textAreaClass = classname(
        "text-x-small",
        "d-input-area__input",
        {
            "d-input-text__error": !!error,
        },
        classNameInput
    );

    const renderInput = () => {
        if (multiple) {
            return (
                <textarea
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    name={name}
                    className={textAreaClass}
                    cols={cols}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    style={styleInput}
                    {...inputProps}
                />
            );
        }
        return (
            <input
                value={value}
                className={inputClass}
                name={name}
                required
                key={key}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                defaultValue={defaultValue}
                style={styleInput}
                onChange={onChange}
                onBlur={onBlur}
                {...inputProps}
            />
        );
    };

    return (
        <WrapperComponent element={wrapperElement || <div className={container} style={style} hidden={hidden} />}>
            {label && (
                <label htmlFor={name} className={labelClass} style={styleLabel}>
                    <span>{label}</span>
                </label>
            )}
            <div className={inputContainerClass} style={styleInputContainer}>
                <div className={inputPrefixClass} onClick={onClickPrefix}>
                    {prefix}
                </div>
                {renderInput()}
                <div className={inputSuffixClass} onClick={onClickSuffix}>
                    {suffix}
                </div>
            </div>
            <ViewTextError error={error} className={`d-input-text__error-view ${classNameError}`} />
        </WrapperComponent>
    );
};

export default InputText;
