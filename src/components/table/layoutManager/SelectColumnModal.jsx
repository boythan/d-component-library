/* eslint-disable no-unused-expressions */
// react
import React, { useState, useEffect } from "react";
// third-party
import { isEmpty, now } from "lodash";
// import { Checkbox } from "antd";
import classname from "classnames";
// application
import PopoverListSearchComponent from "../popoverList/PopoverListSearchComponent";
// data stubs
import "./SelectColumnModal.scss";
import DialogManager from "../dialog/DialogManager";
import Modal from "../../modal/Modal";
import Button from "../../button/Button";
import Checkbox from "../../checkbox/Checkbox";
import InputText from "../../input/InputText";
import LayoutTableManager from "./LayoutTableManager";
import Icon from "../../icon/Icon";

export const SelectLayoutView = ({ onClickItem, listLayout = {}, selectedLayout, showBorder }) => {
    const renderTitleSelectLayout = () => {
        if (isEmpty(selectedLayout)) {
            return (
                <div id="titleSelectShipping" className={classname({ "border-right": showBorder })}>
                    {/* <CustomizedIcon name="visibility" size="large" /> */}
                    <div className="body2">{Messages.selectLayout}</div>
                    <Icon name="arrow_drop_down" size="large" />
                </div>
            );
        }
        return (
            <div id="titleSelectShipping" className={classname("w-100", { "border-right": showBorder })}>
                <Icon name="visibility" />
                <text className="mx-2 text-nowrap" style={{ color: "rgba(0, 0, 0, 0.56)" }}>
                    {selectedLayout?.name ?? "N/A"}
                </text>
                <Icon name="arrow_drop_down" size="large" />
            </div>
        );
    };
    const renderLayoutItem = (item) => {
        const isDefault = item?.default ?? false;
        return (
            <div className="renderLayoutItem">
                {item?.name ?? "N/A"}
                <span className="subTile2">{isDefault ? ` - ${Messages.default}` : ""}</span>
            </div>
        );
    };
    const transformer = (res) => {
        const result = [];
        const keyArr = Object.keys(listLayout);
        keyArr.forEach((key) => {
            if (!isEmpty(listLayout[key])) {
                result.push({ ...listLayout[key], name: key });
            }
        });
        return result;
    };
    return (
        <PopoverListSearchComponent
            placeholder={Messages.search}
            // onChangeText={(text) => onChangeTextSearchStore(text)}
            // setRef={(ref) => {
            //   storeList.current = ref;
            // }}
            source={() => Promise.resolve()}
            transformer={transformer}
            renderItem={renderLayoutItem}
            onClickItem={onClickItem}
            createNewButton={false}
            isClickOpen
            key={now()}
            customMainView={renderTitleSelectLayout()}
        />
    );
};

