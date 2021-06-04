import React, { useState } from "react";
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
                onClickNew={() => {}}
                disabledSearch={!valueSelect}
                isFiltered
                customView={() => (
                    <Select
                        dataSource={ATTRIBUTE_INPUT_TYPE}
                        value={valueSelect}
                        onChange={setValueSelect}
                        className="mr-3"
                    />
                )}
            />
        </div>
    );
};

export default TestHeader;
