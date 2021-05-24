/* eslint-disable no-plusplus */
import React, { useEffect, useMemo, useRef, useState } from "react";
// third-party
import { useFormik } from "formik";
import { debounce } from "lodash";
import { generatePath, Link } from "react-router-dom";

// application
import TableAwesomeComponentUpdated from "./TableAwesomeComponent";
// data stubs
import Messages from "../../i18n/Messages";
import CustomizedButton from "../button/CustomizedButton";
import StringUtils from "../../utils/StringUtils";
import { useFirstTime } from "../../services/hooks";
import Select from "../select/Select";
import ObjectUtils from "../../utils/ObjectUtils";
import AppConstant from "../../constant/AppConstant";
import Path from "../../components/Path";
// import getCommonColumns from "../columns/CommonColumns";

// eslint-disable-next-line no-unused-vars
const columns = [
    // {
    //     title: Messages.id,
    //     key: "id",
    //     width: 100,
    //     dataIndex: "id",
    //     render: (id) => {
    //         return {
    //             children: id,
    //             props: { "data-title": Messages.name },
    //         };
    //     },
    // },
    {
        title: Messages.name,
        key: "name",
        width: 200,
        dataIndex: "name",
        render: (name) => {
            return {
                children: name,
                props: { "data-title": Messages.name },
            };
        },
    },
    {
        title: Messages.sku,
        key: "name",
        width: 200,
        dataIndex: "sku",
        render: (sku) => {
            return {
                children: sku,
                props: { "data-title": Messages.name },
            };
        },
    },
    {
        title: Messages.price,
        key: "regular_price",
        width: 100,
        dataIndex: "regular_price",
        render: (price) => {
            return {
                children: StringUtils.moneyThaiFormat(price),
                props: { "data-title": Messages.name },
            };
        },
    },
    {
        title: Messages.salePrice,
        key: "sale_price",
        width: 100,
        dataIndex: "sale_price",
        render: (price) => {
            return {
                children: StringUtils.moneyThaiFormat(price),
                props: { "data-title": Messages.name },
            };
        },
    },
    {
        title: Messages.position,
        key: "position",
        width: 100,
        dataIndex: "position",
        render: (position) => {
            return {
                children: <h6>{position || "N/A"}</h6>,
                props: { "data-title": Messages.position },
            };
        },
    },
];

