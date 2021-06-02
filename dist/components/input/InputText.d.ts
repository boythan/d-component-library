import { InputHTMLAttributes } from "react";
export interface InputTextProps extends InputHTMLAttributes<any> {
    className?: string;
    classNameInput?: string;
    classNameInputContainer?: string;
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
    prefix?: any;
    suffix?: any;
}
declare const InputText: ({ className, classNameInput, classNameInputContainer, variant, multiple, value, defaultValue, error, name, label, key, placeholder, type, rows, cols, disabled, prefix, suffix, onChange, onBlur, }: InputTextProps) => JSX.Element;
export default InputText;
