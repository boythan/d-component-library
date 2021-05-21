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
import Avatar from "../components/avatar/Avatar";
import RowInterchangeView from "../components/view/RowInterchangeView";
import TabBar from "../components/tab/TabBar";

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
    const [selectedTab, setSelectedTab] = useState<any>();

    console.log({ valueSelect });
    console.log({ radioValue });

    const mainContent = () => {
        const avatar = (
            <React.Fragment>
                <div className="d-flex align-items-center my-3">
                    <Avatar
                        src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                        size="x-large"
                        className="mx-3"
                    />
                    <Avatar
                        src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                        size="large"
                        className="mx-3"
                    />
                    <Avatar
                        src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                        size="medium"
                        className="mx-3"
                    />
                    <Avatar
                        src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                        size="small"
                        className="mx-3"
                    />
                    <Avatar
                        src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                        size="x-small"
                        className="mx-3"
                    />
                </div>
                <div className="d-flex align-items-center my-3">
                    <Avatar
                        src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                        size="x-large"
                        className="mx-3"
                        variant="square"
                    />
                    <Avatar
                        src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                        size="large"
                        className="mx-3"
                        variant="square"
                    />
                    <Avatar
                        src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                        size="medium"
                        className="mx-3"
                        variant="square"
                    />
                    <Avatar
                        src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                        size="small"
                        className="mx-3"
                        variant="square"
                    />
                    <Avatar
                        src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                        size="x-small"
                        className="mx-3"
                        variant="square"
                    />
                </div>
                <div className="d-flex align-items-center my-4">
                    <Avatar size="small" className="mx-3" text="Joker" />
                    <Avatar size="medium" className="mx-3" variant="square" text="Batman" />
                </div>
            </React.Fragment>
        );

        const input = (
            <div className="my-4">
                <InputText />

                <Select
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    label="Select"
                    className="mt-4"
                    value={valueSelect}
                    onChange={setValueSelect}
                />
            </div>
        );

        const button = (
            <div className="d-flex my-4">
                <div className="d-flex flex-column mr-5">
                    <Button content="Button" color="gray" variant="outline" className="text-underline text-secondary" />
                    <Button content="Button" color="gray" variant="standard" />
                    <Button content="Button" color="green" variant="trans" />
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
                    <Button content="Icon Button" iconName="home" suffixIcon="home" variant="trans" />
                    <Button content="Icon Button" className="my-3" iconName="home" variant="outline" />
                    <Button className="my-3" iconName="home" variant="outline" />
                </div>
            </div>
        );

        const checkBox = (
            <React.Fragment>
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
            </React.Fragment>
        );

        const header = (
            <div className="my-4">
                <HeaderTable
                    label="Product table"
                    onChangeText={() => {}}
                    onClickExport={() => {}}
                    onClickFilter={() => {}}
                    onClickNew={() => {}}
                />
            </div>
        );
        const view = (
            <div className="my-4">
                <RowInterchangeView
                    dataSource={{ customerId: 62 }}
                    keyList={[
                        { id: "customerId", label: "customerId" },
                        { id: "typeCustomer", label: "typeCustomer" },
                        { id: "firstName", label: "firstName" },
                        { id: "lastName", label: "lastName" },
                    ]}
                />
            </div>
        );
        const tab = (
            <div className="my-4">
                <TabBar dataSource={ATTRIBUTE_INPUT_TYPE} onChange={(tab) => setSelectedTab(tab)} value={selectedTab} />
                <TabBar
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    onChange={(tab) => setSelectedTab(tab)}
                    value={selectedTab}
                    variant="vertical"
                />
            </div>
        );
        return (
            <React.Fragment>
                {/* {avatar} */}
                {/* {input} */}
                {/* {button} */}
                {/* {checkBox} */}
                {/* {header} */}
                {tab}
                {view}
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
                size="medium"
                headerSide={() => (
                    <div className="text-nowrap" style={{ width: "200px" }}>
                        this is header side
                    </div>
                )}
            >
                {mainContent()}
            </Modal>
        </div>
    );
}
