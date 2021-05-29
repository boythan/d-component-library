/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-expressions */
// react
import React, { useState, useEffect } from "react";
// third-party
import _ from "lodash";
// import { Checkbox } from "antd";
import ClassNames from "classnames";
// application
import Button from "../../button/Button";
import Checkbox from "../../checkbox/Checkbox";
import InputText from "../../input/InputText";
import Modal from "../../modal/Modal";
import PopoverList from "../../list/popoverList/PopoverList";
import Icon from "../../icon/Icon";
// data stubs
import LayoutTableManager from "./LayoutTableManager";
import DialogManager from "../../dialog/DialogManager";

export const SelectLayoutView = ({
    onClickItem,
    listLayout = {},
    selectedLayout,
    showBorder,
    text = "Select Layout",
}: any) => {
    const renderTitleSelectLayout = () => {
        if (_.isEmpty(selectedLayout)) {
            return (
                <div
                    className={ClassNames("d-flex  align-items-center hover-pointer p-2", {
                        "border-right": showBorder,
                    })}
                >
                    {/* <CustomizedIcon name="visibility" size="large" /> */}
                    <div className="text text-nowrap mr-2">{text}</div>
                    <Icon name="arrow_drop_down" size="large" className="d-block" />
                </div>
            );
        }
        return (
            <div id="titleSelectShipping" className={ClassNames("w-100", { "border-right": showBorder })}>
                <Icon name="visibility" />
                <text className="mx-2 text-nowrap" style={{ color: "rgba(0, 0, 0, 0.56)" }}>
                    {selectedLayout?.name ?? "N/A"}
                </text>
                <Icon name="arrow_drop_down" size="large" />
            </div>
        );
    };
    const renderLayoutItem = (item: any) => {
        const isDefault = item?.default ?? false;
        return (
            <div className="renderLayoutItem">
                {item?.name ?? "N/A"}
                <span className="subTile2">{isDefault ? `- Default` : ""}</span>
            </div>
        );
    };
    const transformer = (res: any) => {
        const result: Array<any> = [];
        const keyArr = Object.keys(listLayout);
        keyArr.forEach((key: any) => {
            if (!_.isEmpty(listLayout[key])) {
                result.push({ ...listLayout[key], name: key });
            }
        });
        return result;
    };
    return (
        <PopoverList
            source={() => Promise.resolve()}
            transformer={transformer}
            renderItem={renderLayoutItem}
            onClickItem={onClickItem}
            isClickOpen
            key={_.now()}
            customView={renderTitleSelectLayout}
        />
    );
};

