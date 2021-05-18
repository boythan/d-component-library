import React, { ReactElement, useState } from "react";
import InputText from "../components/input/InputText";
import Icon, { IconProps } from "../components/icon/Icon";
import Button from "../components/button/Button";
import HeaderTable from "../components/header/HeaderTable";
import Checkbox from "../components/checkbox/Checkbox";
import Select from "../components/select/Select";

interface Props {
    content?: any;
}

const ATTRIBUTE_INPUT_TYPE = [
    { id: "dropdown", label: "dropdown" },
    { id: "text", label: "swatchText" },
    { id: "image", label: "swatchImage" },
    { id: "color", label: "swatchColor" },
];

export default function Test({ content }: Props): ReactElement {
    const [checked, setChecked] = useState(false);
    const [valueSelect, setValueSelect] = useState();
    return (
        <div className="p-5">
            <InputText />
            <Select
                dataSource={ATTRIBUTE_INPUT_TYPE}
                label="Please select"
                className="mt-4"
                value={valueSelect}
                onChange={setValueSelect}
            />
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

            <HeaderTable
                label="Product table"
                onChangeText={() => {}}
                onClickExport={() => {}}
                onClickFilter={() => {}}
                onClickNew={() => {}}
            />

            <div className="my-5">
                <Checkbox value="123" variant="radio" label="Label value 1" />
                <Checkbox value="123" variant="checkbox" label="Label value 1" />
            </div>
        </div>
    );
}