const getCommonColumns = (formik) => {
    const handleChange = debounce((key, text) => {
        formik.setFieldValue(key, text);
    }, 50);
    return [
        // {
        //     title: Messages.id,
        //     key: "id",
        //     width: 100,
        //     children: [
        //         {
        //             title: (
        //                 <input
        //                     type="text"
        //                     className="form-control form-control-sm"
        //                     name="id"
        //                     value={formik?.values?.id ?? ""}
        //                     onChange={formik.handleChange}
        //                 />
        //             ),
        //             key: "name",
        //             dataIndex: "id",
        //             render: (id) => {
        //                 return {
        //                     children: id,
        //                     props: { "data-title": Messages.name },
        //                 };
        //             },
        //         },
        //     ],
        // },
        {
            title: Messages.name,
            key: "name",
            width: 200,
            children: [
                {
                    title: (
                        <div className="d-flex flex-column">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={formik?.values?.name ?? ""}
                                name="name"
                                onChange={(event) => handleChange("name", event.target.value)}
                            />
                            <input className="form-control form-control-sm mt-3 invisible" />
                        </div>
                    ),
                    key: "name",
                    dataIndex: "name",
                    render: (name, item) => {
                        return {
                            children: (
                                <Link to={generatePath(Path.PRODUCT_EDIT, { productId: item.id })} target="_blank">
                                    {name}
                                </Link>
                            ),
                            props: { "data-title": Messages.name },
                        };
                    },
                },
            ],
        },
        {
            title: Messages.sku,
            key: "name",
            width: 200,
            children: [
                {
                    title: (
                        <div className="d-flex flex-column">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={formik?.values?.sku ?? ""}
                                name="sku"
                                onChange={(event) => handleChange("sku", event.target.value)}
                            />
                            <input className="form-control form-control-sm mt-3 invisible" />
                        </div>
                    ),
                    key: "sku",
                    dataIndex: "sku",
                    render: (sku) => {
                        return {
                            children: sku,
                            props: { "data-title": Messages.name },
                        };
                    },
                },
            ],
        },
        {
            title: Messages.price,
            key: "regular_price",
            width: 100,
            children: [
                {
                    title: (
                        <div className="d-flex flex-column h-100">
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                value={formik?.values?.price_from ?? ""}
                                name="price_from"
                                onChange={(event) => handleChange("price_from", event.target.value)}
                            />
                            <input
                                type="number"
                                className="form-control form-control-sm mt-3"
                                value={formik?.values?.price_to ?? ""}
                                name="price_to"
                                onChange={(event) => handleChange("price_to", event.target.value)}
                            />
                        </div>
                    ),
                    key: "regular_price",
                    dataIndex: "regular_price",
                    render: (price) => {
                        return {
                            children: StringUtils.moneyThaiFormat(price),
                            props: { "data-title": Messages.name },
                        };
                    },
                },
            ],
        },
        {
            title: Messages.salePrice,
            key: "sale_price",
            width: 100,
            children: [
                {
                    title: (
                        <div className="d-flex flex-column">
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                value={formik?.values?.sale_price_from ?? ""}
                                onChange={(event) => handleChange("sale_price_from", event.target.value)}
                                name="sale_price_from"
                            />
                            <input
                                type="number"
                                className="form-control form-control-sm mt-3"
                                value={formik?.values?.sale_price_to ?? ""}
                                name="sale_price_to"
                                onChange={(event) => handleChange("sale_price_to", event.target.value)}
                            />
                        </div>
                    ),
                    key: "sale_price",
                    dataIndex: "sale_price",
                    render: (price) => {
                        return {
                            children: StringUtils.moneyThaiFormat(price),
                            props: { "data-title": Messages.name },
                        };
                    },
                },
            ],
        },
        {
            title: Messages.position,
            key: "position",
            width: 100,
            children: [
                {
                    title: (
                        <div className="d-flex flex-column">
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                value={formik?.values?.position_from ?? ""}
                                name="position_from"
                                onChange={(event) => handleChange("position_from", event.target.value)}
                            />
                            <input
                                type="number"
                                className="form-control form-control-sm mt-3"
                                value={formik?.values?.position_to ?? ""}
                                name="position_to"
                                onChange={(event) => handleChange("position_to", event.target.value)}
                            />
                        </div>
                    ),
                    key: "position",
                    dataIndex: "position",
                    render: (position) => {
                        return {
                            children: <h6>{position || "N/A"}</h6>,
                            props: { "data-title": Messages.position },
                        };
                    },
                },
            ],
        },
    ];
};

