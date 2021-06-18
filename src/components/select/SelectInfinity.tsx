/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import _ from "lodash";
import React, { ElementRef, useImperativeHandle, useRef, useState } from "react";
import Icon from "../icon/Icon";
import AwesomeListComponent, { AwesomeListComponentProps, IPaging } from "../list/awesomeList/AwesomeListComponent";
import Select, { SelectProps } from "./Select";

export interface SelectInfinityProps extends Omit<AwesomeListComponentProps, "source" | "renderItem">, SelectProps {
    source?: (params: any, paging: IPaging) => Promise<any>;
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
        getValue = (item) => item?.id ?? null,
        pagingProps,
        value = [],
        onChange,
        className,
        mode,
        ...props
    },
    ref
) => {
    const listRef = useRef<ElementRef<typeof AwesomeListComponent>>(null);
    const selectRef = useRef<React.ElementRef<typeof Select>>(null);
    const textSearch = useRef();
    const [valueObj, setValueObj] = useState<Array<any>>([]);

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
        textSearch.current = text;
        refreshList();
    }, 400);

    const renderItemDropdown = (item: any, index: any) => {
        const label = getLabel(item);
        const itemValue = getValue(item);
        return (
            <div
                className="py-3 px-3 hover-pointer"
                onClick={() => {
                    if (mode === "tags" || mode === "multiple") {
                        let clone: Array<any> = [...value];
                        let cloneObj: Array<any> = [...valueObj];
                        if (clone.includes(itemValue)) {
                            clone = clone?.filter((i: any) => i !== itemValue);
                            cloneObj = cloneObj.filter((i: any) => i?.id !== itemValue);
                        } else {
                            clone.push(itemValue);
                            cloneObj.push(item);
                        }
                        setValueObj(cloneObj);
                        onChange && onChange(clone, null as any);
                    } else {
                        setValueObj([item]);
                        onChange && onChange([itemValue], null as any);
                    }
                    if (mode !== "tags" && mode !== "multiple") {
                        selectRef.current && selectRef.current.onBlur();
                    }
                }}
                key={getKey(item)}
            >
                <div className="text-small">{label}</div>
            </div>
        );
    };

    const renderDropDown = () => {
        return (
            <div style={{ height: "250px" }}>
                <AwesomeListComponent
                    ref={listRef}
                    renderItem={renderItemDropdown}
                    isPaging
                    transformer={transformer}
                    source={(paging) => {
                        const params = {
                            search: textSearch.current,
                        };
                        return source && source(params, paging);
                    }}
                    pagingProps={pagingProps}
                />
            </div>
        );
    };

    const onRemoveItem = (id: any) => {
        const clone = value.filter((i: any) => i !== id);
        const cloneObj = valueObj.filter((i) => i?.id !== id);
        setValueObj(cloneObj);
        onChange && onChange(clone, null as any);
    };
    const customTagRender = (props: any) => {
        console.log({ props });
        const tagValue = props?.value ?? null;
        let foundItem = null;
        if (tagValue) {
            foundItem = valueObj?.find((i: any) => i?.id === tagValue);
        }
        if (!foundItem) {
            return <div />;
        }
        return (
            <div
                className="py-1 text-white text-x-small px-2 bg-secondary flex-center-y mx-1"
                style={{ width: "110px" }}
            >
                <div className="text-nowrap w-100">{getLabel(foundItem)}</div>
                <Icon name="close" size="x-small" className="hover-pointer" onClick={() => onRemoveItem(tagValue)} />
            </div>
        );
    };

    return (
        <Select
            showSearch
            className={className}
            value={!mode ? getLabel(valueObj[0]) : value}
            ref={selectRef}
            onSearch={onChangeTextSearch}
            dropdownRender={renderDropDown}
            onChange={onChange}
            mode={mode}
            hasFilter={false}
            tagRender={customTagRender}
            {...props}
        />
    );
};

export default React.forwardRef(SelectInfinity);
