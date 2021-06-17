/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import _ from "lodash";
import React, { ElementRef, useImperativeHandle, useRef } from "react";
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

    const renderTagItemSelect = (item: any, index: any) => {
        const label = getLabel(item);
        const itemValue = getValue(item);
        return (
            <div
                className="py-3 px-3 hover-pointer"
                onClick={() => {
                    if (mode === "tags" || mode === "multiple") {
                        let clone: Array<any> = [...value];
                        if (clone.includes(itemValue)) {
                            clone = clone?.filter((i: any) => i !== itemValue);
                        } else {
                            clone.push(itemValue);
                        }
                        onChange && onChange(clone, null as any);
                    } else {
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
                    renderItem={renderTagItemSelect}
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

    const customTagRender = (props: any) => {
        console.log({ props });
        const tagValue = props?.value ?? null;
        if (tagValue) {
            const item = value?.find((i: any) => i === tagValue);
        }
        return <div>this is tag</div>;
    };
    return (
        <Select
            className={className}
            value={value}
            showSearch
            ref={selectRef}
            onSearch={onChangeTextSearch}
            dropdownRender={renderDropDown}
            onChange={onChange}
            mode={mode}
            // tagRender={customTagRender}
            {...props}
        />
    );
};

export default React.forwardRef(SelectInfinity);
