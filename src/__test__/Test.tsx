import React, { ReactElement } from "react";
import InputText from "../components/input/InputText";
import Icon, { IconProps } from "../components/icon/Icon";

interface Props {
    content?: any;
}

export default function Test({ content }: Props): ReactElement {
    return (
        <div>
            <InputText />
            <Icon name="menu" />
        </div>
    );
}
