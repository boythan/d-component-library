import { TreeSelect as TreeSelectAnt, TreeSelectProps as TreeSelectPropsAnt } from "antd";
import classname from "classnames";
import ViewTextError from "../view/ViewTextError";

export interface TreeSelectProps extends Omit<TreeSelectPropsAnt, 'variant'> {
    className?: string;
    classNameSelect?: string;

    value: any[];
    label?: string;
    placeholder?: string;
    onChange?: any;
    disabled?: boolean;
    dataSource?: any[];
    error?: string;
    multiple?: boolean;

    allowClear?: boolean;
    variant?: "outline" | "standard";
}

const TreeSelect = ({
    className,
    classNameSelect,

    value = [],
    label,
    placeholder = "Please select",
    onChange,
    disabled,
    dataSource = [],
    error,
    multiple = false,

    allowClear = true,
    variant = "outline",
    ...rest
}: TreeSelectProps) => {
    const container = classname("flex flex-col select-container", `select-container-${variant}`, className);

    const selectClass = classname(
        "select-input",
        `select-input-${variant}`,
        {
            "select-input-disabled": disabled,
            "select-input-error": !!error,
        },
        classNameSelect
    );

    // Map our custom variant to Ant Design's variant
    const antdVariant = variant === "outline" ? "outlined" : "filled";

    return (
        <div className={container}>
            {label && <label className="text-sm font-medium mb-1 text-text-main block">{label}</label>}

            <TreeSelectAnt
                className={selectClass}
                disabled={disabled}
                treeData={dataSource}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                multiple={multiple}
                allowClear={allowClear}
                variant={antdVariant}
                {...rest}
            />

            <ViewTextError error={error} />
        </div>
    );
};

export default TreeSelect;
