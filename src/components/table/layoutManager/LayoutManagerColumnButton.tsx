import _ from "lodash";
import React, { useMemo, useState } from "react";
import Messages from "../../../language/Messages";
import Button from "../../button/Button";
import CheckboxGroup from "../../checkbox/CheckboxGroup";
import Popover from "../../popover/Popover";
import LayoutTableManager from "./LayoutTableManager";

interface LayoutManagerColumnButtonProps {
    dataSource: any[];
    values: any[];
    tableKey: string;
    onChange: (values: any[]) => any;
    onClickReset: () => any;
    onChangeLayout: (layout: any) => any;
}
const LayoutManagerColumnButton = (props: LayoutManagerColumnButtonProps) => {
    const { dataSource, values = [], onChange, onClickReset, onChangeLayout, tableKey } = props;
    const [openPopover, setOpenPopover] = useState<boolean>(false);

    const tableLayouts = LayoutTableManager.getTableLayouts(tableKey);
    const tableLayoutDefault = useMemo(() => _.find(tableLayouts, (item) => item.isDefault), [tableLayouts]);

    const renderManageColumns = () => {
        return (
            <div className="w-100 p-3">
                <div className="border-bottom py-3">
                    <small>
                        {Messages.outOfVisible
                            .replace("%numOfVisible", `${values.length}`)
                            .replace("%total", `${dataSource.length}`)}
                    </small>
                </div>
                <div>
                    <CheckboxGroup
                        dataSource={dataSource}
                        value={values}
                        onChange={onChange}
                        getLabel={(item) => item.title}
                    />
                </div>
                <div className="border-top d-flex flex-space-between ">
                    <Button variant="trans" onClick={onClickReset}>
                        {Messages.reset}
                    </Button>
                    <Button variant="trans" onClick={() => onChangeLayout(tableLayoutDefault)}>
                        {Messages.cancel}
                    </Button>
                </div>
            </div>
        );
    };
    return (
        <Popover
            open={openPopover}
            onOpen={() => setOpenPopover(true)}
            onClose={() => setOpenPopover(false)}
            content={renderManageColumns()}
            classNameContent="d-table-awesome__layout-manager-column-popover"
        >
            <Button
                content={Messages.column}
                iconName="settings"
                variant="trans"
                onClick={() => {}}
                color="gray"
                className="font-weight-normal"
            />
        </Popover>
    );
};

export default LayoutManagerColumnButton;
