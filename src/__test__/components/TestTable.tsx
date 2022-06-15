/* eslint-disable max-len */
import React, { useState } from "react";
import Button from "../../components/button/Button";
import Dropdown from "../../components/dropdown/Dropdown";
import HeaderTable from "../../components/header/HeaderTable";
import AwesomeTableComponent, { IColumnsProps, Summary } from "../../components/table/AwesomeTableComponent";
import { ATTRIBUTE_INPUT_TYPE } from "../data/TestConstant";

const TestTable = () => {
    const [selectingRows, setSelectingRows] = useState<any>([]);
    const [dataSource, setDataSource] = useState(ATTRIBUTE_INPUT_TYPE);
    const columns: IColumnsProps = [
        {
            title: () => "Id",
            dataIndex: "id",
            width: 300,
            render: () => {
                return <Dropdown dataSource={ATTRIBUTE_INPUT_TYPE} />;
            },
        },
        {
            title: "Name",
            mobileTitle: "Mobile name",
            dataIndex: "label",
            width: 300,
            sorter: true,
        },
        {
            title: "Age",

            dataIndex: "label",
        },
        {
            title: "Sex",

            dataIndex: "label",
        },
        {
            title: "DOB",
            dataIndex: "label",
        },
        {
            title: "BF",
            dataIndex: "label",
        },
        {
            title: "Single",
            dataIndex: "label",
        },
        {
            title: "Skin",
            dataIndex: "label",
        },
        {
            title: "Hair color",
            dataIndex: "label",
        },
        {
            title: "Eyes color",
            dataIndex: "label",
        },
        {
            title: "Action",

            render: () => {
                return (
                    <Dropdown
                        dataSource={ATTRIBUTE_INPUT_TYPE}
                        buttonProps={{ style: { width: "200px" }, iconName: "add" }}
                    />
                );
            },
        },
    ];

    const onClickRemove = () => {
        const result = [...dataSource];
        result.length = dataSource.length - 1;
        setDataSource(result);
    };

    const renderSummary = () => {
        return (
            <Summary.Row className="w-100">
                <Summary.Cell className="text-right font-weight-bold" index={1} align="left" colSpan={3}>
                    Total
                </Summary.Cell>
                <Summary.Cell className="text-center font-weight-bold" index={10}>
                    123
                </Summary.Cell>
                <Summary.Cell className="text-center font-weight-bold" index={10}>
                    123
                </Summary.Cell>
            </Summary.Row>
        );
    };

    return (
        <div className="my-4">
            <HeaderTable
                label="Test Table"
                onChangeText={() => {}}
                onClickFilter={() => {}}
                onSubmitSearch={() => {
                    console.log("on submit text search");
                }}
            />
            <AwesomeTableComponent
                source={(paging, sorter) => {
                    return Promise.resolve(ATTRIBUTE_INPUT_TYPE);
                }}
                transformer={(res) => ATTRIBUTE_INPUT_TYPE}
                columns={columns}
                keyTableLayout="TEST TnABLE"
                // rowSelection={{ onChange: (value) => setSelectingRows(value) }}
                // selectingRows={selectingRows}
                // onSelectionView={() => {
                //     return (
                //         <div>
                //             <Button variant="outline" content="Approve All" />
                //         </div>
                //     );
                // }}
                pagination={{ pageSize: 5, pageSizeOptions: ["5", "10", "15"] }}
                getTotalItems={(res) => res?.length}
                isPagination={false}
                tableLayout="auto"
                bordered={false}
                showSelectColumn
                summary={() => renderSummary()}
            />

            <AwesomeTableComponent
                columns={columns}
                dataSource={dataSource}
                tableLayout="auto"
                summary={() => renderSummary()}
            />
            <Button content="Remove" onClick={onClickRemove} />
        </div>
    );
};

export default TestTable;
