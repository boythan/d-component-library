import React, { useState } from "react";
import "./App.css";
import { InputText, Select, Checkbox } from "d-component-library";

const ATTRIBUTE_INPUT_TYPE = [
    { id: "dropdown", label: "dropdown" },
    { id: "text", label: "swatchText" },
    { id: "image", label: "swatchImage" },
    { id: "color", label: "swatchColor" },
];
function App() {
    const [selectValue, setSelectValues] = useState([]);
    return (
        <div>
            <div className="container-fluid">
                <InputText label="Username" />
                <InputText label="Password" />
                {/* <Select
                    dataSource={ATTRIBUTE_INPUT_TYPE}
                    onChange={setSelectValues}
                    value={selectValue}
                    className="mt-5"
                /> */}

            </div>
        </div>
    );
}

export default App;
