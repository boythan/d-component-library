/* eslint-disable operator-linebreak */
import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import Avatar from "../components/avatar/Avatar";
import AvatarName from "../components/avatar/AvatarName";
import Button from "../components/button/Button";
import Checkbox from "../components/checkbox/Checkbox";
import CheckboxGroup from "../components/checkbox/CheckboxGroup";
import RadioGroup from "../components/checkbox/RadioGroup";
import DateInput from "../components/dateInput/DateInput";
import DialogComponent from "../components/dialog/DialogComponent";
import DialogManager from "../components/dialog/DialogManager";
import Dot from "../components/dot/Dot";
import Dropdown from "../components/dropdown/Dropdown";
import Icon from "../components/icon/Icon";
import InputText from "../components/input/InputText";
import InputTextSearch from "../components/input/InputTextSearch";
import AwesomeListComponent from "../components/list/awesomeList/AwesomeListComponent";
import Loading from "../components/loading/Loading";
import Modal from "../components/modal/Modal";
import Select from "../components/select/Select";
import TabBar from "../components/tab/TabBar";
import TableAwesomeComponent, { AwesomeTableComponentProps } from "../components/table/AwesomeTableComponent";
import { transformColumn } from "../components/table/AwesomeTableUtils";
import RowInterchangeView from "../components/view/RowInterchangeView";
import { ATTRIBUTE_INPUT_TYPE } from "./TestConstant";
import TestHeader from "./TestHeader";

interface Props {
    content?: any;
}

const AppStateContext = React.createContext<any>({ defaultValue: null });

const FAKE_TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MmRhNDEwNC01NDY4LTQwY2MtODU1Ni1kZjg4NzY0OGZiOGEiLCJqdGkiOiI5ZmZlNjUwNzQwMDRmZjY1MzY4ZmEyZjAwN2ZhY2I2MGRlY2Q3NGFmZjUwOWNhNmI4ZmM3YTBhNDIyYzZmZDdlMDJlNTIwMjBiYTZjYWQ1NyIsImlhdCI6MTYyMTkzNDY3NSwibmJmIjoxNjIxOTM0Njc1LCJleHAiOjE2NTM0NzA2NzUsInN1YiI6ImY4ZjUwMjdmLTdiMTItMTFlYi05MDIyLWNlN2ZjZGYxMWQzMCIsInNjb3BlcyI6W119.QOrc-ngJFxakJNVMI2stK1L2zyBArmvtLHZtfE5OPefj8azpI2Qxlvvp_EmN_RAV-pkW5YK1qv5Lpc6SHhKR6te9GL8xw3bFbVaKbcDxvNHLkx3zhsGszXeWxt-PoVVscQ1lk5q3z3yJhlYdiOXXECPuVwSVWVV3JQo9D9e-kepjk_8-_bd-klzzP1ST3pMlm5V7-MEMYrRB3de_M3ydjhH77ZJLGNyhNWPKV0h40ysM-zUmzynnX7InpzIS26Lr9dKNw0jW69RNwCpDRAfkYX9enhGYqMyRYCWxXmgojiqVkIXOvi4Ec61QjdRJig2W3dcWwt3a_QSaabTvv6Y0Xp-NbL1dl9GsPkHQZmlMH4fYS744lK0F854Ik_4SMeQO57ZUatGxrRFvw5AF04mrSF3cblH-W419am4uXeEiOMKHfBeuzrSj5Vu8BbRiHmWwHl-H4K-nSoe2TRz6_IGuahn-4S9xiFnUOzX3QIqZ_Br7lrFLN4A5EJmG4uYwLDZvwtct-lNiLqmEMp3UovTr3qlBr1GXoMRvLRAlfPMYKipmCJ1bhPYoXyXoOhAwluAM7F24o5GIB43DjD5_dOXYniuUAa7z3ObLtJDtkbtdif3MUyrHKlv9tfrf_c87lFrfTMfYGkLpgZ6pBKz0B7S3ZtkkgNi1oUbVwN98eiZLBrs";
const URL = "https://api-dev.mattresscity.co.th/api/backend/brand";

