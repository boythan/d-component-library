import React from "react";
import RowInterchangeView from "../../../components/view/RowInterchangeView";
import { ATTRIBUTE_INPUT_TYPE } from "../../data/TestConstant";

export interface TestRowInterChagneProps {
    [key: string]: any;
}

const TestView: React.FC<TestRowInterChagneProps> = ({ id }) => {
    return (
        <div className="my-4">
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
        </div>
    );
};

export default TestView;
