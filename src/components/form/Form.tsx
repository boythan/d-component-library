/* eslint-disable indent */
import ClassNames from "classnames";
import _ from "lodash";
import moment from "moment";
import React, { useMemo } from "react";
import CheckboxGroup from "../checkbox/CheckboxGroup";
import RadioGroup from "../checkbox/RadioGroup";
import DateInput from "../dateInput/DateInput";
import InputText from "../input/InputText";
import Select from "../select/Select";

export type IFormItemType =
    | "checkbox"
    | "inputText"
    | "select"
    | "multi-select"
    | "date"
    | "date-range"
    | "textarea"
    | "radio";

export interface IFormItemDataRender<T> {
    value?: any;
    // eslint-disable-next-line no-use-before-define
    onChange?: IFormItemProps["onChange"];
    className?: string;
    key?: keyof T;
}

export interface IFormItemData<T> {
    rowsId?: string;
    label?: string;
    type?: IFormItemType;
    key: keyof T;
    render?: React.ReactElement | ((props: IFormItemDataRender<T>) => React.ReactElement);
    onChangeValidate?: (props: { key: any; value: any }) => boolean;

    rows?: any;
    inputType?: "number";

    dataSource?: Array<any>;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;

    className?: string;
    classNameRow?: string;

    getItemClass?: (props: { key?: keyof T; index?: any; value?: any; error?: any; rows?: Array<any> }) => string;
    getElementClass?: (props: { key?: keyof T; index?: any; value?: any; error?: any; rows?: Array<any> }) => string;
    elementClass?: string;
}

export interface IFormItemProps {
    onChange: (key: any, value: any) => void;
    data: IFormItemData<any>;
    value: any;
    error?: any;
    Messages: any;
    className?: string;
}

export interface IFormProps {
    Messages: any;
    dataSource?: Array<IFormItemData<any>>;
    formik?: any;
    value?: any;
    error?: any;
    onChange?: (key: any, value: any) => any;
    getRowClass?: (index?: any) => string;
    className?: string;
    classNameRow?: string;
}

export const getDefaultValue = (type?: IFormItemType) => {
    switch (type) {
        case "checkbox":
        case "radio":
        case "multi-select":
        case "select":
            return [];
        case "date":
        case "date-range":
            return null;
        default:
            return "";
    }
};

export function FormItem({ onChange, data, value, Messages, className, error }: IFormItemProps) {
    const { key, type, label, dataSource = [], getLabel, getValue, rows, inputType } = data;
    const itemLabel = Messages?.[label as any] || label;
    if (type === "date-range") {
        let transValue: any = null;
        if (Array.isArray(value)) {
            transValue = value.map((item) => moment(item));
        }
        return (
            <DateInput
                value={transValue}
                onChange={(value) => {
                    let clone = null;
                    if (Array.isArray(value)) {
                        clone = value.map((item) => moment(item).valueOf());
                    }
                    onChange(key, clone);
                }}
                label={Messages[label as any] || label}
                className={className}
                isRangePicker
                error={error}
            />
        );
    }
    if (type === "date") {
        let transValue: any = null;
        if (value) {
            transValue = moment(value);
        }
        return (
            <DateInput
                value={transValue}
                onChange={(value) => {
                    let clone = null;
                    if (value) {
                        clone = moment(value).valueOf();
                    }
                    onChange(key, clone);
                }}
                label={itemLabel}
                className={className}
                error={error}
            />
        );
    }
    if (type === "checkbox") {
        return (
            <CheckboxGroup
                dataSource={dataSource}
                value={value}
                onChange={(value) => onChange(key, value)}
                label={itemLabel}
                className={className}
            />
        );
    }
    if (type === "radio") {
        return (
            <RadioGroup
                dataSource={dataSource}
                value={value}
                onChange={(value) => onChange(key, value)}
                label={itemLabel}
                className={className}
            />
        );
    }
    if (type === "select") {
        return (
            <Select
                dataSource={dataSource}
                value={value}
                onChange={(value) => onChange(key, value)}
                className={className}
                label={itemLabel}
                getLabel={(item) => (getLabel ? getLabel(item) : Messages[item?.label])}
                getValue={(item) => (getValue ? getValue(item) : item?.id)}
                error={error}
            />
        );
    }
    if (type === "textarea") {
        return (
            <InputText
                label={itemLabel}
                onChange={(e) => onChange(key, e?.target?.value)}
                value={value}
                className={className}
                error={error}
                multiple
                rows={rows}
            />
        );
    }

    return (
        <InputText
            label={itemLabel}
            onChange={(e) => onChange(key, e?.target?.value)}
            value={value}
            className={className}
            error={error}
            type={inputType}
        />
    );
}

