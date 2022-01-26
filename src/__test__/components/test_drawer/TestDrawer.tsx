import React, { useState } from "react";
import Button from "../../../components/button/Button";
import Drawer from "../../../components/drawer/Drawer";
import Modal from "../../../components/modal/Modal";

export interface ITestDrawerProps {
    [key: string]: any;
}

const TestDrawer: React.FC<ITestDrawerProps> = ({ id }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <Button content="Open Drawer" onClick={() => setOpenDrawer(true)} />
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                closable={false}
                width="1200px"
                size="auto"
                maskClosable={false}
            >
                Drawer Children
                <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
            </Drawer>
            <Modal open={openModal} onClose={() => setOpenModal(false)} maskClosable={false}>
                Modal Content
            </Modal>
        </div>
    );
};

export default TestDrawer;
