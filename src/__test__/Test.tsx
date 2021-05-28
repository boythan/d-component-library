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
import PopoverList from "../components/list/popoverList/PopoverList";
import Loading from "../components/loading/Loading";
import AwesomeListComponent from "../components/list/awesomeList/AwesomeListComponent";
import InputTextSearch from "../components/input/InputTextSearch";
import DateInput from "../components/dateInput/DateInput";
import Dot from "../components/dot/Dot";

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
            <div className="d-flex align-items-center my-4">
                <Icon size="large" className="mx-3" name="photo_camera" />
                <Icon size="x-large" className="mx-3" name="photo_camera" />
                <Icon size="xx-large" className="mx-3" name="photo_camera" />
                <Icon size="xxx-large" className="mx-3" name="photo_camera" />
            </div>
        </React.Fragment>
    );

    const input = (
        <div className="my-4">
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" />
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" error="Error Text" />
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" disabled />
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" suffix="$" />
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" prefix="$" />
            <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" />
            <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" error="Error Text" />
            <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" disabled />
            <InputTextSearch placeholder="Please enter" className="mt-3" />

            <Select
                dataSource={ATTRIBUTE_INPUT_TYPE}
                label="Select"
                className="mt-4"
                value={valueSelect}
                onChange={setValueSelect}
            />
        </div>
    );

    const date = (
        <div className="my-4">
            <div className="w-100 my-3 d-flex align-items-start">
                <InputText label="Date" className="mr-3 w-100" error="Text Error" />
                <DateInput variant="outline" className="ml-3 w-100" label="Range Date" />
            </div>
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
                <Button content="Button" className="my-3" size="medium" color="error" />
                <Button content="Button" className="my-3" size="small" color="success" />
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

    const list = (
        <div className="my-4">
            {/* <PopoverList
                source={async (paging) => {
                    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                    return Promise.resolve(res);
                }}
                transformer={async (res) => {
                    // const data = JSON.stringify(res);
                    const data = await res.json();
                    console.log({ data });
                    return data;
                }}
                buttonText="New"
                buttonIconName="add"
                loadMoreText="Load More"
                renderItem={(item) => item?.id}
            /> */}
            <AwesomeListComponent
                source={async (paging) => {
                    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                    return Promise.resolve(res);
                }}
                transformer={async (res) => {
                    // const data = JSON.stringify(res);
                    const data = await res.json();
                    console.log({ data });
                    return data as any;
                }}
                renderItem={(item, index) => <div>{item?.id}</div>}
            />
        </div>
    );

    const loading = (
        <div className="my-4 d-flex align-items-center">
            <Loading />
            <Loading size="large" className="mx-5" />
            <Loading size="small" />
        </div>
    );

    const dot = (
        <div className="my-4 d-flex align-items-center">
            <Dot />
        </div>
    );

    const mainContent = () => {
        return (
            <React.Fragment>
                {avatar}
                {/* {input} */}
                {date}
                {button}
                {/* {checkBox} */}
                {/* {header} */}
                {tab}
                {view}
                {/* {list} */}
                {loading}
                {dot}
                <div className="p-3 border bg-primary-30">Border</div>
            </React.Fragment>
        );
    };
    const TAB_LIST = [
        { id: "AVATAR", label: "AVATAR", component: avatar },
        { id: "INPUT", label: "INPUT", component: input },
        { id: "DATE", label: "DATE", component: date },
        { id: "BUTTON", label: "BUTTON", component: button },
        { id: "CHECKBOX", label: "CHECKBOX", component: checkBox },
        { id: "HEADER", label: "HEADER", component: header },
        { id: "TAB BAR", label: "TAB BAR", component: tab },
        { id: "VIEW", label: "VIEW", component: view },
        { id: "LIST", label: "LIST", component: list },
        { id: "LOADING", label: "LOADING", component: loading },
        { id: "DOT", label: "DOT", component: dot },
    ];

    const renderCustomHeader = () => {
        return <div>header</div>;
    };

    return (
        <div className="p-5 d-flex">
            <div className="col-3 p-0 pr-4 card-container">
                <TabBar
                    dataSource={TAB_LIST}
                    variant="vertical"
                    onChange={(tab) => setSelectedTab(tab)}
                    value={selectedTab}
                />
            </div>
            <div className="col-9 p-0 pl-4">
                {selectedTab?.component ?? "N/A"}
                <Button content="Open Modal" variant="trans" onClick={() => setOpenModal(true)} />
            </div>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={() => setOpenModal(false)}
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
                classNameFooter="d-none"
            >
                {mainContent()}
            </Modal>
        </div>
    );
}
