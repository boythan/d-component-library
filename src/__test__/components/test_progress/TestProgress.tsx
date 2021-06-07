import React from "react";
import Progress from "../../../components/progress/Progress";
import { Button } from "../../../dcomponent";

const TestProgress = () => {
    const progressMethod = async () => {
        setTimeout(() => {
            return Promise.resolve(true);
        }, 2000);
    };

    const onClickShowProgress = () => {
        Progress.show({ method: progressMethod, params: [] }, (res) => {});
    };

    return (
        <div className="container">
            <Button content="Show progress" onClick={onClickShowProgress} />
        </div>
    );
};

export default TestProgress;
