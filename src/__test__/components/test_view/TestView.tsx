import ClassNames from "classnames";
import React from "react";
import Collapse from "../../../components/collapse/Collapse";
import InputText from "../../../components/input/InputText";
import ViewCollapse from "../../../components/view/ViewCollapse";
import ViewFileList, { FilePreview } from "../../../components/view/ViewFileList";
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
            <ViewCollapse label="Row Interchange View" className={collapseClass} defaultOpen={false}>
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
            <ViewCollapse
                label="View Text Area With Show More Show Less Button"
                className={collapseClass}
                defaultOpen={false}
            >
                <div className="text-bold my-3">View Text Area With Show More Show Less Button </div>
                <ViewTextarea limitedLength={300}>
                    {`show more/Less text with just HTML and JavaScript - SyntaxFixhttps://syntaxfix.com › Question
Dịch trang này
I am needing to create a show more/less text function, but with just ... hiding the show link when it is selected: */ #textarea + ul.controls .hide, ...
8 câu trả lờiJ
Câu trả lời hàng đầu: 
My answer is similar but different there are a few ways to achieve toggling effect I ...

How To Create a Read More Read Less Button - W3Schoolshttps://www.w3schools.com › howto › h...
Dịch trang này
Learn how to create a "read more - read less" button with JavaScript. Example Text. Lorem ipsum dolor sit amet, ... if (dots.style.display === "none") { `}
                </ViewTextarea>
            </ViewCollapse>
            <ViewCollapse label="View Timeline" className={collapseClass} defaultOpen={false}>
                <div className="text-bold my-3">View Timeline</div>
                <ViewTimeline dataSource={ATTRIBUTE_INPUT_TYPE} getContent={(item) => item?.label} />
            </ViewCollapse>
            <ViewCollapse label="View Row" className={collapseClass} defaultOpen={false}>
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
            <ViewCollapse label="View File List" defaultOpen={false}>
                <div className="text-bold my-3">View File List</div>
                <ViewFileList
                    uploadedFiles={LANGUAGES.map((item) => item.image)}
                    variant="square"
                    getSource={(item) => item}
                    getName={(item) => item}
                />
                <div>
                    {LANGUAGES.map((item) => {
                        return <FilePreview src={item.image} size="medium" removable hasLightBox />;
                    })}
                </div>
            </ViewCollapse>
            <Collapse>
                <ViewTimeline dataSource={ATTRIBUTE_INPUT_TYPE} getContent={(item) => item?.label} />
            </Collapse>
        </div>
    );
};

export default TestView;