const SelectColumnModal = ({ options = [], setSelectedColumns, keyTable = null, refreshLayout }) => {
    const [openOptionModal, setOpenOptionModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options);
    const [openSaveNewModal, setOpenSaveNewModal] = useState(false);
    const [nameOfLayout, setNameOfLayout] = useState();
    const [listLayout, setListLayout] = useState();
    const [selectedLayout, setSelectedLayout] = useState({});
    const [selectAll, setSelectAll] = useState(false);

    const getLayoutTable = () => {
        if (isEmpty(keyTable)) {
            return;
        }
        const listLayoutTable = LayoutTableManager.getLayout(keyTable);
        setListLayout(listLayoutTable);
    };

    useEffect(() => {
        if (!isEmpty(keyTable)) {
            getLayoutTable();
        }
    }, [keyTable, openOptionModal, openSaveNewModal]);

    useEffect(() => {
        let defaultLayout = {};
        if (!isEmpty(keyTable)) {
            const tableLayout = LayoutTableManager.getLayout(keyTable);
            if (!isEmpty(tableLayout)) {
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

    const removeItemFromSelected = (selectedItem) => {
        const clone = selectedOption.filter((item) => item.dataIndex !== selectedItem);
        setSelectedOption(clone);
    };

    const addItemToSelected = (selectedItem) => {
        const addedItem = options.find((obj) => obj.dataIndex === selectedItem);
        const clone = [...selectedOption, addedItem];
        setSelectedOption(clone);
    };

    const handleOnClickSave = async () => {
        if (!isEmpty(selectedLayout)) {
            // const storagedLayout = LayoutTableManager.getLayout(selectedLayout?.name)
            const selected = selectedOption.map((item) => ({
                dataIndex: item.dataIndex,
                id: Math.random(),
            }));
            const layout = { data: selected, default: true };
            const newTableLayout = {};
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
        const selected = selectedOption.map((item) => ({
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

    const onSelectLayout = (item) => {
        const layoutIndex = item?.data?.map((item) => item?.dataIndex) ?? [];
        const filterOption = options.filter((item) => layoutIndex.includes(item?.dataIndex));
        setSelectedLayout(item);
        setSelectedOption(filterOption);
        getLayoutTable();
    };

    const renderContentModal = () => {
        return (
            <div className="d-flex flex-column align-items-start px-5 justify-content-center">
                {/* <h5>{Messages.action}: </h5> */}
                <div className="d-flex align-items-center">
                    <Checkbox
                        value={selectAll}
                        checked={selectAll}
                        onChange={() => {
                            if (!selectAll) {
                                setSelectedOption(options);
                            }
                            setSelectAll(!selectAll);
                        }}
                        color="primary"
                        // eslint-disable-next-line react/no-children-prop
                        label={<text className="text-primary font-weight-bold">{Messages.selectAll}</text>}
                    />
                    <Button
                        onClick={() => {
                            // return DialogManager.showConfirm(
                            //     Messages.clearALlLayout,
                            //     Messages.areYouSureWantToDeleteAllSavedLayoutOfThisTable,
                            //     async () => {
                            //         await LayoutTableManager.clearTableLayout(keyTable);
                            //         setListLayout();
                            //         setSelectedLayout({});
                            //     }
                            // );
                        }}
                        disabled={isEmpty(listLayout)}
                        iconName="highlight_off"
                        clear
                        content={Messages.clearALlLayout}
                        variant="trans"
                        customColor="danger"
                    />
                </div>
                <div className="d-flex flex-column my-4">
                    {options.map((item) => {
                        const isChecked = selectedOption.filter((obj) => obj.dataIndex === item.dataIndex).length > 0;
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
                onClickItem={(item, index) => onSelectLayout(item)}
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
                placeholder={Messages.nameOfLayout}
            />
        );
    };

    const renderFooter = () => {
        return (
            <div className="d-flex align-items-center w-100 justify-content-end">
                <Button
                    content={Messages.saveAndApply}
                    onClick={handleOnClickSave}
                    disabled={isEmpty(selectedLayout)}
                    className="mr-3"
                />
                <Button content={Messages.save} onClick={handleOnClickSaveNew} />
            </div>
        );
    };

    return (
        <React.Fragment>
            <Button
                content={<text style={{ color: "rgba(0, 0, 0, 0.56)" }}>{Messages.column}</text>}
                iconName="settings"
                clear
                onClick={() => setOpenOptionModal(true)}
            />

            <Modal
                open={openOptionModal}
                onClose={() => setOpenOptionModal(false)}
                onSave={handleOnClickSave}
                title={`${Messages.selectLayout}${selectedLayout?.name ? ` - ${selectedLayout?.name}` : ""}`}
                customFooter={renderFooter}
                size="small"
                headerSide={renderSecondTitle}
            >
                {renderContentModal()}
            </Modal>
            <Modal
                open={openSaveNewModal}
                onClose={() => setOpenSaveNewModal(false)}
                onSave={handleOnSaveNewLayout}
                title={Messages.newLayout}
                disabledSaveButton={!nameOfLayout}
                centered={false}
            >
                {renderContentSaveNewModal()}
            </Modal>
        </React.Fragment>
    );
};

export default SelectColumnModal;
