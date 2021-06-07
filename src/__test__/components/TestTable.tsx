import React, { useState } from "react";
import Button from "../../components/button/Button";
import HeaderTable from "../../components/header/HeaderTable";
import AwesomeTableComponent, { AwesomeTableComponentProps } from "../../components/table/AwesomeTableComponent";
import { ATTRIBUTE_INPUT_TYPE } from "../data/TestConstant";

const TestTable = () => {
    const [selectingRows, setSelectingRows] = useState<any>([]);
    const [dataSource, setDataSource] = useState(ATTRIBUTE_INPUT_TYPE);
    const columns: AwesomeTableComponentProps["columns"] = [
        {
            title: () => <h5>ID</h5>,
            dataIndex: "id",
        },
        {
            title: "Label",
            align: "center",
            dataIndex: "label",
        },
        {
            title: "Name",
            align: "center",
            dataIndex: "label",
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
    ];

    const onClickRemove = () => {
        const result = [...dataSource];
        result.length = dataSource.length - 1;
        setDataSource(result);
    };

    return (
        <div className="my-4">
            <HeaderTable label="Test Table" onChangeText={() => {}} onClickFilter={() => {}} />
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
            />

            <AwesomeTableComponent columns={columns} showSelectColumn dataSource={dataSource} />
            <Button content="Remove" onClick={onClickRemove} />
        </div>
    );
};

export default TestTable;
