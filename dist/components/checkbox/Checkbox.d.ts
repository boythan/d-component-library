import React from "react";
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    name?: string;
    className?: string;
    classNameInput?: string;
    classNameInputWrapper?: string;
    classNameLabel?: string;
    variant?: "checkbox" | "radio";
}
declare const Checkbox: ({ className, classNameInput, classNameInputWrapper, classNameLabel, id, name, value, onChange, label, variant, disabled, checked, }: CheckboxProps) => JSX.Element;
export default Checkbox;
