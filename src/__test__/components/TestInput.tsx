import React, { useState } from "react";
import InputText from "../../components/input/InputText";
import InputTextSearch from "../../components/input/InputTextSearch";
import { Select } from "../../dcomponent";
import { SELECT_DATA } from "../data/TestConstant";

const TestInput = () => {
    const [valueSelect, setValueSelect] = useState([]);

    return (
        <div className="my-4">
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" type="number" />
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" error="Error Text" />
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" disabled />
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" suffix="$" />
            <InputText label="Input Text" placeholder="Please enter" className="mt-3" prefix="$" />
            <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" />
            <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" error="Error Text" />
            <InputText label="Input Text" placeholder="Please enter" multiple className="mt-3" disabled />
            <InputTextSearch placeholder="Please enter" className="mt-3" />

            <Select
                dataSource={SELECT_DATA}
                label="Select"
                className="mt-4"
                value={valueSelect}
                onChange={setValueSelect}
                multiple
            />
        </div>
    );
};

export default TestInput;
