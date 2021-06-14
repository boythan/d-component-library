import { CSSProperties, InputHTMLAttributes } from "react";
export interface InputColorProps extends InputHTMLAttributes<any> {
    className?: string;
    classNameInput?: string;
    classNameInputContainer?: string;
    styleInput?: CSSProperties;
    styleInputContainer?: CSSProperties;
    styleLabel?: CSSProperties;
    variant?: "standard" | "outline";
    defaultValue?: string;
    error?: string;
    name?: string;
    label?: any;
    key?: string;
    placeholder?: string;
    disabled?: boolean;
    prefix?: any;
    suffix?: any;
}
declare const InputColor: ({ className, classNameInput, classNameInputContainer, style, styleInput, styleInputContainer, styleLabel, variant, value, defaultValue, error, name, label, key, placeholder, disabled, onChange, onBlur, }: InputColorProps) => JSX.Element;
export default InputColor;
