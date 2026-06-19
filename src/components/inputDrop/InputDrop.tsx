import ClassNames from "classnames";
import React, { useState } from "react";
import Messages from "../../language/Messages";
import Badge from "../elements/badge/Badge";
import Button from "../button/Button";
import Icon from "../elements/icon/Icon";
import InputText from "../input/InputText";
import Popover from "../popover/Popover";
import ViewTextError from "../view/ViewTextError";

export interface InputDropProps {
    className?: string;
    classNameDropdown?: string;

    id?: string;
    label?: string;
    iconName?: string;
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
    id,
    label,
    className,

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

    const containerClass = ClassNames("relative flex flex-col w-fit", className);

    const inputClass = ClassNames(
        "flex items-center justify-center px-4 h-10 transition-all duration-300 ease-in cursor-pointer border",
        {
            "border-[#041b47]": openDropdown && !error,
            "border-danger": !!error,
            "border-[#ececec]": !openDropdown && !error,
        }
    );

    const dropdownWrapperClass = ClassNames(
        "z-20 bg-white flex flex-col justify-center items-center min-w-[350px] px-4"
    );

    const inputValue = () => {
        let name = label;
        if (displayValue) {
            name = displayValue;
        }
        return (
            <div className="flex items-center w-full">
                <div className="">{name}</div>
                <Badge variant="index" index={valueLength} size="medium" className="ml-2" />
            </div>
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between border-b py-3 w-full">
                <label className="font-bold text-sm">{label}</label>
                <div className="flex items-center">
                    {!hideSelectAll && (
                        <Button
                            content={selectAllText}
                            size="x-small"
                            variant="trans"
                            onClick={onClickSelectAll}
                            color="blue"
                            className="p-0 font-normal text-xs leading-4"
                        />
                    )}
                </div>
            </div>
        );
    };

    const renderFooter = () => {
        return (
            <div className="flex items-center justify-between border-t py-3 w-full">
                {!hideClearAll && (
                    <Button
                        content={clearText}
                        size="x-small"
                        variant="trans"
                        onClick={onClickClearAll}
                        className="p-0 font-normal text-danger"
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
            <div className="w-full">
                {renderHeader()}
                {onChangeText && (
                    <InputText
                        placeholder={Messages.search}
                        className="mt-3 w-full"
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
        <div id={id} className={containerClass}>
            {!hideLabel && <label htmlFor={id} className="text-sm font-medium mb-1 text-text-main">{label}</label>}
            <Popover
                className={inputClass}
                classNameContent={dropdownWrapperClass}
                open={openDropdown}
                onOpen={() => setOpenDropdown(true)}
                onClose={() => setOpenDropdown(false)}
                content={renderPopoverContent()}
            >
                <div className="flex items-center text-xs leading-4 w-full">
                    {inputValue()}
                    <Icon name={iconName} className="text-[rgba(0,0,0,0.25)] ml-2" />
                </div>
            </Popover>
            <ViewTextError error={error} />
        </div>
    );
};
export default InputDrop;
