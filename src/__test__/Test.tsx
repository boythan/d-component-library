import React, { ReactElement } from "react";
import InputText from "../components/input/InputText";
import Icon, { IconProps } from "../components/icon/Icon";
import Button from "../components/button/Button";

interface Props {
    content?: any;
}

export default function Test({ content }: Props): ReactElement {
    return (
        <div className="p-5">
            <InputText />
            <Icon name="menu" />
            <div className="d-flex align-items-center">
                <Button content="Button" />
                <Button content="Icon Button" className="mx-3" iconName="home" />
                <Button content="Disabled Button" className="mx-3" disabled />
            </div>
        </div>
    );
}
