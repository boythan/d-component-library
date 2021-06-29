import React, { useState } from "react";
import InputText from "../../components/input/InputText";
import InputTextSearch from "../../components/input/InputTextSearch";
import InputColor from "../../components/input/InputColor";
import ViewCollapse from "../../components/view/ViewCollapse";
import { Select } from "../../dcomponent";
import { ATTRIBUTE_INPUT_TYPE, SELECT_DATA } from "../data/TestConstant";
import SelectInfinity from "../../components/select/SelectInfinity";
import DateInput from "../../components/dateInput/DateInput";
import SelectCheckbox from "../../components/select/SelectCheckbox";

const TestInput = () => {
    const [valueSelect, setValueSelect] = useState([]);
    const [valueTextInput, setValueTextInput] = useState([]);
    const [valueSelectInfinity, setValueSelectInfinity] = useState<any>();
    const [selectCheckboxValue, setSelectCheckboxValue] = useState<any>([]);

    return (
        <div className="my-4">
            <ViewCollapse label="Input Text" defaultOpen={false}>
                <InputText label="Input Text" placeholder="Please enter" className="mt-3" type="number" />
                <InputText label="Input Text" placeholder="Please enter" className="mt-3" error="Error Text" />
                <InputText label="Input Text" placeholder="Please enter" className="mt-3" disabled />
                <InputText label="Input Text" placeholder="Please enter" className="mt-3" suffix="$" />
                <InputText label="Input Text" placeholder="Please enter" className="mt-3" prefix="$" />
                <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" />
                <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" error="Error Text" />
                <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" disabled />
            </ViewCollapse>

            <ViewCollapse label="Input Text Search" className="mt-3" defaultOpen={false}>
                <InputTextSearch placeholder="Please enter" className="mt-3" />
            </ViewCollapse>
            <ViewCollapse label="Input Color" className="mt-3" defaultOpen={false}>
                <InputColor
                    label="Input color"
                    value={valueTextInput}
                    onChange={(event) => {
                        console.log("event.target.value", event.target.value);
                        setValueTextInput(event.target.value);
                    }}
                />
                <InputColor label="Input color" error="Color Require!" />
            </ViewCollapse>

            <ViewCollapse label="Input Date" className="mt-3" defaultOpen={false}>
                <DateInput variant="outline" className="w-100" label="Range Date" />
                <DateInput
                    variant="outline"
                    className="mt-3 w-100"
                    label="Range Date"
                    useButton
                    onChange={(value) => console.log({ value })}
                    isRangePicker
                />
            </ViewCollapse>

            <ViewCollapse label="Select" className="mt-3" defaultOpen={false}>
                <Select
                    dataSource={SELECT_DATA}
                    label="Select"
                    className="mt-4"
                    value={valueSelect}
                    onChange={setValueSelect}
                    multiple
                />

                <Select
                    dataSource={SELECT_DATA}
                    label="Select Tags"
                    className="mt-4"
                    value={valueSelect}
                    onChange={setValueSelect}
                    mode="tags"
                    getValue={(item) => item.id}
                />
                <SelectInfinity
                    label="Select Infinity"
                    className="my-4"
                    source={async (paging) => {
                        // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                        return fetch("https://jsonplaceholder.typicode.com/posts");
                    }}
                    transformer={async (res) => {
                        // const data = JSON.stringify(res);
                        const data = await res.json();
                        const cloneData = data.map((item: any = {}) => ({
                            ...item,
                            label: item?.title,
                            value: item?.title,
                            key: item?.id,
                        }));
                        return cloneData as any;
                    }}
                    value={valueSelectInfinity}
                    onChange={setValueSelectInfinity}
                    mode="multiple"
                />
            </ViewCollapse>
            <SelectCheckbox
                dataSource={ATTRIBUTE_INPUT_TYPE}
                className="my-4"
                label="Select Checkbox"
                value={selectCheckboxValue}
                onChange={(value) => setSelectCheckboxValue(value)}
                showHeader
            />
            <SelectCheckbox
                dataSource={ATTRIBUTE_INPUT_TYPE}
                className="my-4"
                label="Select Checkbox Right Edge"
                position="right-edge"
                value={selectCheckboxValue}
                onChange={(value) => setSelectCheckboxValue(value)}
            />
        </div>
    );
};

export default TestInput;
