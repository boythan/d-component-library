import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import DateInput from "../../components/dateInput/DateInput";
import InputColor from "../../components/input/InputColor";
import InputText from "../../components/input/InputText";
import InputTextSearch from "../../components/input/InputTextSearch";
import SelectInfinity from "../../components/select/SelectInfinity";
import ViewCollapse from "../../components/view/ViewCollapse";
import { Select } from "../../dcomponent";
import UrlUtils from "../../utils/UrlUtils";
import { SELECT_DATA } from "../data/TestConstant";

const TestInput = () => {
    const [valueSelect, setValueSelect] = useState(["text"]);
    const [valueTextInput, setValueTextInput] = useState([]);
    const [valueSelectInfinity, setValueSelectInfinity] = useState<any>();
    const [selectCheckboxValue, setSelectCheckboxValue] = useState<any>([]);
    const [rangeDate, setRangeDate] = useState<any>();
    const [rangeTime, setRangeTime] = useState<any>();

    console.log({ rangeDate });
    console.log({ rangeTime });

    useEffect(() => {
        const query = UrlUtils.getQuery();
        const infinityValue = query?.infinity ?? null;
        if (infinityValue) {
            const parse = JSON.parse(infinityValue as any);
            setValueSelectInfinity(parse);
        }
    }, []);

    return (
        <div className="my-4">
            <ViewCollapse label="Input Text" defaultOpen={false}>
                <InputText label="Input Text" placeholder="Please enter" className="mt-3" type="number" required />
                <InputText label="Input Text" placeholder="Please enter" className="mt-3" error="Error Text" />
                <InputText label="Input Text" placeholder="Please enter" className="mt-3" disabled />
                <InputText label="Input Text" placeholder="Please enter" className="mt-3" suffix="$" />
                <InputText label="Input Text" placeholder="Please enter" className="mt-3" prefix="$" />
                <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" />
                <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" error="Error Text" />
                <InputText
                    label="Input Text"
                    placeholder="Please enter"
                    multiple
                    className="mt-3"
                    disabled
                    value="sample input text"
                />
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
                <DateInput
                    variant="outline"
                    className="w-100"
                    label="Range Date"
                    type="time"
                    placeholder="123"
                    required
                />
                <DateInput
                    variant="outline"
                    className="mt-3 w-100"
                    label="Range Date"
                    onChange={(value) => setRangeDate(value)}
                    value={rangeDate}
                    type="date"
                    isRangePicker
                />
                <DateInput
                    variant="outline"
                    className="mt-3 w-100"
                    label="Range Time Picker"
                    onChange={(value) => setRangeTime(value)}
                    type="time"
                    isRangePicker
                    value={rangeTime}
                />
            </ViewCollapse>

            <ViewCollapse label="Select" className="mt-3" defaultOpen={false}>
                <Select
                    dataSource={SELECT_DATA}
                    label="Select"
                    className="mt-4"
                    value={valueSelect}
                    onChange={setValueSelect}
                    required
                    disabled
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

                <div className="w-100 d-flex flex-column my-3">
                    <Button
                        className="align-self-end"
                        onClick={() => UrlUtils.replaceState({ infinity: JSON.stringify(valueSelectInfinity) })}
                    >
                        Save
                    </Button>
                </div>
            </ViewCollapse>
            <div className="w-100 flex-center-y">
                <Select
                    dataSource={SELECT_DATA}
                    label="Select Tags"
                    className="w-100 mr-2"
                    value={valueSelect}
                    onChange={setValueSelect}
                    mode="tags"
                    getValue={(item) => item.id}
                    error="Text Error"
                />
            </div>
            <div className="w-100 flex-center-y">
                <SelectInfinity
                    label="Select Infinity"
                    className="my-4 w-100"
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
                            value: item?.id,
                            key: item?.id,
                        }));
                        return cloneData as any;
                    }}
                    value={valueSelectInfinity}
                    onChange={setValueSelectInfinity}
                    mode="multiple"
                />
            </div>
        </div>
    );
};

export default TestInput;
