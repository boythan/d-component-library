import React from "react";
import classname from "classnames";

export interface CheckboxProps {
    value: string;
    onChange: any;
    label?: string;
    id?: string;
    name?: string;
    className?: string;
    classNameInput?: string;
    variant?: "square" | "circle";
}

const Checkbox = ({
    className,
    classNameInput,
    id,
    name,
    value,
    onChange,
    label,
    variant = "square",
}: CheckboxProps) => {
    const classNameContainer = classname("checkbox__container", className);
    const classNameCheckbox = classname("checkbox__input", `checkbox__input-${variant}`, classNameInput);
    return (
        <div className={classNameContainer}>
            <input
                type="checkbox"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={classNameCheckbox}
            />
            <text className="ml-3">{label}</text>
        </div>
    );
};

export default Checkbox;
