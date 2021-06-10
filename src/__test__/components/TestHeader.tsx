import React, { useState } from "react";
import Header from "../../components/header/Header";
import HeaderBlock from "../../components/header/HeaderBlock";
import HeaderTable from "../../components/header/HeaderTable";
import Select from "../../components/select/Select";
import { ATTRIBUTE_INPUT_TYPE } from "../data/TestConstant";

const TestHeader = () => {
    const [valueSelect, setValueSelect] = useState();

    const customRight = () => {
        return <div>custom right</div>;
    };

    return (
        <div className="bg-muted">
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
            <HeaderBlock title="Block Title" showArrow />
            <HeaderBlock title="Block Title" className="my-3" />
            <HeaderBlock title="Block Title" className="my-3" customRight={customRight()} />
        </div>
    );
};

export default TestHeader;