const test = (a: any, b?: any) => {
    return a;
};

const AvatarIconView = () => {
    return (
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
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="xx-small"
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
            <div className="d-flex align-items-center my-4">
                <div className="w-100" style={{ height: "5px" }}>
                    <Icon size="small" className="mx-3" name="photo_camera" variant="badge" badge="5" />
                </div>
                <Icon size="medium" className="mx-3" name="photo_camera" variant="badge" badge="66" />
                <Icon size="large" className="mx-3" name="photo_camera" variant="badge" badge="99+" />
                <Icon size="x-large" className="mx-3" name="chat_bubble" variant="badge" badge="3" />
                <Icon size="xx-large" className="mx-3" name="photo_camera" variant="badge" badge="9" />
                <Icon size="xxx-large" className="mx-3" name="photo_camera" variant="badge" />
            </div>
            <div className="d-flex align-items-center my-4">
                <AvatarName
                    user={{
                        fullName: "Amanda",
                    }}
                    subLabel="Actress"
                    size="x-large"
                />
            </div>
        </React.Fragment>
    );
};

const Date = () => {
    return (
        <div className="my-4">
            <div className="w-100 my-3 d-flex align-items-start">
                <InputText label="Date" className="mr-3 w-100" error="Text Error" />
                <DateInput variant="outline" className="ml-3 w-100" label="Range Date" />
            </div>
            <div className="w-100 my-3 d-flex align-items-start">
                <DateInput
                    variant="outline"
                    className="ml-3 w-100"
                    label="Range Date"
                    useButton
                    onChange={(value) => console.log({ value })}
                    isRangePicker
                />
            </div>
        </div>
    );
};

