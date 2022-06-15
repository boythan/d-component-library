/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import useForceUpdate from "../../../hooks/useForceUpdate";
import Messages from "../../../language/Messages";
import ObjectUtils from "../../../utils/ObjectUtils";
import StringUtils from "../../../utils/StringUtils";
import Button from "../../button/Button";
import InputText from "../../input/InputText";
import Popover from "../../popover/Popover";
import LayoutTableManager, { ILayoutTableManager } from "./LayoutTableManager";

const SelectLayoutItem = ({ layoutItem, onDelete, onSaveName, onClick }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [layoutNameEditing, setLayoutNameEditing] = useState(layoutItem?.name);
    const classNameContainer = "d-table-awesome__layout-manager-view-item";

    useEffect(() => {
        setIsEditing(false);
    }, [layoutItem.id]);

    if (isEditing) {
        return (
            <div className={classNameContainer}>
                <InputText
                    value={layoutNameEditing}
                    onChange={(event) => setLayoutNameEditing(event.target.value)}
                    autoFocus
                    className="w-100"
                    defaultValue="New View"
                />
                <Button
                    iconName="done"
                    variant="trans"
                    onClick={(event) => {
                        onSaveName(layoutItem, layoutNameEditing);
                        setIsEditing(false);
                        event.stopPropagation();
                    }}
                />
                <Button
                    iconName="delete"
                    variant="trans"
                    onClick={(event) => {
                        onDelete(layoutItem);
                        event.stopPropagation();
                    }}
                />
            </div>
        );
    }
    return (
        <div className={classNameContainer} onClick={() => onClick(layoutItem)}>
            {layoutItem?.name ?? "N/A"}
            <Button
                iconName="edit"
                variant="trans"
                onClick={(event) => {
                    setIsEditing(true);
                    event.stopPropagation();
                }}
            />
        </div>
    );
};

const SaveAsNewView = ({ selectedColumns = [], tableKey, onSuccess }: any) => {
    const [isEditing, setEditing] = useState(false);
    const [layoutNameEditing, setLayoutNameEditing] = useState("");
    const classNameContainer = "d-table-awesome__layout-manager-view-item text-primary";

    const onSaveNew = () => {
        const layoutId = StringUtils.getUniqueID();
        const newColumnsLayout = {
            columnsIds: selectedColumns,
            name: layoutNameEditing,
            id: layoutId,
        };
        LayoutTableManager.createLayout(newColumnsLayout, tableKey);
        LayoutTableManager.setDefaultLayout(layoutId, tableKey);
        onSuccess();
    };

    if (isEditing) {
        return (
            <div className={classNameContainer}>
                <InputText
                    value={layoutNameEditing}
                    onChange={(event) => setLayoutNameEditing(event.target.value)}
                    autoFocus
                    className="w-100"
                />
                <Button
                    iconName="done"
                    variant="trans"
                    onClick={(event) => {
                        onSaveNew();
                        event.stopPropagation();
                    }}
                />
            </div>
        );
    }
    return (
        <div className={classNameContainer} onClick={() => setEditing(true)}>
            {Messages.saveViewAs}
        </div>
    );
};

const LayoutManagerViewSelect = ({ selectedColumns = [], tableKey, onChangeLayout }: any) => {
    const tableLayouts = LayoutTableManager.getTableLayouts(tableKey);
    const tableLayoutDefault = useMemo(() => _.find(tableLayouts, (item) => item.isDefault), [tableLayouts]);

    useEffect(() => {
        onChangeLayout(tableLayoutDefault);
    }, [tableLayoutDefault?.id]);

    const isShowSaveNew = useMemo(() => {
        if (!tableLayoutDefault) return true;
        return !ObjectUtils.compareTwoStringArray(tableLayoutDefault.columnsIds, selectedColumns);
    }, [selectedColumns, tableLayoutDefault]);

    const [openPopover, setOpenPopover] = useState(false);
    const forceUpdate = useForceUpdate();

    const onChangeLayoutName = (layoutItem: any, newName: string) => {
        const newLayout = { ...layoutItem, name: newName };
        LayoutTableManager.updateLayout(newLayout, tableKey);
        forceUpdate();
    };

    const onDeleteLayoutItem = (layoutItem: any) => {
        LayoutTableManager.deleteLayout(layoutItem.id, tableKey);
        forceUpdate();
    };

    const onSelectLayout = (layoutItem: ILayoutTableManager) => {
        LayoutTableManager.setDefaultLayout(layoutItem.id, tableKey);
        forceUpdate();
        setOpenPopover(false);
    };

    const onClickDefaultView = () => {
        LayoutTableManager.setDefaultLayout(null, tableKey);
        forceUpdate();
        setOpenPopover(false);
    };

    const renderSelectDefaultView = () => {
        return (
            <div className="d-table-awesome__layout-manager-view-item" onClick={onClickDefaultView}>
                {Messages.defaultView}
            </div>
        );
    };

    const renderPopoverContent = () => {
        return (
            <div className="d-flex flex-column">
                {renderSelectDefaultView()}
                {tableLayouts &&
                    tableLayouts?.length > 0 &&
                    tableLayouts.map((item: any) => (
                        <SelectLayoutItem
                            layoutItem={item}
                            onSaveName={onChangeLayoutName}
                            onDelete={onDeleteLayoutItem}
                            onClick={onSelectLayout}
                        />
                    ))}
                {isShowSaveNew && (
                    <SaveAsNewView selectedColumns={selectedColumns} tableKey={tableKey} onSuccess={forceUpdate} />
                )}
            </div>
        );
    };

    return (
        <Popover
            open={openPopover}
            onOpen={() => setOpenPopover(true)}
            onClose={() => setOpenPopover(false)}
            content={renderPopoverContent()}
        >
            <div id="titleSelectShipping" className={classNames("w-100 border-right")}>
                <Button
                    content={tableLayoutDefault?.name ?? Messages.defaultView}
                    iconName="visibility"
                    suffixIcon="arrow_drop_down"
                    variant="trans"
                    color="gray"
                    className="font-weight-normal"
                />
            </div>
        </Popover>
    );
};

export default LayoutManagerViewSelect;
