import React from "react";
import AwesomeTableComponent, { AwesomeTableComponentProps } from "../../components/table/AwesomeTableComponent";
import { ATTRIBUTE_INPUT_TYPE } from "../data/TestConstant";

const TestTable = () => {
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
    return (
        <div className="d-flex my-4">
            <AwesomeTableComponent
                source={(paging) => {
                    return Promise.resolve();
                }}
                transformer={(res) => ATTRIBUTE_INPUT_TYPE}
                columns={columns}
                showSelectColumn
                keyTableLayout="TEST TABLE"
            />
        </div>
    );
};

export default TestTable;
