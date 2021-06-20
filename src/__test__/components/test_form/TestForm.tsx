/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from "formik";
import React, { useState } from "react";
import Form, { IFormItemData } from "../../../components/form/Form";
import Notifications from "../../../components/notifications/Notifications";
import SelectInfinity from "../../../components/select/SelectInfinity";
import Messages from "../../../language/Messages";

export interface ITestFormProps {
    [key: string]: any;
}

export interface IEmployeePrivacyInfo {
    citizenId?: string;
    nationality?: any;
    passportId?: string;
    passportExp?: any;
    religion?: any;
    maritalStatus?: any;
    noOfChild?: any;
}

const FORM_DATA: IFormItemData<IEmployeePrivacyInfo>[] = [
    {
        rowsId: "citizenId&nationality",
        label: "citizenId",
        type: "inputText",
        key: "citizenId",
    },
    {
        rowsId: "citizenId&nationality",
        label: "nationality",
        key: "nationality",
        type: "select",
        dataSource: [],
    },
    {
        rowsId: "passportId&passportExp",
        label: "passportId",
        key: "passportId",
        type: "inputText",
    },
    {
        rowsId: "passportId&passportExp",
        label: "passportExp",
        type: "date",
        key: "passportExp",
    },
    {
        rowsId: "religion&maritalStatus",
        label: "religion",
        key: "religion",
        type: "select",
    },
    {
        rowsId: "religion&maritalStatus",
        label: "maritalStatus",
        key: "maritalStatus",
        type: "select",
    },
    {
        rowsId: "noOfChild",
        label: "noOfChild",
        key: "noOfChild",
        type: "inputText",
        classNameRow: "w-50 pr-3",
        inputType: "number",
        onChangeValidate: ({ value, key }: any) => {
            if (value > 10) {
                Notifications.showError("Number of child can not greater than 10");
                return false;
            }
            return true;
        },
    },
];

const FORM_WITH_CUSTOM_ITEM: IFormItemData<IEmployeePrivacyInfo>[] = [
    {
        rowsId: "citizenId&nationality",
        label: "citizenId",
        type: "inputText",
        key: "citizenId",
    },
    {
        rowsId: "citizenId&nationality",
        label: "nationality",
        key: "nationality",
        type: "select",
        dataSource: [],
        render: (
            <SelectInfinity
                label="Select Infinity"
                className="my-4"
                source={async (paging) => {
                    // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                    return fetch("https://jsonplaceholder.typicode.com/posts");
                }}
                transformer={async (res) => {
                    // const data = JSON.stringify(res);
                    const data = await res.json();
                    const cloneData = data.map((item: any = {}) => ({
                        ...item,
                        label: item?.title,
                        value: item?.title,
                        key: item?.id,
                    }));
                    return cloneData as any;
                }}
            />
        ),
    },
];

const TestForm: React.FC<ITestFormProps> = ({ id }) => {
    const [formState, setFormState] = useState<any>({});
    const formik = useFormik<IEmployeePrivacyInfo>({
        initialValues: {},
        onSubmit: () => {},
    });
    return (
        <div className="">
            <div className="h3 my-2"> Form with validate before change: </div>
            <Form
                Messages={Messages}
                dataSource={FORM_DATA}
                formik={formik as any}
                getRowClass={(i) => (i === 3 ? "w-50 pr-1" : "")}
                className="my-4"
            />
            <div className="h3 my-2"> Form with custom form item: </div>
            <Form
                Messages={Messages}
                dataSource={FORM_WITH_CUSTOM_ITEM}
                formik={formik as any}
                getRowClass={(i) => (i === 3 ? "w-50 pr-1" : "")}
                className="my-4"
            />
            <div className="h3 my-2"> Form not using formik: </div>
            <Form
                Messages={Messages}
                dataSource={FORM_WITH_CUSTOM_ITEM}
                getRowClass={(i) => (i === 3 ? "w-50 pr-1" : "")}
                className="my-4"
                value={formState}
                onChange={(key, value) => setFormState({ ...formState, [key]: value })}
            />
        </div>
    );
};

export default TestForm;