const BestSellerTable = ({
    rowsAddNew = [],
    rowsDelete = [],
    onChangeRowDelete,
    onChangeRowAddNew,
    isEdit,
    customSource,
    customTransformer,
    setRef,
}) => {
    const isFirstTime = useFirstTime();
    const [rowDataList, setRowDataList] = useState([]);
    const [filterMode, setFilterMode] = useState(
        isEdit ? AppConstant.MODE_FILTER_PRODUCT.IN.id : AppConstant.MODE_FILTER_PRODUCT.ALL.id
    );

    // useEffect(() => {
    //     if (isEdit) {
    //         setFilterMode(AppConstant.MODE_FILTER_PRODUCT.IN.id);
    //     }
    // }, [isEdit]);

    const formik = useFormik({
        initialValues: {
            // id: null,
            name: null,
            sku: null,
            price_from: null,
            price_to: null,
            sale_price_from: null,
            sale_price_to: null,
            position_from: null,
            position_to: null,
        },
    });

    const tableRef = useRef();

    const defaultSelectedRows = useMemo(() => {
        return rowDataList.filter((item) => item.selected);
    }, [rowDataList]);

    const isDeletedRow = (rowId) => {
        return !!rowsDelete.find((item) => item.id === rowId);
    };

    /**
     * is all selected default row
     * then filter the delete rows
     * then concat the rows add new
     */
    const selectedRows = useMemo(() => {
        return defaultSelectedRows
            .filter((item) => !isDeletedRow(item.id))
            .concat(rowsAddNew)
            .map((item) => item.id);
    }, [rowsDelete, rowsAddNew, defaultSelectedRows]);

    /**
     *
     * @param {row that user is selecting or deselecting} rowSelect
     * @param {status of selection} selected
     */
    const handleChangeRowSelect = (rowSelect, selected) => {
        if (selected) {
            onSelectRow(rowSelect);
        } else {
            onDeselectRow(rowSelect);
        }
    };

    /**
     * if rowSelect is one of the deleteRows => remove it from deleteRows
     * if not => add it to row add new
     * @param {*} rowSelect
     */
    const onSelectRow = (rowSelect) => {
        if (isDeletedRow(rowSelect)) {
            onChangeRowDelete(rowsDelete.filter((item) => item.id !== rowSelect.id));
        } else {
            onChangeRowAddNew([...rowsAddNew, rowSelect]);
        }
    };

    /**
     * if rowSelect is one of the addNewRows => remove it from addNewRows
     * if not => add it to delete row
     * @param {*} rowSelect
     */
    const onDeselectRow = (rowSelect) => {
        const isAddNew = !!rowsAddNew.find((item) => item.id === rowSelect.id);
        if (isAddNew) {
            onChangeRowAddNew(rowsAddNew.filter((item) => item.id !== rowSelect.id));
        } else {
            onChangeRowDelete([...rowsDelete, rowSelect]);
        }
    };

    useEffect(() => {
        if (!isFirstTime) {
            tableRef.current.refresh();
        }
    }, [formik.values, filterMode]);

    useEffect(() => {
        setRef && setRef(tableRef.current);
    }, []);

    const source = (paging) => {
        if (customSource) {
            return customSource(paging, filterMode, formik.values);
        }

        return Promise.resolve();
    };

    const transformer = (res) => {
        let dataList = res ?? [];
        if (customTransformer) {
            dataList = customTransformer(res);
        }
        setRowDataList(dataList);
        return dataList;
    };

    const handleSelectAll = (selected, selectedRowsParam, changeRows) => {
        if (selected) {
            if (changeRows?.length > 0) {
                onSelectAll(changeRows);
            }
        } else {
            onDeselectAll(changeRows);
        }
    };

    const onSelectAll = (allSelected = []) => {
        const addNewList = [];
        let cloneDelete = [...rowsDelete];
        allSelected.forEach((iSelect) => {
            if (isDeletedRow(iSelect)) {
                cloneDelete = cloneDelete.filter((item) => item?.id !== iSelect?.id);
            } else {
                addNewList.push(iSelect);
            }
        });
        onChangeRowDelete(cloneDelete);
        onChangeRowAddNew([...rowsAddNew, ...addNewList]);
    };

    const onDeselectAll = (allDeselected) => {
        const removeList = [];
        let cloneAddNew = [...rowsAddNew];
        allDeselected.forEach((iDeselect) => {
            const isAddNew = !!rowsAddNew.find((item) => item?.id === iDeselect?.id);
            if (isAddNew) {
                cloneAddNew = cloneAddNew.filter((item) => item?.id !== iDeselect?.id);
            } else {
                removeList.push(iDeselect);
            }
        });
        onChangeRowAddNew(cloneAddNew);
        onChangeRowDelete([...rowsDelete, ...removeList]);
    };

    return (
        <>
            <div className="d-flex justify-content-end mb-3">
                <div className="d-flex align-items-center ">
                    <Select
                        dataList={ObjectUtils.mapObjectToArray(AppConstant.MODE_FILTER_PRODUCT)}
                        getLabel={(item) => Messages[item.label]}
                        getKey={(item) => item.id}
                        containerClassName="mr-3"
                        handleChange={setFilterMode}
                        value={filterMode}
                        allowClear={false}
                        style={{ width: 120 }}
                    />

                    <CustomizedButton
                        text={Messages.resetFilter}
                        onClick={() => {
                            formik.handleReset();
                        }}
                        size="small"
                    />
                </div>
            </div>
            <TableAwesomeComponentUpdated
                source={source}
                transformer={transformer}
                // eslint-disable-next-line no-return-assign
                ref={(ref) => (tableRef.current = ref)}
                columns={getCommonColumns(formik)}
                tableLayout="fixed"
                rowSelection={{
                    onSelect: handleChangeRowSelect,
                    selectedRowKeys: selectedRows,
                    onSelectAll: handleSelectAll,
                }}
            />
        </>
    );
};

export default BestSellerTable;
