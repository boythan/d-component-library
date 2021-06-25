/* eslint-disable max-len */
import React, { useState } from "react";
import { Dropdown as DropdownAnt } from "antd";
import Button from "../../components/button/Button";
import HeaderTable from "../../components/header/HeaderTable";
import AwesomeTableComponent, {
    AwesomeTableComponentProps,
    IColumnsProps,
} from "../../components/table/AwesomeTableComponent";
import ViewTextarea from "../../components/view/ViewTextarea";
import { ATTRIBUTE_INPUT_TYPE } from "../data/TestConstant";
import Dropdown from "../../components/dropdown/Dropdown";

const TestTable = () => {
    const [selectingRows, setSelectingRows] = useState<any>([]);
    const [dataSource, setDataSource] = useState(ATTRIBUTE_INPUT_TYPE);
    const columns: IColumnsProps = [
        {
            title: () => <h5>ID</h5>,
            dataIndex: "id",
            width: 300,
            render: () => {
                return <Dropdown dataSource={ATTRIBUTE_INPUT_TYPE} position="left-edge" />;
            },
        },
        // {
        //     title: "Label",
        //     align: "center",
        //     dataIndex: "label",
        //     width: 300,
        //     render: (label) => {
        //         return (
        //             <div>
        //                 <ViewTextarea limitedLength={20}>
        //                     {`This is Ant Design's internal standard for evaluating design quality. Based on the assumption that
        //         "everyone is pursuing happiness at work", we have added the two values of "Meaningfulness" and "Growth"
        //         on the basis of "Certainty" and "Naturalness" to guide each designer towards better judgment and
        //         decision-making.`}
        //                     {/* {label} */}
        //                 </ViewTextarea>
        //             </div>
        //         );
        //     },
        // },
        {
            title: "Name",
            align: "center",
            dataIndex: "label",
            width: 300,
        },
        {
            title: "Age",
            align: "center",
            dataIndex: "label",
        },
        {
            title: "Sex",
            align: "center",
            dataIndex: "label",
        },
        {
            title: "DOB",
            align: "center",
            dataIndex: "label",
        },
        {
            title: "DOB Test",
            align: "center",
            dataIndex: "label",
        },
        {
            title: "Action",
            align: "center",
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
                source={(paging) => {
                    return Promise.resolve(ATTRIBUTE_INPUT_TYPE);
                }}
                transformer={(res) => ATTRIBUTE_INPUT_TYPE}
                columns={columns}
                showSelectColumn
                keyTableLayout="TEST TABLE"
                rowSelection={{ onChange: (value) => setSelectingRows(value) }}
                selectingRows={selectingRows}
                onSelectionView={() => {
                    return (
                        <div>
                            <Button variant="outline" content="Approve All" />
                        </div>
                    );
                }}
                pagination={{ pageSize: 5, pageSizeOptions: ["5", "10", "15"] }}
                getTotalItems={(res) => res?.length}
                isPagination={false}
                tableLayout="auto"
                bordered={false}
            />

            <AwesomeTableComponent columns={columns} showSelectColumn dataSource={dataSource} tableLayout="auto" />
            <Button content="Remove" onClick={onClickRemove} />
        </div>
    );
};

export default TestTable;
