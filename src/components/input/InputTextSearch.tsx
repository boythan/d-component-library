// react
import React from "react";

// third-party
import classname from "classnames";

// application

// data stubs
import Icon from "../icon/Icon";

export interface InputTextProps {
    className?: string;

    variant?: "standard" | "outline";

    value?: string;
    defaultValue?: string;
    error?: string;

    placeholder?: string;

    disabled?: boolean;

    onChange?: any;
    onBlur?: any;
}

const InputTextSearch = ({
    className,
    variant = "outline",
    value,
    defaultValue,
    error,
    placeholder,
    disabled,

    onChange,
    onBlur,
}: InputTextProps) => {
    const container = classname(
        "d-input-search",
        `d-input-search__${variant}`,
        {
            "d-input-search__disabled": disabled,
            "d-input-search__error": !!error,
        },
        className
    );

    return (
        <div className={container}>
            <Icon name="search" className="mr-3" />
            <input
                value={value}
                onChange={onChange}
                required
                placeholder={placeholder}
                onBlur={onBlur}
                disabled={disabled}
                defaultValue={defaultValue}
            />
        </div>
    );
};

export default InputTextSearch;
