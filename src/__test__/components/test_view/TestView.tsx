import React from "react";
import InputText from "../../../components/input/InputText";
import ViewRowInterchange from "../../../components/view/ViewRowInterchange";
import ViewCollapse from "../../../components/view/ViewCollapse";
import ViewRow from "../../../components/view/ViewRow";
import ViewTextarea from "../../../components/view/ViewTextarea";
import ViewTimeline from "../../../components/view/ViewTimeline";
import { ATTRIBUTE_INPUT_TYPE } from "../../data/TestConstant";
import ViewLabelStatus from "../../../components/view/ViewLabelStatus";

export interface TestRowInterChagneProps {
    [key: string]: any;
}

const TestView: React.FC<TestRowInterChagneProps> = ({ id }) => {
    return (
        <div className="my-4">
            <ViewCollapse label="Test view label status" defaultOpen={false}>
                <ViewLabelStatus content="Cancelled" color="#C4C4C4" />
                <ViewLabelStatus content="Pending Confirmation" color="#FAC256" className="mt-3" />
                <ViewLabelStatus content="Completed" color="#33B950" className="mt-3" />
                <ViewLabelStatus content="Delivery Processing" color="#29B3BC" className="mt-3" />
                <ViewLabelStatus content="Order Processing" color="#84C4FF" className="mt-3" />
                <ViewLabelStatus content="Pending" color="#ED6969" className="mt-3" />
                <ViewLabelStatus content="Loaded" color="#828282" className="mt-3" />
            </ViewCollapse>
            <ViewCollapse label="Test collapse view">
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
                                console.log(data[id]);
                                return (
                                    <div className="d-flex flex-column">
                                        <div className="py-3">{data.id}</div>
                                        <div className="py-3">{data.id}</div>
                                        <div className="py-3">{data.id}</div>
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
                <div className="text-bold my-3">View Text Area With Show More Show Less Button </div>
                <ViewTextarea limitedLength={60} width={600}>
                    {`This is Ant Design's internal standard for evaluating design quality. Based on the assumption . `}
                </ViewTextarea>
                <div className="text-bold my-3">View Timeline</div>
                <ViewTimeline dataSource={ATTRIBUTE_INPUT_TYPE} getContent={(item) => item?.label} />
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
        </div>
    );
};

export default TestView;
