import React, { useState } from "react";
import Header from "../../components/header/Header";
import HeaderTable from "../../components/header/HeaderTable";
import Select from "../../components/select/Select";
import { ATTRIBUTE_INPUT_TYPE } from "../data/TestConstant";

const TestHeader = () => {
    const [valueSelect, setValueSelect] = useState();

    return (
        <div>
            <HeaderTable
                label="Product table"
                onChangeText={() => {}}
                onClickExport={() => {}}
                onClickFilter={() => {}}
                onClickImport={() => {}}
                onClickNew={() => {}}
                disabledSearch={!valueSelect}
                isFiltered
                customView={() => (
                    <Select dataSource={ATTRIBUTE_INPUT_TYPE} value={valueSelect} onChange={setValueSelect} />
                )}
            />

            <Header title="Header example" />
        </div>
    );
};

export default TestHeader;
