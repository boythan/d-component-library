import { Checkbox as AntCheckbox, Radio as AntRadio } from "antd";
import classNames from "classnames";
import React from "react";

export interface CheckboxProps {
    label?: string;
    id?: string;
    name?: string;
    className?: string;
    classNameInput?: string;
    classNameInputWrapper?: string;
    classNameLabel?: string;
    variant?: "checkbox" | "radio";
    value?: any;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (e: any) => void;
    [key: string]: any;
}

const Checkbox = ({
    className,
    classNameInput,
    classNameInputWrapper,
    classNameLabel,
    id,
    name,
    value,
    onChange,
    label,
    variant = "checkbox",
    disabled,
    checked,
    defaultChecked,
    ...props
}: CheckboxProps) => {
    const wrapperClass = classNames("flex items-center [&_.ant-checkbox-label]:overflow-hidden", className);
    // Add truncate and block to label to handle overflow
    const labelClass = classNames("ml-2 text-sm truncate block", classNameLabel);

    if (variant === "radio") {
        return (
            <div className={wrapperClass}>
                <AntRadio
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    className={classNames("max-w-full", classNameInput)}
                    {...props}
                >
                    {label && (
                        <span className={labelClass} title={typeof label === "string" ? label : undefined}>
                            {label}
                        </span>
                    )}
                </AntRadio>
            </div>
        );
    }

    return (
        <div className={wrapperClass}>
            <AntCheckbox
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                checked={checked}
                defaultChecked={defaultChecked}
                className={classNames("max-w-full", classNameInput)}
                {...props}
            >
                {label && (
                    <span className={labelClass} title={typeof label === "string" ? label : undefined}>
                        {label}
                    </span>
                )}
            </AntCheckbox>
        </div>
    );
};

export default Checkbox;
