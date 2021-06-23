import React, { useState } from "react";
import Dropdown from "../../../components/dropdown/Dropdown";
import { ATTRIBUTE_INPUT_TYPE, LANGUAGES } from "../../data/TestConstant";

export interface TestDropdownProps {
    [key: string]: any;
}

const TestDropdown: React.FC<TestDropdownProps> = ({ id }) => {
    const [selectedDropdown, setSelectedDropdown] = useState<any>(ATTRIBUTE_INPUT_TYPE[0]);
    const [selectedLanguages, setSelectedLanguages] = useState<any>(LANGUAGES[0]);
    return (
        <div className="d-flex flex-column my-4">
            <Dropdown dataSource={ATTRIBUTE_INPUT_TYPE} position="left-edge" />
            <Dropdown
                dataSource={ATTRIBUTE_INPUT_TYPE}
                variant="view"
                // value={selectedDropdown}
                onClick={(item) => setSelectedDropdown(item)}
                buttonProps={{ iconName: "add", style: { minWidth: "200px" } }}
            />
            <Dropdown
                dataSource={LANGUAGES}
                variant="view"
                value={selectedLanguages}
                onClick={(lang) => {
                    setSelectedLanguages(lang);
                    document.documentElement.lang = lang.id as string;
                }}
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

export default TestDropdown;
