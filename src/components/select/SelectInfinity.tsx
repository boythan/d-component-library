/* eslint-disable no-unused-expressions */
import _ from "lodash";
import React, { CSSProperties, ElementRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import ClassNames from "classnames";
import Icon from "../elements/icon/Icon";
import AwesomeListComponent, { AwesomeListComponentProps, IPaging } from "../list/awesomeList/AwesomeListComponent";
import Select, { SelectProps } from "./Select";
import { ButtonProps } from "../button/Button";
import { isString } from "../../utils/AwesomeTableUtils";

export interface SelectInfinityProps
    extends Omit<AwesomeListComponentProps, "source" | "renderItem" | "variant">,
        SelectProps {
    source?: (params: any, paging: IPaging) => Promise<any>;
    classNameTagItem?: string;
    classNameDropdownItem?: string;
    styleTagItem?: CSSProperties;
    tagColor?: ButtonProps["color"];
    getLabelDropdownItem?: (item: any) => any;
    allowCreateNew?: boolean;
    onCreateNew?: () => any;
    createNewLabel?: string | React.ReactNode;
    dropdownHeight?: string | number;
    customDropdownHeader?: () => React.ReactNode;
    onOpenChange?: (open: boolean) => void;
}

export interface SelectInfinityMethod {
    onBlur: () => void;
    onFocus: () => void;
    onRefresh: () => void;
}

const SelectInfinity: React.ForwardRefRenderFunction<SelectInfinityMethod, SelectInfinityProps> = (
    {
        source = () => Promise.resolve(),
        transformer,
        getKey = (item) => item?.id,
        getLabel = (item) => item?.label,
        getLabelDropdownItem,
        getValue = (item) => item?.id,
        pagingProps,
        value = [],
        onChange,
        className,
        classNameDropdownItem,
        classNameTagItem,
        styleTagItem = {},
        mode,
        tagColor = "primary",
        allowCreateNew,
        onCreateNew,
        createNewLabel = "Create New",
        dropdownHeight = 250,
        customDropdownHeader,
        onOpenChange,
        ...props
    },
    ref
) => {
    const TAG_COLOR_MAP: Record<string, string> = {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        success: "var(--color-success)",
        green: "var(--color-success)",
        info: "var(--color-info)",
        blue: "var(--color-info)",
        warning: "var(--color-warning)",
        yellow: "var(--color-warning)",
        danger: "var(--color-danger)",
        red: "var(--color-danger)",
        error: "var(--color-danger)",
        dark: "var(--color-dark)",
        light: "var(--color-light)",
        muted: "var(--color-muted)",
        gray: "#6b7280",
    };
    const listRef = useRef<ElementRef<typeof AwesomeListComponent>>(null);
    const selectRef = useRef<React.ElementRef<typeof Select>>(null);

    const [textSearch, setTextSearch] = useState<string>();
    // add value properties for array value so when render tag it can be display
    const valueDisplay = useMemo(() => {
        let res: Array<any> = [];
        if (value?.length > 0) {
            res = value.map((i: any) => ({ ...i, value: getValue(i) }));
        }
        return res;
    }, [value]);

    const refreshList = () => {
        // @ts-ignore
        return listRef.current && listRef.current.refresh();
    };

    useImperativeHandle(ref, () => ({
        onRefresh: () => refreshList(),
        onBlur: () => selectRef.current && selectRef.current.onBlur(),
        onFocus: () => selectRef.current && selectRef.current.onFocus(),
    }));

    const onChangeTextSearch = _.debounce((text) => {
        setTextSearch(text);
        refreshList();
    }, 400);

    const renderItemDropdown = (item: any, index: any) => {
        const { getDisableOption } = props;
        const disabled = getDisableOption ? getDisableOption(item) : false;
        const label = getLabelDropdownItem ? getLabelDropdownItem(item) : getLabel(item);
        const itemValue = getValue(item);
        const isSelected = !!value && value?.length > 0 && value?.find((i: any) => getValue(i) === itemValue);
        const itemClass = ClassNames(
            "py-2 px-3",
            { "bg-primary-100 font-semibold": isSelected },
            { "opacity-50 cursor-not-allowed": disabled },
            { "cursor-pointer hover:bg-neutral-100": !disabled && !isSelected },
            classNameDropdownItem
        );
        return (
            <div
                className={itemClass}
                onClick={() => {
                    if (disabled) {
                        return;
                    }
                    if (mode === "tags" || mode === "multiple") {
                        let clone: Array<any> = [...value];
                        let cloneValue: Array<any> = [];
                        if (clone?.length > 0) {
                            cloneValue = clone.map((i) => getValue(i));
                        }
                        if (cloneValue.includes(itemValue)) {
                            clone = clone?.filter((i: any) => getValue(i) !== itemValue);
                        } else {
                            clone.push(item);
                        }
                        onChange && onChange(clone, null as any);
                    } else {
                        onChange && onChange([item], null as any);
                    }
                    if (mode !== "tags" && mode !== "multiple") {
                        selectRef.current && selectRef.current.onBlur();
                    }
                }}
                key={getKey(item)}
            >
                <div className="text-sm">{label}</div>
            </div>
        );
    };

    const renderDropDown = () => {
        return (
            <div
                className="bg-white shadow-lg rounded-sm border border-neutral-200"
                style={{
                    height: isString(dropdownHeight) ? dropdownHeight : `${dropdownHeight}px`,
                }}
            >
                {allowCreateNew && (
                    <div
                        onClick={() => onCreateNew && onCreateNew()}
                        className={ClassNames(
                            "py-2 px-3 cursor-pointer hover:bg-neutral-100 border-b border-neutral-200 text-primary",
                            classNameDropdownItem
                        )}
                    >
                        {createNewLabel}
                    </div>
                )}
                {customDropdownHeader && customDropdownHeader()}
                <AwesomeListComponent
                    ref={listRef}
                    renderItem={renderItemDropdown}
                    isPaging
                    transformer={transformer}
                    source={(paging) => {
                        const params = {
                            search: textSearch,
                        };
                        return source && source(params, paging);
                    }}
                    pagingProps={pagingProps}
                />
            </div>
        );
    };

    const onRemoveItem = (id: any) => {
        const clone = value.filter((i: any) => getValue(i) !== id);
        onChange && onChange(clone, null as any);
    };

    const customTagRender = (props: any) => {
        const tagValue = props?.value ?? null;
        // const tagValue = getValue(tagItem);
        let foundItem = null;
        if (tagValue) {
            foundItem = value?.find((i: any) => getValue(i) === tagValue);
        }
        if (!foundItem) {
            return <div />;
        }
        return (
            <div
                className={`py-1 text-white text-xs px-2 flex items-center mx-1 my-1 rounded ${classNameTagItem}`}
                style={{ width: "120px", backgroundColor: TAG_COLOR_MAP[tagColor] ?? TAG_COLOR_MAP.primary, ...styleTagItem }}
            >
                <div className="whitespace-nowrap w-full truncate">{getLabel(foundItem)}</div>
                <Icon
                    name="close"
                    size="small"
                    className="cursor-pointer ml-1"
                    onClick={() => onRemoveItem(tagValue)}
                />
            </div>
        );
    };

    return (
        <Select
            className={className}
            value={!mode ? getLabel(valueDisplay[0]) : valueDisplay}
            ref={selectRef}
            showSearch={{
                onSearch: onChangeTextSearch,
            }}
            popupRender={renderDropDown}
            onChange={onChange}
            mode={mode}
            hasFilter={false}
            tagRender={customTagRender}
            onOpenChange={onOpenChange}
            {...props}
        />
    );
};

export default React.forwardRef(SelectInfinity);
