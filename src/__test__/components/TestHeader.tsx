import React, { useState } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Header from "../../components/header/Header";
import HeaderBlock from "../../components/header/HeaderBlock";
import HeaderDetail from "../../components/header/HeaderDetail";
import HeaderTable from "../../components/header/HeaderTable";
import Select from "../../components/select/Select";
import { ATTRIBUTE_INPUT_TYPE, DELIVERY_STATUS_LIST } from "../data/TestConstant";

const TestHeader = () => {
    const [valueSelect, setValueSelect] = useState();

    const customRight = () => {
        return <div>custom right</div>;
    };

    const breadcrumb = [{ title: "All Product", url: "/" }, { title: "Product detail" }];

    return (
        <div className="bg-muted">
            <HeaderTable
                // label="Product table"
                onChangeText={() => {}}
                onClickFilter={() => {}}
                // onClickExport={() => {}}
                // onClickImport={() => {}}
                // onClickNew={() => {}}
                disabledSearch={!valueSelect}
                isFiltered
                customView={() => (
                    <Select dataSource={ATTRIBUTE_INPUT_TYPE} value={valueSelect} onChange={setValueSelect} />
                )}
                classNameTop="my-0"
            />

            <Breadcrumb breadcrumb={breadcrumb as any} className="py-3" />

            <Header title="Header example" breadcrumb={breadcrumb} />
            <HeaderBlock title="Block Title" showArrow />
            <HeaderBlock title="Block Title" className="my-3" />
            <HeaderBlock title="Block Title" className="my-3" customRight={customRight()} />
            <HeaderDetail
                listStatus={DELIVERY_STATUS_LIST}
                subTitle="Applied on 16/12/2002"
                status="pending"
                className="my-4"
                title="Header Detail"
                user={{ fullName: "Admin" }}
                created={new Date().valueOf()}
                avatarNameProps={{
                    customName: ({ name, className }) => <div className="font-weight-bold">{name}</div>,
                }}
            />
        </div>
    );
};

export default TestHeader;
