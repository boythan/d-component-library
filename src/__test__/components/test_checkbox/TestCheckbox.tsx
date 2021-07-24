import React, { useState } from "react";
import Checkbox from "../../../components/checkbox/Checkbox";
import CheckboxGroup from "../../../components/checkbox/CheckboxGroup";
import RadioGroup from "../../../components/checkbox/RadioGroup";
import { ATTRIBUTE_INPUT_TYPE } from "../../data/TestConstant";

export interface TestCheckboxProps {
    [key: string]: any;
}

const TestCheckbox: React.FC<TestCheckboxProps> = ({ id }) => {
    const [checked, setChecked] = useState(false);
    const [valueSelect, setValueSelect] = useState([ATTRIBUTE_INPUT_TYPE[0].id]);
    const [radioValue, setRadioValue] = useState<any>(ATTRIBUTE_INPUT_TYPE[0]);
    return (
        <React.Fragment>
            <div className="my-5">
                <Checkbox value="123" variant="radio" label="Label value 1" />
                <Checkbox value="123" variant="checkbox" label="Label value 1" />
                <Checkbox value="123" variant="checkbox" label="Label value 1" disabled />
            </div>

            <div className="my-5">
                <CheckboxGroup
                    label="Checkbox group label"
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    value={valueSelect}
                    onChange={(value) => {
                        setValueSelect(value);
                    }}
                    numberOfColumns="1"
                />
            </div>
            <div className="my-5">
                <CheckboxGroup
                    label="Checkbox group label"
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    value={valueSelect}
                    onChange={(value) => {
                        setValueSelect(value);
                    }}
                    numberOfColumns="2"
                />
            </div>
            <div className="my-5">
                <CheckboxGroup
                    label="Checkbox group label"
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    value={valueSelect}
                    onChange={(value) => {
                        setValueSelect(value);
                    }}
                    numberOfColumns="3"
                />
            </div>
            <div className="my-5">
                <CheckboxGroup
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    value={valueSelect}
                    onChange={(value) => {
                        setValueSelect(value);
                    }}
                    numberOfColumns="4"
                />
            </div>
            <div className="my-5">
                <CheckboxGroup
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    value={valueSelect}
                    onChange={(value) => {
                        setValueSelect(value);
                    }}
                    numberOfColumns="5"
                />
            </div>
            <div className="my-5">
                <CheckboxGroup
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    value={valueSelect}
                    onChange={(value) => {
                        setValueSelect(value);
                    }}
                    numberOfColumns="6"
                />
            </div>
            <div className="my-5">
                <RadioGroup
                    label="Radio group label"
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    value={radioValue}
                    onChange={(value) => setRadioValue(value)}
                    getDisabledItem={(item) => item?.id === "color"}
                    numberOfColumns="2"
                />
            </div>
        </React.Fragment>
    );
};

export default TestCheckbox;
