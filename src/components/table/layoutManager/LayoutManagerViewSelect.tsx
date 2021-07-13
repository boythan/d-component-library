/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames";
import _ from "lodash";
import { useState } from "react";
import Messages from "../../../language/Messages";
import Button from "../../button/Button";
import Icon from "../../icon/Icon";
import InputText from "../../input/InputText";
import PopoverList from "../../popover/PopoverList";

const SelectLayoutItem = ({ layoutItem, onDelete, onSaveName }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [layoutNameEditing, setLayoutNameEditing] = useState(layoutItem?.name);
    const classNameContainer = "d-table-awesome__layout-manager-view-item";
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
                        onSaveName(layoutItem, layoutNameEditing);
                        setIsEditing(false);
                        event.stopPropagation();
                    }}
                />
                <Button
                    iconName="delete"
                    variant="trans"
                    onClick={(event) => {
                        onDelete();
                        event.stopPropagation();
                    }}
                />
            </div>
        );
    }
    return (
        <div className={classNameContainer}>
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
const LayoutManagerViewSelect = ({ onClickItem, listLayout = [], selectedLayout, onClickDefaultView }: any) => {
    const renderTitleSelectLayout = () => (
        <div id="titleSelectShipping" className={classNames("w-100 border-right")}>
            <Button
                content={selectedLayout?.name ?? Messages.defaultView}
                iconName="visibility"
                suffixIcon="arrow_drop_down"
                variant="trans"
                color="gray"
                className="font-weight-normal"
            />
        </div>
    );

    const onChangeLayoutName = (layoutItem: any, newName: string) => {};

    const renderSelectDefaultView = () => {
        return (
            <div className="d-table-awesome__layout-manager-view-item" onClick={onClickDefaultView}>
                {Messages.defaultView}
            </div>
        );
    };

    return (
        <PopoverList
            source={() => Promise.resolve(listLayout)}
            transformer={(res) => res}
            renderItem={(item) => <SelectLayoutItem layoutItem={item} onSaveName={onChangeLayoutName} />}
            onClickItem={onClickItem}
            isClickOpen
            key={_.now()}
            customView={renderTitleSelectLayout}
            renderContentHeader={renderSelectDefaultView}
            emptyText=""
        />
    );
};

export default LayoutManagerViewSelect;
