/// <reference types="react" />
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
declare const Checkbox: ({ className, classNameInput, id, name, value, onChange, label, variant, }: CheckboxProps) => JSX.Element;
export default Checkbox;
