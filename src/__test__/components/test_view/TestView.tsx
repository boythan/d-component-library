import ClassNames from "classnames";
import React from "react";
import InputText from "../../../components/input/InputText";
import ViewCollapse from "../../../components/view/ViewCollapse";
import ViewFileList from "../../../components/view/ViewFileList";
import ViewLabelStatus from "../../../components/view/ViewLabelStatus";
import ViewRow from "../../../components/view/ViewRow";
import ViewRowInterchange from "../../../components/view/ViewRowInterchange";
import ViewTextarea from "../../../components/view/ViewTextarea";
import ViewTimeline from "../../../components/view/ViewTimeline";
import { ATTRIBUTE_INPUT_TYPE, LANGUAGES } from "../../data/TestConstant";

export interface TestRowInterChagneProps {
    [key: string]: any;
}

const TestView: React.FC<TestRowInterChagneProps> = ({ id }) => {
    const collapseClass = ClassNames("my-4");
    return (
        <div className="my-4">
            <ViewCollapse label="Test view label status" defaultOpen={false} className={collapseClass}>
                <ViewLabelStatus content="Cancelled" color="#C4C4C4" />
                <ViewLabelStatus content="Pending Confirmation" color="#FAC256" className="mt-3" />
                <ViewLabelStatus content="Completed" color="#33B950" className="mt-3" />
                <ViewLabelStatus content="Delivery Processing" color="#29B3BC" className="mt-3" />
                <ViewLabelStatus content="Order Processing" color="#84C4FF" className="mt-3" />
                <ViewLabelStatus content="Pending" color="#ED6969" className="mt-3" />
                <ViewLabelStatus content="Loaded" color="#828282" className="mt-3" />
            </ViewCollapse>
            <ViewCollapse label="Row Interchange View" className={collapseClass}>
                <div className="text-bold">Row Interchange View </div>
                <ViewRowInterchange
                    dataSource={ATTRIBUTE_INPUT_TYPE[0]}
                    keyList={[
                        { id: "id", label: "ID" },
                        { id: "label", label: "Label" },
                        { id: "iconName", label: "Icon" },
                        { id: "subObject.name", label: "Sub Name" },
                        {
                            id: "subObject.children.name",
                            label: "Sub Children",
                            renderContent: ({ id, data }) => {
                                return (
                                    <div className="d-flex flex-column">
                                        <div className="py-3">{data}</div>
                                        <div className="py-3">{data}</div>
                                        <div className="py-3">{data}</div>
                                    </div>
                                );
                            },
                        },
                    ]}
                />
                <div className="text-bold my-3">Row Interchange View Variant Dashed </div>
                <ViewRowInterchange
                    dataSource={ATTRIBUTE_INPUT_TYPE[0]}
                    keyList={[
                        { id: "id", label: "ID" },
                        { id: "label", label: "Label" },
                        { id: "iconName", label: "Icon" },
                        { id: "subObject.name", label: "Sub Name" },
                        { id: "subObject.children.name", label: "Sub Children" },
                    ]}
                    variant="dashed"
                />
                <div className="text-bold my-3">Row Interchange View Variant Border </div>
                <ViewRowInterchange
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    keyList={[
                        { id: "id", label: "ID" },
                        { id: "userId", label: "User ID" },
                        { id: "title", label: "Title" },
                        { id: "body", label: "Body" },
                    ]}
                    variant="border"
                />
            </ViewCollapse>
            <ViewCollapse label="View Text Area With Show More Show Less Button" className={collapseClass}>
                <div className="text-bold my-3">View Text Area With Show More Show Less Button </div>
                <ViewTextarea limitedLength={60} width={600}>
                    {`This is Ant Design's internal standard for evaluating design quality. Based on the assumption . `}
                </ViewTextarea>
            </ViewCollapse>
            <ViewCollapse label="View Timeline" className={collapseClass}>
                <div className="text-bold my-3">View Timeline</div>
                <ViewTimeline dataSource={ATTRIBUTE_INPUT_TYPE} getContent={(item) => item?.label} />
            </ViewCollapse>
            <ViewCollapse label="View Row" className={collapseClass}>
                <div className="text-bold my-3">View Row</div>
                <ViewRow label="Width 100%" className="my-3" width="100%">
                    <InputText />
                </ViewRow>
                <ViewRow label="Width 75%" className="my-3" width="75%">
                    <InputText />
                </ViewRow>
                <ViewRow label="Width 50%" className="my-3" width="50%">
                    <InputText />
                </ViewRow>
                <ViewRow label="Width 25%" className="my-3" width="25%">
                    <InputText />
                </ViewRow>
            </ViewCollapse>
            <ViewCollapse label="View File List">
                <div className="text-bold my-3">View File List</div>
                <ViewFileList
                    uploadedFiles={LANGUAGES.map((item) => item.image)}
                    variant="square"
                    getSource={(item) => item}
                    getName={(item) => item}
                />
            </ViewCollapse>
        </div>
    );
};

export default TestView;
