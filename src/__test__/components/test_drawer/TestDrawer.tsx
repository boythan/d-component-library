import React, { useState } from "react";
import Button from "../../../components/button/Button";
import Drawer from "../../../components/drawer/Drawer";

export interface ITestDrawerProps {
    [key: string]: any;
}

const TestDrawer: React.FC<ITestDrawerProps> = ({ id }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <div>
            <Button content="Open Drawer" onClick={() => setOpenDrawer(true)} />
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} closable={false}>
                Drawer Children
            </Drawer>
        </div>
    );
};

export default TestDrawer;
