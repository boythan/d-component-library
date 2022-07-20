/* eslint-disable operator-linebreak */
import React, { ReactElement, useEffect, useRef, useState } from "react";
import Button from "../components/button/Button";
import DateInput from "../components/dateInput/DateInput";
import DialogComponent from "../components/dialog/DialogComponent";
import DialogManager from "../components/dialog/DialogManager";
import Dot from "../components/elements/dot/Dot";
import Loading from "../components/elements/loading/Loading";
import Modal from "../components/modal/Modal";
import Progress from "../components/progress/Progress";
import TabBar from "../components/tab/TabBar";
import { ProgressComponent } from "../dcomponent";
import TestBadge from "./components/badge/TestBadge";
import TestInputDrop from "./components/input_drop/TestInputDrop";
import TestHeader from "./components/TestHeader";
import TestInput from "./components/TestInput";
import TestTable from "./components/TestTable";
import TestAvatarIcon from "./components/test_avatar_icon/TestAvatarIcon";
import TestButton from "./components/test_button/TestButton";
import TestCard from "./components/test_card/TestCard";
import TestCheckbox from "./components/test_checkbox/TestCheckbox";
import TestDropdown from "./components/test_dropdown/TestDropdown";
import TestForm from "./components/test_form/TestForm";
import TestList from "./components/test_list/TestList";
import TestNotification from "./components/test_notification/TestNotification";
import TestProgress from "./components/test_progress/TestProgress";
import TestTabBar from "./components/test_tabBar/TestTabBar";
import TestUtils from "./components/test_util/TestUtils";
import TestView from "./components/test_view/TestView";
import TestPopover from "./components/test_popover/TestPopover";
import { ATTRIBUTE_INPUT_TYPE } from "./data/TestConstant";
import TestModal from "./components/test_modal/TestModal";
import API from "./network/API";
import TestDrawer from "./components/test_drawer/TestDrawer";
import TestRating from "./components/test_rating/TestRating";
import TestElement from "./components/test_elements/TestElement";

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

const Date = () => {
    return (
        <div className="my-4">
            <div className="w-100 my-3 d-flex align-items-start">
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

export default function Test({ content }: Props): ReactElement {
    const [valueSelect, setValueSelect] = useState([ATTRIBUTE_INPUT_TYPE[0]]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState<any>();
    const [mockData, setMockData] = useState<any>([]);
    const dialogRef = useRef<any>();
    const progressRef = useRef<any>();

    async function loadFakeData() {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setMockData(data);
    }

    useEffect(() => {
        DialogManager.initialDialog(dialogRef.current);
        Progress.initialProgress(progressRef.current);
        console.log("progressRef.current", progressRef.current);
        loadFakeData();
    }, []);

    const mainContent = () => {
        return (
            <React.Fragment>
                <TestAvatarIcon />
                {/* {input} */}
                <Date />
                <TestButton />
                {/* {checkBox} */}
                {/* {header} */}
                <TestTabBar />
                <TestView />
                {/* {list} */}
                <div className="p-3 border bg-primary-30">Border</div>
            </React.Fragment>
        );
    };
    const TAB_LIST = [
        { id: "AVATAR", label: "AVATAR", component: <TestAvatarIcon /> },
        { id: "INPUT", label: "INPUT", component: <TestInput /> },
        { id: "BUTTON", label: "BUTTON", component: <TestButton /> },
        { id: "TABLE", label: "TABLE", component: <TestTable /> },
        { id: "CHECKBOX", label: "CHECKBOX", component: <TestCheckbox /> },
        { id: "HEADER", label: "HEADER", component: <TestHeader /> },
        { id: "TAB BAR", label: "TAB BAR", component: <TestTabBar /> },
        { id: "VIEW", label: "VIEW", component: <TestView /> },
        { id: "LIST", label: "LIST", component: <TestList /> },
        { id: "DROPDOWN", label: "DROPDOWN", component: <TestDropdown /> },
        { id: "BADGE", label: "BADGE", component: <TestBadge /> },
        { id: "UTIL", label: "UTIL", component: <TestUtils /> },
        { id: "PROGRESS", label: "PROGRESS", component: <TestProgress /> },
        { id: "NOTIFICATION", label: "NOTIFICATION", component: <TestNotification /> },
        { id: "CARD", label: "CARD", component: <TestCard /> },
        { id: "FORM", label: "FORM", component: <TestForm /> },
        { id: "INPUT_DROP", label: "INPUT_DROP", component: <TestInputDrop /> },
        { id: "POPOVER", label: "POPOVER", component: <TestPopover /> },
        { id: "MODAL", label: "MODAL", component: <TestModal /> },
        { id: "DRAWER", label: "DRAWER", component: <TestDrawer /> },
        { id: "ELEMENTS", label: "ELEMENTS", component: <TestElement /> },
    ];
    return (
        <AppStateContext.Provider value={{ mockData }}>
            <div className="p-5 d-flex bg-muted">
                <DialogComponent ref={dialogRef.current} />

                <div className="col-3 p-0 mr-0 card-container" style={{ height: "fit-content" }}>
                    <TabBar
                        dataSource={TAB_LIST}
                        variant="vertical"
                        onChange={(tab) => setSelectedTab(tab)}
                        value={selectedTab}
                        activeBorder="left"
                        getItemProps={({ item, isActive }) => {
                            if (isActive) {
                                return {
                                    style: {
                                        // borderLeft: "3px solid red",
                                        // borderBottom: "1px solid rgba(0,0,0,0.2)",
                                        color: "red",
                                    },
                                };
                            }
                            return {};
                        }}
                    />
                </div>
                <div className="col-9 py-5 px-5 ml-0 card-container">
                    {selectedTab?.component ?? "N/A"}
                    {/* <Button content="Open Modal" variant="trans" onClick={() => setOpenModal(true)} /> */}
                </div>
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onSave={() => {
                        return Progress.show({ method: API.brandList, params: [] }, (res) => {
                            setOpenModal(false);
                        });
                    }}
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
            <ProgressComponent
                ref={(ref) => {
                    progressRef.current = ref;
                }}
            />
        </AppStateContext.Provider>
    );
}
