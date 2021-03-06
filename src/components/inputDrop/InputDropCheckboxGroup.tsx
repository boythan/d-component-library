import _ from "lodash";
import React, { useMemo, useState } from "react";
import CheckboxGroup, { CheckboxGroupProps } from "../checkbox/CheckboxGroup";
import InputDrop, { InputDropProps } from "./InputDrop";

const { isEmpty, filter, includes, map } = _;

export interface InputDropCheckboxGroupProps extends CheckboxGroupProps, InputDropProps {
    label: string;
    value?: any;
}
const InputDropCheckboxGroup = (props: InputDropCheckboxGroupProps) => {
    const {
        label,
        dataSource = [],
        numberOfColumns = "2",
        value = [],
        multiple,

        onChange,
        getLabel = (item) => item.label,
        getValue = (item) => item?.id,
        error,
        ...restProps
    } = props;
    const [valueInput, setValueInput] = useState<any[]>(value);
    const [textSearch, setTextSearch] = useState<string>("");

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

    const onClickApply = () => {
        return onChange && onChange(valueInput);
    };

    const onChangeTextSearch = (event: any) => {
        setTextSearch(event.target.value);
    };

    return (
        <InputDrop
            onClickSelectAll={onClickSelectAll}
            onClickClearAll={() => setValueInput([])}
            onChangeText={onChangeTextSearch}
            onClickApply={onClickApply}
            label={label}
            hideSelectAll={!multiple}
            content={() => (
                <CheckboxGroup
                    dataSource={dataSelectSource}
                    numberOfColumns={numberOfColumns}
                    onChange={setValueInput}
                    getLabel={getLabel}
                    getValue={getValue}
                    multiple={multiple}
                    {...restProps}
                    value={valueInput}
                    className="w-100"
                />
            )}
            error={error}
            {...restProps}
            valueLength={value.length}
        />
    );
};

export default InputDropCheckboxGroup;
