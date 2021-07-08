/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { filter, find, includes, isEmpty, map } from "lodash";
import React, { useMemo, useState } from "react";
import { CheckboxGroupProps } from "../checkbox/CheckboxGroup";
import Icon from "../icon/Icon";
import InputDrop, { InputDropProps } from "./InputDrop";

export interface InputDropSelectProps extends CheckboxGroupProps, InputDropProps {
    label: string;
    value?: any;
}
const InputDropSelect = (props: InputDropSelectProps) => {
    const {
        label,
        dataSource = [],
        value = [],

        onChange,
        getLabel = (item) => item.label,
        getValue = (item) => item?.id,
        error,
        multiple = true,
        ...restProps
    } = props;
    const [valueInput, setValueInput] = useState<any[]>(value);
    const [textSearch, setTextSearch] = useState<string>("");
    const [focusSelectList, setFocusSelectList] = useState<boolean>(true);
    const [focusInputSearch, setFocusInputSearch] = useState<boolean>(false);

    const dataSelectSource = useMemo(() => {
        if (isEmpty(textSearch)) return dataSource;
        return filter(dataSource, (item) => includes(getLabel(item), textSearch));
    }, [textSearch]);

    const onClickSelectAll = () => {
        const clone = map(dataSource, (i) => {
            return getValue(i);
        });
        setValueInput(clone);
    };

    const isSelected = (iValue: string) => !!find(valueInput, (id) => id === iValue);

    const onClickApply = () => {
        return onChange && onChange(valueInput);
    };

    const onChangeTextSearch = (event: any) => {
        const textValue = event.target.value;
        setTextSearch(textValue);
    };

    const onClickSelectItem = (iValue: string) => {
        if (!multiple) {
            setValueInput([iValue]);
            return;
        }
        const selected = isSelected(iValue);
        if (selected) {
            const dataResult = filter(valueInput, (id) => iValue !== id);
            setValueInput(dataResult);
        } else {
            setValueInput([...valueInput, iValue]);
        }
    };

    const renderValueItem = (id: string) => {
        const itemValue = find(dataSource, (item) => getValue(item) === id);
        const selected = isSelected(id);

        return (
            <div className="d-input-drop-select__item-container" onClick={() => onClickSelectItem(id)}>
                <text>{getLabel(itemValue)}</text>
                {selected && <Icon name="remove_circle" className="text-danger" />}
            </div>
        );
    };

    const renderSelectList = () => {
        return (
            <div
                tabIndex={1}
                onBlur={() => setTimeout(() => setFocusSelectList(false), 200)}
                onFocus={() => setFocusSelectList(true)}
                className="w-100"
            >
                {map(dataSelectSource, (item) => renderValueItem(getValue(item)))}
            </div>
        );
    };

    const renderContentInput = () => {
        if (focusInputSearch || focusSelectList) return renderSelectList();
        return <div className="w-100">{valueInput.map(renderValueItem)}</div>;
    };

    return (
        <InputDrop
            onClickSelectAll={onClickSelectAll}
            onClickClearAll={() => setValueInput([])}
            onChangeText={onChangeTextSearch}
            propsSearchText={{
                onBlur: () => setTimeout(() => setFocusInputSearch(false), 200),
                onFocus: () => setFocusInputSearch(true),
            }}
            onClickApply={onClickApply}
            label={label}
            content={renderContentInput}
            error={error}
            {...restProps}
            valueLength={value.length}
            hideSelectAll
        />
    );
};
export default InputDropSelect;