const SelectColumnModal = ({
    options = [],
    setSelectedColumns,
    keyTable = null,
    refreshLayout,
    actionText = "Action",
    selectAllText = "Select All",
}: any) => {
    const [openOptionModal, setOpenOptionModal] = useState(false);
    const [openSaveNewModal, setOpenSaveNewModal] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>(options);
    const [nameOfLayout, setNameOfLayout] = useState<any>();
    const [listLayout, setListLayout] = useState<any>();
    const [selectedLayout, setSelectedLayout] = useState<any>({});

    const getLayoutTable = () => {
        if (_.isEmpty(keyTable)) {
            return;
        }
        const listLayoutTable = LayoutTableManager.getLayout(keyTable);
        setListLayout(listLayoutTable);
    };

    useEffect(() => {
        if (!_.isEmpty(keyTable)) {
            getLayoutTable();
        }
    }, [keyTable, openOptionModal, openSaveNewModal]);

    useEffect(() => {
        let defaultLayout = {};
        if (!_.isEmpty(keyTable)) {
            const tableLayout = LayoutTableManager.getLayout(keyTable);
            if (!_.isEmpty(tableLayout)) {
                const keyTable = Object.keys(tableLayout);
                keyTable.forEach((key) => {
                    if (tableLayout[key]?.default) {
                        defaultLayout = { ...tableLayout[key], name: key };
                        setSelectedOption(tableLayout?.[key]?.data ?? []);
                    }
                });
            }
        }
        setSelectedLayout(defaultLayout);
    }, [keyTable, openOptionModal]);

    useEffect(() => {
        if (selectedOption?.length === options?.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedOption, openOptionModal]);

    const removeItemFromSelected = (selectedItem: any) => {
        const clone = selectedOption.filter((item: any) => item.dataIndex !== selectedItem);
        setSelectedOption(clone);
    };

    const addItemToSelected = (selectedItem: any) => {
        const addedItem = options.find((obj: any) => obj.dataIndex === selectedItem);
        const clone = [...selectedOption, addedItem];
        setSelectedOption(clone);
    };

    const handleOnClickSave = async () => {
        if (!_.isEmpty(selectedLayout)) {
            // const storagedLayout = LayoutTableManager.getLayout(selectedLayout?.name)
            const selected = selectedOption.map((item: any) => ({
                dataIndex: item.dataIndex,
                id: Math.random(),
            }));
            const layout = { data: selected, default: true };
            const newTableLayout: any = {};
            const keyLayout = Object.keys(listLayout);
            keyLayout.forEach((key) => {
                if (key === selectedLayout.name) {
                    newTableLayout[key] = layout;
                } else {
                    newTableLayout[key] = { ...listLayout[key], default: false };
                }
            });
            await LayoutTableManager.saveTableLayout(newTableLayout, keyTable);
        }
        setSelectedColumns && setSelectedColumns(selectedOption);
        refreshLayout && refreshLayout();
        return setOpenOptionModal(false);
    };

    const handleOnClickSaveNew = async () => {
        setOpenSaveNewModal(true);
        return Promise.resolve();
    };

    const handleOnSaveNewLayout = async () => {
        const selected = selectedOption.map((item: any) => ({
            dataIndex: item.dataIndex,
            id: Math.random(),
        }));
        const layout = { data: selected, default: false };
        await LayoutTableManager.saveNewLayout(layout, keyTable, nameOfLayout);
        setOpenSaveNewModal(false);
        setSelectedLayout({ ...layout, name: nameOfLayout });
        refreshLayout && refreshLayout();
        return Promise.resolve();
    };

    const onSelectLayout = (item: any) => {
        const layoutIndex = item?.data?.map((item: any) => item?.dataIndex) ?? [];
        const filterOption = options.filter((item: any) => layoutIndex.includes(item?.dataIndex));
        setSelectedLayout(item);
        setSelectedOption(filterOption);
        getLayoutTable();
    };

    const renderContentModal = () => {
        return (
            <div className="d-flex flex-column align-items-start px-5 justify-content-center">
                <h5>{actionText}:</h5>
                <div className="d-flex align-items-center">
                    <Checkbox
                        value={selectAll as any}
                        checked={selectAll}
                        onChange={() => {
                            if (!selectAll) {
                                setSelectedOption(options);
                            }
                            setSelectAll(!selectAll);
                        }}
                        color="primary"
                        // eslint-disable-next-line react/no-children-prop
                        label={selectAllText}
                    />
                    <Button
                        onClick={() => {
                            return DialogManager.showConfirm(
                                "Confirm",
                                "Are you sure want to delete all Layout?",
                                async () => {
                                    await LayoutTableManager.clearTableLayout(keyTable);
                                    setListLayout({});
                                    setSelectedLayout({});
                                }
                            );
                        }}
                        disabled={_.isEmpty(listLayout)}
                        iconName="highlight_off"
                        content="Clear All Layout"
                        variant="trans"
                        color="red"
                    />
                </div>
                <div className="d-flex flex-column my-4">
                    {options.map((item: any) => {
                        // eslint-disable-next-line operator-linebreak
                        const isChecked =
                            selectedOption.filter((obj: any) => obj.dataIndex === item.dataIndex).length > 0;
                        return (
                            <Checkbox
                                checked={isChecked}
                                onChange={(event) => {
                                    if (isChecked) {
                                        removeItemFromSelected(event?.target?.value);
                                    } else {
                                        addItemToSelected(event?.target?.value);
                                    }
                                }}
                                value={item?.dataIndex}
                                // eslint-disable-next-line react/no-children-prop
                                label={item?.title && item?.title}
                                className="my-2"
                            />
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderSecondTitle = () => {
        return (
            <SelectLayoutView
                listLayout={listLayout}
                onClickItem={(item: any) => onSelectLayout(item)}
                selectedLayout={selectedLayout}
            />
        );
    };

    const renderContentSaveNewModal = () => {
        return (
            <InputText
                onChange={(event) => setNameOfLayout(event.target.value)}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Name Of Layout"
            />
        );
    };

    const renderFooter = () => {
        return (
            <div className="d-flex align-items-center w-100 justify-content-end">
                <Button
                    // eslint-disable-next-line react/jsx-curly-brace-presence
                    content={"Save & Apply"}
                    onClick={handleOnClickSave}
                    disabled={_.isEmpty(selectedLayout)}
                    className="mr-3"
                />
                <Button content="Save" onClick={handleOnClickSaveNew} />
            </div>
        );
    };

    return (
        <React.Fragment>
            <Button content="Column" iconName="settings" variant="trans" onClick={() => setOpenOptionModal(true)} />

            <Modal
                open={openOptionModal}
                onClose={() => setOpenOptionModal(false)}
                onSave={handleOnClickSave}
                title={`Select Layout ${selectedLayout?.name ? ` - ${selectedLayout?.name}` : ""}`}
                customFooter={renderFooter}
                size="medium"
                headerSide={renderSecondTitle}
            >
                {renderContentModal()}
            </Modal>
            <Modal
                open={openSaveNewModal}
                onClose={() => setOpenSaveNewModal(false)}
                onSave={handleOnSaveNewLayout}
                centered={false}
            >
                {renderContentSaveNewModal()}
            </Modal>
        </React.Fragment>
    );
};

export default SelectColumnModal;
