/// <reference types="react" />
import { CheckboxGroupProps } from "../checkbox/CheckboxGroup";
import { InputDropProps } from "./InputDrop";
interface InputDropCheckboxGroupProps extends CheckboxGroupProps, InputDropProps {
    label: string;
    value?: any;
}
declare const InputDropCheckboxGroup: (props: InputDropCheckboxGroupProps) => JSX.Element;
export default InputDropCheckboxGroup;
