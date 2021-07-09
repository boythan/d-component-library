/// <reference types="react" />
import { CheckboxGroupProps } from "../checkbox/CheckboxGroup";
import { InputDropProps } from "./InputDrop";
export interface InputDropSelectProps extends CheckboxGroupProps, InputDropProps {
    label: string;
    value?: any;
}
declare const InputDropSelect: (props: InputDropSelectProps) => JSX.Element;
export default InputDropSelect;