const Form: React.FC<IFormProps> = ({
    dataSource,
    Messages,
    formik,
    value,
    className,
    error = {},
    onChange,
    classNameRow,
}) => {
    const transformData = useMemo(() => {
        const clone: Array<typeof dataSource> = [];
        const groupData = _.groupBy(dataSource, (item) => item?.rowsId);
        Object.keys(groupData).forEach((key) => {
            clone.push(groupData[key]);
        });
        return clone;
    }, [dataSource]);
    const formValue = useMemo(() => {
        if (formik) {
            return formik?.values ?? {};
        }
        return value;
    }, [value, formik?.values]);
    const formError = useMemo(() => {
        if (formik) {
            return formik?.errors ?? {};
        }
        return error;
    }, [formik]);

    const onChangeState = ({
        key,
        value,
        onValidate,
    }: {
        key: any;
        value: any;
        onValidate?: (props: any) => boolean;
    }) => {
        let validate = true;
        if (onValidate) {
            validate = onValidate({ key, value });
            if (!validate) {
                return;
            }
        }
        if (formik) {
            formik.setFieldValue(key, value);
        }
        // eslint-disable-next-line no-unused-expressions
        onChange && onChange(key, value);
    };
    const wrapperClass = ClassNames("w-100", className);
    return (
        <div className={wrapperClass}>
            {transformData &&
                transformData?.length > 0 &&
                transformData?.map((rows, i) => {
                    let hasError = false;
                    let rowView: any = <div />;
                    let setRowClass;
                    if (rows && rows?.length > 0) {
                        rowView = rows.map((item, index) => {
                            const {
                                render,
                                key,
                                type,
                                className,
                                getElementClass,
                                getItemClass,
                                elementClass,
                                classNameRow,
                                onChangeValidate,
                            } = item;
                            const valueItem = formValue[key] || getDefaultValue(type);
                            const errorItem = formError?.[key] ?? null;
                            const errorLabel = errorItem ? Messages?.[errorItem] ?? errorItem : null;
                            if (errorLabel) {
                                hasError = true;
                            }
                            let itemClass = ClassNames(
                                "w-100",
                                {
                                    "mr-3": rows?.length > 1 && index === 0,
                                    "mx-3": rows?.length > 1 && index > 0 && index < rows?.length,
                                    "ml-3": rows?.length > 1 && index === rows?.length - 1,
                                },
                                className
                            );

                            if (getItemClass) {
                                itemClass = getItemClass({
                                    value: valueItem,
                                    error: errorItem,
                                    key,
                                    index,
                                    rows,
                                });
                            }

                            let content = (
                                <FormItem
                                    data={item}
                                    onChange={(key, value) =>
                                        onChangeState({ key, value, onValidate: onChangeValidate })
                                    }
                                    value={valueItem}
                                    Messages={Messages}
                                    className={itemClass}
                                    error={errorLabel}
                                />
                            );
                            if (React.isValidElement(render)) {
                                content = React.cloneElement(render, {
                                    onChange: (key: any, value: any) =>
                                        onChangeState({ key, value, onValidate: onChangeValidate }),
                                    value: valueItem,
                                    className: itemClass,
                                });
                            }
                            if (typeof render === "function") {
                                content = render({
                                    value: valueItem,
                                    onChange: (key: any, value: any) =>
                                        onChangeState({ key, value, onValidate: onChangeValidate }),
                                    className: itemClass,
                                    key,
                                });
                            }

                            let itemWrapperClass = ClassNames("w-100 py-2 d-flex", elementClass);

                            if (getElementClass) {
                                itemWrapperClass = getElementClass({
                                    value: valueItem,
                                    error: errorItem,
                                    key,
                                    index,
                                    rows,
                                });
                            }

                            if (classNameRow) {
                                setRowClass = classNameRow;
                            }

                            return <div className={itemWrapperClass}>{content}</div>;
                        });
                    }

                    let rowClass = ClassNames(
                        "d-flex w-100 my-2",
                        {
                            "align-items-center": !hasError,
                            // "border-top": i !== 0,
                        },
                        classNameRow
                    );
                    if (setRowClass) {
                        rowClass = setRowClass;
                    }
                    return <div className={rowClass}>{rowView}</div>;
                })}
        </div>
    );
};

export default Form;