// react
import React, { useState } from "react";
// application
// data stubs
import Icon from "../elements/icon/Icon";
import InputText, { InputTextProps } from "./InputText";

export interface InputTextPasswordProps extends InputTextProps {}

const InputTextPassword = ({ ...rest }: InputTextPasswordProps) => {
    const [hidePassword, setHidePassword] = useState(true);
    return (
        <InputText
            {...rest}
            suffix={<Icon name={hidePassword ? "visibility" : "visibility_off"} />}
            onClickSuffix={() => setHidePassword(!hidePassword)}
            type={hidePassword ? "password" : undefined}
        />
    );
};

export default InputTextPassword;
