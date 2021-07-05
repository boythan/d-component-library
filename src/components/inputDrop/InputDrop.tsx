/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ClassNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import Messages from "../../language/Messages";
import Badge from "../badge/Badge";
import Button from "../button/Button";
import { DropdownProps } from "../dropdown/Dropdown";
import Icon from "../icon/Icon";
import InputText from "../input/InputText";

export interface InputDropProps {
    className?: string;
    classNameDropdown?: string;

    label?: string;
    value?: any;
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
    onClickSelectAll: () => any;
    onClickClearAll: () => any;
    content: () => any;
}

const InputDrop: React.FC<InputDropSourceProps> = ({
    label,
    className,
    classNameDropdown,

    position = "left-edge",
    iconName = "expand_more",

    hideSelectAll = false,
    hideClearAll = false,
    hideLabel = false,

    displayValue,
    selectAllText = Messages.selectAll,
    clearText = Messages.clearAll,
    value,
    error,

    onClickSelectAll = () => {},
    onClickClearAll = () => {},

    content = () => <div />,
}) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    const containerClass = ClassNames(
        `d-input-drop__container d-input-drop__container-${position}`,
        {
            "d-input-drop__container-active": openDropdown,
            "d-input-drop__container-error": error,
        },
        className
    );
    const inputClass = ClassNames("d-input-drop__input hover-pointer");
    const dropdownWrapperClass = ClassNames("d-input-drop__dropdown", classNameDropdown);
    const errorTextClass = ClassNames("text-x-small", "text-error", "ml-1");

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const isClickOutside = dropdownRef.current && !dropdownRef.current.contains(event?.target as HTMLElement);
            const isClickInput = inputRef.current && inputRef.current.contains(event.target as HTMLElement);
            if (isClickOutside && !isClickInput) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
    }, [dropdownRef, setOpenDropdown]);

    const inputValue = () => {
        let name = label;
        if (displayValue) {
            name = displayValue;
        }
        return (
            <div className="flex-center-y w-100">
                <div className="">{name}</div>
                <Badge variant="index" index={value?.length} size="x-large" className="ml-2" />
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
                <Button content={Messages.apply} onClick={() => {}} />
            </div>
        );
    };

    return (
        <div className={containerClass}>
            {!hideLabel && <label>{label}</label>}
            <div
                className={inputClass}
                style={{ height: "40px" }}
                onClick={() => setOpenDropdown(!openDropdown)}
                ref={inputRef}
            >
                <div className="flex-center-y text-x-small w-100">
                    {inputValue()}
                    <Icon name={iconName} className="d-input-drop__arrow-icon ml-2" />
                </div>
            </div>
            {error && (
                <div className="flex-center-y mt-1">
                    <Icon name="error_outline" className="text-error" size="small" />
                    <text className={errorTextClass}>{error}</text>
                </div>
            )}
            <div className={dropdownWrapperClass} ref={dropdownRef}>
                {renderHeader()}
                <InputText placeholder={Messages.search} className="mt-3 w-100" />
                {content()}
                {renderFooter()}
            </div>
        </div>
    );
};
export default InputDrop;
