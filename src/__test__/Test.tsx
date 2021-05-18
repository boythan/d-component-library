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
            <div className="d-flex my-4">
                <div className="d-flex flex-column mr-5">
                    <Button content="Button" />
                    <Button content="Disabled Button" className="my-3" disabled />
                    <Button content="Button" className="my-3" size="medium" />
                    <Button content="Button" className="my-3" size="small" />
                    <Button content="Button" className="my-3" size="x-small" />
                </div>
                <div className="d-flex flex-column mx-5">
                    <Button content="Button" variant="outlined" />
                    <Button content="Button" className="my-3" size="medium" variant="outlined" />
                    <Button content="Button" className="my-3" size="small" variant="outlined" />
                    <Button content="Button" className="my-3" size="x-small" variant="outlined" />
                </div>
                <div className="d-flex flex-column ml-5">
                    <Button content="Icon Button" iconName="home" />
                    <Button content="Icon Button" className="my-3" iconName="home" variant="outlined" />
                    <Button className="my-3" iconName="home" variant="outlined" />
                </div>
            </div>
        </div>
    );
}
