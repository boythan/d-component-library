import React from "react";
import Button from "../../../components/button/Button";
import { Notifications } from "../../../dcomponent";

const TestNotification = () => {
    const onClickShowSuccess = () => {
        Notifications.showSuccess("Success message");
        console.log("document.documentElement.lang", document.documentElement.lang);
    };
    return (
        <div>
            <Button onClick={onClickShowSuccess} content="Show success" className="mt-3" />
            <Button onClick={() => Notifications.showError("Error message")} content="Show Error" className="mt-3" />
            <Button
                onClick={() => Notifications.showWarning("Warning message")}
                content="Show Warning"
                className="mt-3"
            />
            <Button onClick={() => Notifications.showInfo("Info message")} content="Show Info" className="mt-3" />
        </div>
    );
};

export default TestNotification;
