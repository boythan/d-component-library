// react
import React from "react";

// third-party
import classname from "classnames";

// application

// data stubs
import Icon from "../icon/Icon";

export interface InputTextProps {
    [key: string]: any;
}

const InputTextSearch = ({
    className,

    variant = "outline", // standard || outline

    value,
    error,
    name,

    key,
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
                name={name}
                required
                key={key}
                placeholder={placeholder}
                onBlur={onBlur}
                disabled={disabled}
            />
        </div>
    );
};

export default InputTextSearch;
