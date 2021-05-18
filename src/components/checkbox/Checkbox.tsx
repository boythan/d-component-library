import React from "react";
import ClassNames from "classnames";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange?: any;
    label?: string;
    id?: string;
    name?: string;
    className?: string;
    classNameInput?: string;
    classNameInputWrapper?: string;
    classNameLabel?: string;
    variant?: "checkbox" | "radio";
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
}: CheckboxProps) => {
    const classContainer = ClassNames("checkbox__container", className);
    const classInputWrapper = ClassNames(
        "checkbox__input-wrapper",
        `checkbox__input-wrapper-${variant}`,
        classNameInputWrapper
    );
    const classInput = ClassNames("checkbox__input", classNameInput);
    const classLabel = ClassNames("checkbox__label ml-3 text-nowrap", classNameLabel);
    return (
        <div className={classContainer}>
            <div className={classInputWrapper}>
                <input type="checkbox" id={id} name={name} value={value} onChange={onChange} className={classInput} />
                <span className="checkbox__check-mark" />
            </div>
            {label && <div className={classLabel}>{label}</div>}
        </div>
    );
};

export default Checkbox;
