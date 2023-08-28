import React, { useState } from "react";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";
import ViewRow from "../../../components/view/ViewRow";
import { ATTRIBUTE_INPUT_TYPE, LANGUAGES } from "../../data/TestConstant";

export interface TestDropdownProps {
    [key: string]: any;
}

const TestDropdown: React.FC<TestDropdownProps> = ({ id }) => {
    const [selectedDropdown, setSelectedDropdown] = useState<any>(ATTRIBUTE_INPUT_TYPE[0]);
    const [selectedLanguages, setSelectedLanguages] = useState<any>(LANGUAGES[0]);
    const [selectCustomDropdown, setSelectCustomDropdown] = useState<any>();
    const [selectMultiChoices, setSelectMultiChoices] = useState<any[]>();
    return (
        <div className="d-flex flex-column my-4">
            <ViewRow label="Default Dropdown" className="my-4 border-bottom p-3">
                <Dropdown dataSource={ATTRIBUTE_INPUT_TYPE} position="left-edge" activeOnHover />
            </ViewRow>
            <ViewRow label="Dropdown Variant View" className="my-4 border-bottom p-3">
                <Dropdown
                    dataSource={LANGUAGES}
                    variant="view"
                    value={selectedLanguages}
                    onClick={(lang) => {
                        setSelectedLanguages(lang);
                        document.documentElement.lang = lang.id as string;
                    }}
                />
            </ViewRow>
            <ViewRow label="Dropdown With Custom View" className="my-4 border-bottom p-3">
                <Dropdown
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    variant="button"
                    value={selectMultiChoices}
                    onClick={(item) => setSelectCustomDropdown(item)}
                    onChange={(value) => setSelectMultiChoices(value)}
                    buttonProps={{
                        iconName: "visibility",
                        style: { minWidth: "150px" },
                        suffixIcon: "arrow_drop_down",
                        variant: "trans",
                        content: "Select Layout",
                    }}
                    multiple
                    showSelectIndicator
                    // classNameMenuItem="text-nowrap"
                    activeOnHover
                    closeAfterSelect={false}
                />
            </ViewRow>
            <ViewRow label="Drop Down With Children View" className="my-4 border-bottom p-3">
                <Dropdown
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    variant="view"
                    value={selectCustomDropdown}
                    onClick={(item) => setSelectCustomDropdown(item)}
                >
                    <Button
                        iconName="update"
                        content={selectCustomDropdown ? selectCustomDropdown?.label : "Click Dropdown"}
                    />
                </Dropdown>
            </ViewRow>

            <p>
                Almost before we knew it, we had left the ground. Thin 100 italic Almost before we knew it, we had left
                the ground. Light 300 Almost before we knew it, we had left the ground. Light 300 italic Almost before
                we knew it, we had left the ground. Regular 400 Almost before we knew it, we had left the ground.
                Regular 400 italic Almost before we knew it, we had left the ground. Medium 500
            </p>
        </div>
    );
};

export default TestDropdown;
