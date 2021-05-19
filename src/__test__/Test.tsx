import React, { ReactElement, useState } from "react";
import InputText from "../components/input/InputText";
import Icon, { IconProps } from "../components/icon/Icon";
import Button from "../components/button/Button";
import HeaderTable from "../components/header/HeaderTable";
import Checkbox from "../components/checkbox/Checkbox";
import Select from "../components/select/Select";
import CheckboxGroup from "../components/checkbox/CheckboxGroup";
import RadioGroup from "../components/checkbox/RadioGroup";
import Modal from "../components/modal/Modal";

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
    const [valueSelect, setValueSelect] = useState(["text"]);
    const [radioValue, setRadioValue] = useState<any>(["color"]);
    const [openModal, setOpenModal] = useState(false);

    console.log({ valueSelect });
    console.log({ radioValue });

    const mainContent = () => {
        return (
            <React.Fragment>
                <InputText />
                {/* <Select
                dataSource={ATTRIBUTE_INPUT_TYPE}
                label="Please select"
                className="mt-4"
                value={valueSelect}
                onChange={setValueSelect}
            /> */}
                <div className="d-flex my-4">
                    <div className="d-flex flex-column mr-5">
                        <Button content="Button" />
                        <Button content="Button" variant="trans" className="my-3" />
                        <Button content="Disabled Button" className="my-3" disabled />
                        <Button content="Button" className="my-3" size="medium" />
                        <Button content="Button" className="my-3" size="small" />
                        <Button content="Button" className="my-3" size="x-small" />
                    </div>
                    <div className="d-flex flex-column mx-5">
                        <Button content="Button" variant="outline" className="my-3" disabled />
                        <Button content="Button" className="my-3" size="medium" variant="outline" />
                        <Button content="Button" className="my-3" size="small" variant="outline" />
                        <Button content="Button" className="my-3" size="x-small" variant="outline" />
                    </div>
                    <div className="d-flex flex-column ml-5">
                        <Button content="Icon Button" iconName="home" />
                        <Button content="Icon Button" className="my-3" iconName="home" variant="outline" />
                        <Button className="my-3" iconName="home" variant="outline" />
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
                    <Checkbox value="123" variant="checkbox" label="Label value 1" disabled />
                </div>
                <div className="my-5">
                    <CheckboxGroup
                        dataSource={ATTRIBUTE_INPUT_TYPE}
                        value={valueSelect}
                        onChange={(value) => setValueSelect(value)}
                    />
                </div>
                <div className="my-5">
                    <RadioGroup
                        dataSource={ATTRIBUTE_INPUT_TYPE}
                        value={radioValue}
                        onChange={(value) => setRadioValue(value)}
                        getDisabledItem={(item) => item?.id === "color"}
                    />
                </div>

                {/* <HeaderTable
                    label="Product table"
                    onChangeText={() => {}}
                    onClickExport={() => {}}
                    onClickFilter={() => {}}
                    onClickNew={() => {}}
                />

                <div className="my-5">
                    <Checkbox value="123" variant="radio" label="Label value 1" />
                    <Checkbox value="123" variant="checkbox" label="Label value 1" />
                    <Checkbox value="123" variant="checkbox" label="Label value 1" disabled />
                </div>
                <div className="my-5">
                    <CheckboxGroup
                        dataSource={ATTRIBUTE_INPUT_TYPE}
                        value={valueSelect}
                        onChange={(value) => setValueSelect(value)}
                    />
                </div>
                <div className="my-5">
                    <RadioGroup
                        dataSource={ATTRIBUTE_INPUT_TYPE}
                        value={radioValue}
                        onChange={(value) => setRadioValue(value)}
                        getDisabledItem={(item) => item?.id === "color"}
                    />
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
                    <Checkbox value="123" variant="checkbox" label="Label value 1" disabled />
                </div>
                <div className="my-5">
                    <CheckboxGroup
                        dataSource={ATTRIBUTE_INPUT_TYPE}
                        value={valueSelect}
                        onChange={(value) => setValueSelect(value)}
                    />
                </div>
                <div className="my-5">
                    <RadioGroup
                        dataSource={ATTRIBUTE_INPUT_TYPE}
                        value={radioValue}
                        onChange={(value) => setRadioValue(value)}
                        getDisabledItem={(item) => item?.id === "color"}
                    />
                </div> */}
            </React.Fragment>
        );
    };

    const renderCustomHeader = () => {
        return <div>header</div>;
    };

    return (
        <div className="p-5">
            {mainContent()}
            <Button content="Open Modal" variant="trans" onClick={() => setOpenModal(true)} />
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Filter"
                closeIcon={false}
                hasCancelButton
                onSideClick={() => {}}
            >
                {mainContent()}
            </Modal>
        </div>
    );
}
