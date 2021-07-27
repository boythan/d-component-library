import React, { useState } from "react";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import Progress from "../../../components/progress/Progress";

const TestModal = () => {
    const [openModal, setOpenModal] = useState(false);

    const onClickSave = () => {
        Progress.show({ method: () => Promise.resolve([]), params: [] });
    };

    return (
        <div>
            <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={onClickSave}
                title="Filter"
                closeIcon={false}
                hasCancelButton
                onSideClick={() => {}}
                size="medium"
                headerSide={() => (
                    <div className="text-nowrap" style={{ width: "200px" }}>
                        this is header side
                    </div>
                )}
                classNameFooter="d-none"
                titleAlign="start"
                hasCloseIcon={false}
            >
                <div />
            </Modal>
        </div>
    );
};

export default TestModal;
