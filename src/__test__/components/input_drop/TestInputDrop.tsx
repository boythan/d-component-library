import React, { useState } from "react";
import InputDropCheckboxGroup from "../../../components/inputDrop/InputDropCheckboxGroup";
import InputDropSelect from "../../../components/inputDrop/InputDropSelect";
import { ATTRIBUTE_INPUT_TYPE } from "../../data/TestConstant";

export interface TestInputDropProps {
    [key: string]: any;
}
const TestInputDrop: React.FC<TestInputDropProps> = ({ id }) => {
    const [quickFilterValue, setQuickValue] = useState<any[]>([]);
    return (
        <div>
            <InputDropSelect
                dataSource={ATTRIBUTE_INPUT_TYPE}
                className="my-4"
                label="Input Drop Select Multiple"
                value={quickFilterValue}
                onChange={setQuickValue}
            />
            <div className="d-flex justify-content-end ">
                <InputDropSelect
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    className="my-4"
                    label="Input Drop Select Single"
                    value={quickFilterValue}
                    onChange={setQuickValue}
                    multiple={false}
                />
            </div>

            <InputDropCheckboxGroup
                dataSource={ATTRIBUTE_INPUT_TYPE}
                className="my-4"
                label="Select Checkbox Right Edge"
                value={quickFilterValue}
                onChange={setQuickValue}
                multiple={false}
            />

            <InputDropCheckboxGroup
                dataSource={ATTRIBUTE_INPUT_TYPE}
                className="my-4"
                label="Select Checkbox Right Edge"
                value={quickFilterValue}
                onChange={setQuickValue}
                error="Please select"
            />
        </div>
    );
};

export default TestInputDrop;