const ButtonView = () => (
    <div className="d-flex my-4">
        <div className="d-flex flex-column mr-5">
            <Button content="Button" color="gray" variant="outline" className="text-underline text-secondary" />
            <Button content="Button" color="gray" variant="standard" />
            <Button content="Button" color="muted" variant="standard" />
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

const TableView = () => {
    const columns: AwesomeTableComponentProps["columns"] = [
        {
            title: () => <h5>ID</h5>,
            dataIndex: "id",
        },
        {
            title: "Label",
            align: "center",
            dataIndex: "label",
        },
    ];
    return (
        <div className="d-flex my-4">
            <TableAwesomeComponent
                source={(paging) => {
                    // return fetch(URL, {
                    //     method: "*GET",
                    //     mode: "cors", // no-cors, *cors, same-origin
                    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    //     credentials: "same-origin", // include, *same-origin, omit
                    //     headers: new Headers({
                    //         Authorization: `Bearer ${FAKE_TOKEN}`,
                    //         "Content-Type": "application/json",
                    //         Accept: "application/json",
                    //         Host: "api-dev.mattresscity.co.th",
                    //         language: "th",
                    //     }),
                    //     body: JSON.stringify({
                    //         page: paging.pageIndex,
                    //         per_page: paging.pageSize,
                    //     }),
                    //     // body: `page=${paging.pageIndex}&per_page=${paging.pageSize}`,
                    //     redirect: "follow", // manual, *follow, error
                    //     referrerPolicy: "no-referrer",
                    // });
                    return Promise.resolve();
                }}
                transformer={(res) => ATTRIBUTE_INPUT_TYPE}
                columns={transformColumn(columns)}
                showSelectColumn
                keyTableLayout="TEST TABLE"
                rowSelection={{
                    onChange: (selectedKey, selectedRow) => {
                        console.log({ selectedKey });
                        console.log({ selectedRow });
                    },
                }}
            />
        </div>
    );
};

const DropdownView = () => {
    const [selectedDropdown, setSelectedDropdown] = useState<any>(ATTRIBUTE_INPUT_TYPE[0]);
    return (
        <div className="d-flex flex-column my-4">
            <Dropdown dataSource={ATTRIBUTE_INPUT_TYPE} />
            <Dropdown
                dataSource={ATTRIBUTE_INPUT_TYPE}
                variant="view"
                value={selectedDropdown}
                onClick={(item) => setSelectedDropdown(item)}
            />
            <p>
                Almost before we knew it, we had left the ground. Thin 100 italic Almost before we knew it, we had left
                the ground. Light 300 Almost before we knew it, we had left the ground. Light 300 italic Almost before
                we knew it, we had left the ground. Regular 400 Almost before we knew it, we had left the ground.
                Regular 400 italic Almost before we knew it, we had left the ground. Medium 500
            </p>
        </div>
    );
};

const RowsView = () => {
    const { mockData } = useContext<any>(AppStateContext);
    console.log(mockData);

    return (
        <div className="my-4">
            <RowInterchangeView
                dataSource={mockData[0]}
                keyList={[
                    { id: "id", label: "ID" },
                    { id: "userId", label: "User ID" },
                    { id: "title", label: "Title" },
                    { id: "body", label: "Body" },
                ]}
            />
            <RowInterchangeView
                dataSource={mockData[0]}
                keyList={[
                    { id: "id", label: "ID" },
                    { id: "userId", label: "User ID" },
                    { id: "title", label: "Title" },
                    { id: "body", label: "Body" },
                ]}
                variant="border"
            />
        </div>
    );
};

export default function Test({ content }: Props): ReactElement {
    const [checked, setChecked] = useState(false);
    const [valueSelect, setValueSelect] = useState(["text"]);
    const [radioValue, setRadioValue] = useState<any>(["color"]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState<any>();
    const [mockData, setMockData] = useState<any>([]);
    const dialogRef = useRef<any>();

    async function loadFakeData() {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setMockData(data);
    }

    useEffect(() => {
        DialogManager.initialDialog(dialogRef.current);
        loadFakeData();
    }, []);

    const input = (
        <div className="my-4">
            <input type="datetime-local" onChange={(e) => console.log(e?.target?.value)} />
            <input type="color" onChange={(value) => console.log({ value })} />
            <input type="image" alt="" src="./logo192.png" onChange={(value) => console.log({ value })} />
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" type="number" />
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
                    // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                    return fetch("https://jsonplaceholder.typicode.com/posts");
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
                <AvatarIconView />
                {/* {input} */}
                <Date />
                <ButtonView />
                {/* {checkBox} */}
                {/* {header} */}
                {tab}
                <RowsView />
                {/* {list} */}
                {loading}
                {dot}
                <div className="p-3 border bg-primary-30">Border</div>
            </React.Fragment>
        );
    };
    const TAB_LIST = [
        { id: "AVATAR", label: "AVATAR", component: <AvatarIconView /> },
        { id: "INPUT", label: "INPUT", component: input },
        { id: "DATE", label: "DATE", component: <Date /> },
        { id: "BUTTON", label: "BUTTON", component: <ButtonView /> },
        { id: "TABLE", label: "TABLE", component: <TableView /> },
        { id: "CHECKBOX", label: "CHECKBOX", component: checkBox },
        { id: "HEADER", label: "HEADER", component: <TestHeader /> },
        { id: "TAB BAR", label: "TAB BAR", component: tab },
        { id: "VIEW", label: "VIEW", component: <RowsView /> },
        { id: "LIST", label: "LIST", component: list },
        { id: "LOADING", label: "LOADING", component: loading },
        { id: "DOT", label: "DOT", component: dot },
        { id: "DROPDOWN", label: "DROPDOWN", component: <DropdownView /> },
    ];

    const renderCustomHeader = () => {
        return <div>header</div>;
    };

    return (
        <AppStateContext.Provider value={{ mockData }}>
            <div className="p-5 d-flex bg-muted">
                <DialogComponent ref={dialogRef.current} />
                <div className="col-3 p-0 mr-4 card-container">
                    <TabBar
                        dataSource={TAB_LIST}
                        variant="vertical"
                        onChange={(tab) => setSelectedTab(tab)}
                        value={selectedTab}
                    />
                </div>
                <div className="col-9 py-5 px-5 ml-4 card-container">
                    {selectedTab?.component ?? "N/A"}
                    {/* <Button content="Open Modal" variant="trans" onClick={() => setOpenModal(true)} /> */}
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
        </AppStateContext.Provider>
    );
}
