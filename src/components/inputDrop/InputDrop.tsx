/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ClassNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import Messages from "../../language/Messages";
import Badge from "../elements/badge/Badge";
import Button from "../button/Button";
import { DropdownProps } from "../dropdown/Dropdown";
import Icon from "../elements/icon/Icon";
import InputText from "../input/InputText";
import Popover from "../popover/Popover";
import ViewTextError from "../view/ViewTextError";

export interface InputDropProps {
    className?: string;
    classNameDropdown?: string;

    label?: string;
    iconName?: string;
    position?: DropdownProps["position"];
    displayValue?: string;
    selectAllText?: string;
    clearText?: string;
    error?: any;

    hideLabel?: boolean;
    hideSelectAll?: boolean;
    hideClearAll?: boolean;
}

interface InputDropSourceProps extends InputDropProps {
    valueLength: number;

    onClickSelectAll: () => any;
    onClickClearAll: () => any;
    onClickApply: () => any;
    content: () => any;
    onChangeText?: (value: any) => any;
    propsSearchText?: any;
}

const InputDrop: React.FC<InputDropSourceProps> = ({
    label,
    className,

    position = "left-edge",
    iconName = "expand_more",

    hideSelectAll = false,
    hideClearAll = false,
    hideLabel = false,

    displayValue,
    selectAllText = Messages.selectAll,
    clearText = Messages.clearAll,
    error,
    valueLength = 0,

    onClickSelectAll = () => {},
    onClickClearAll = () => {},
    onClickApply = () => {},
    onChangeText,
    propsSearchText = {},

    content = () => <div />,
}) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const containerClass = ClassNames(
        `d-input-drop__container d-input-drop__container-${position}`,
        {
            "d-input-drop__container-active": openDropdown,
            "d-input-drop__container-error": error,
        },
        className
    );
    const inputClass = ClassNames("d-input-drop__input hover-pointer");
    const dropdownWrapperClass = ClassNames("d-input-drop__dropdown");

    const inputValue = () => {
        let name = label;
        if (displayValue) {
            name = displayValue;
        }
        return (
            <div className="flex-center-y w-100">
                <div className="">{name}</div>
                <Badge variant="index" index={valueLength} size="x-large" className="ml-2" />
            </div>
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex-center-y justify-content-between border-bottom py-3 w-100">
                <label className="font-weight-bold">{label}</label>
                <div className="flex-center-y">
                    {!hideSelectAll && (
                        <Button
                            content={selectAllText}
                            size="x-small"
                            variant="trans"
                            onClick={onClickSelectAll}
                            color="blue"
                            className="p-0 font-weight-normal text-label"
                        />
                    )}
                </div>
            </div>
        );
    };

    const renderFooter = () => {
        return (
            <div className="flex-center-y justify-content-between border-top py-3 w-100">
                {!hideClearAll && (
                    <Button
                        content={clearText}
                        size="x-small"
                        variant="trans"
                        onClick={onClickClearAll}
                        className="p-0 font-weight-normal text-danger"
                    />
                )}
                <Button
                    content={Messages.apply}
                    onClick={() => {
                        onClickApply();
                        setOpenDropdown(false);
                    }}
                />
            </div>
        );
    };

    const renderPopoverContent = () => {
        return (
            <div className="w-100">
                {renderHeader()}
                {onChangeText && (
                    <InputText
                        placeholder={Messages.search}
                        className="mt-3 w-100"
                        onChange={onChangeText}
                        {...propsSearchText}
                    />
                )}
                {content()}
                {renderFooter()}
            </div>
        );
    };

    return (
        <div className={containerClass}>
            {!hideLabel && <label>{label}</label>}
            <Popover
                className={inputClass}
                classNameContent={dropdownWrapperClass}
                open={openDropdown}
                onOpen={() => setOpenDropdown(true)}
                onClose={() => setOpenDropdown(false)}
                content={renderPopoverContent()}
            >
                <div className="flex-center-y text-x-small w-100">
                    {inputValue()}
                    <Icon name={iconName} className="d-input-drop__arrow-icon ml-2" />
                </div>
            </Popover>
            <ViewTextError error={error} />
        </div>
    );
};
export default InputDrop;
