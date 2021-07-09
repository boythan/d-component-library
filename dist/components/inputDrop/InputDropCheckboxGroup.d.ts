/// <reference types="react" />
import { CheckboxGroupProps } from "../checkbox/CheckboxGroup";
import { InputDropProps } from "./InputDrop";
export interface InputDropCheckboxGroupProps extends CheckboxGroupProps, InputDropProps {
    label: string;
    value?: any;
}
declare const InputDropCheckboxGroup: (props: InputDropCheckboxGroupProps) => JSX.Element;
export default InputDropCheckboxGroup;
