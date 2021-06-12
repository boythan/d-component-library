import React from "react";
import RowInterchangeView from "../../../components/view/RowInterchangeView";
import ViewCollapse from "../../../components/view/ViewCollapse";
import ViewTextarea from "../../../components/view/ViewTextarea";
import { ATTRIBUTE_INPUT_TYPE } from "../../data/TestConstant";

export interface TestRowInterChagneProps {
    [key: string]: any;
}

const TestView: React.FC<TestRowInterChagneProps> = ({ id }) => {
    return (
        <div className="my-4">
            <ViewCollapse label="Test collapse view">
                <RowInterchangeView
                    dataSource={ATTRIBUTE_INPUT_TYPE[0]}
                    keyList={[
                        { id: "id", label: "ID" },
                        { id: "label", label: "Label" },
                        { id: "iconName", label: "Icon" },
                        { id: "subObject.name", label: "Sub Name" },
                        { id: "subObject.children.name", label: "Sub Children" },
                    ]}
                />
                <RowInterchangeView
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
                <RowInterchangeView
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    keyList={[
                        { id: "id", label: "ID" },
                        { id: "userId", label: "User ID" },
                        { id: "title", label: "Title" },
                        { id: "body", label: "Body" },
                    ]}
                    variant="border"
                />
                <ViewTextarea>
                    {`This is Ant Design's internal standard for evaluating design quality. Based on the assumption that
                "everyone is pursuing happiness at work", we have added the two values of "Meaningfulness" and "Growth"
                on the basis of "Certainty" and "Naturalness" to guide each designer towards better judgment and
                decision-making.`}
                </ViewTextarea>
            </ViewCollapse>
        </div>
    );
};

export default TestView;
