/// <reference types="react" />
export interface InputTextSearchProps {
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
declare const InputTextSearch: ({ className, variant, value, defaultValue, error, placeholder, disabled, onChange, onBlur, }: InputTextSearchProps) => JSX.Element;
export default InputTextSearch;
