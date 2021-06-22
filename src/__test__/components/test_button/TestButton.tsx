import React from "react";
import Button from "../../../components/button/Button";

export interface TestButtonProps {
    [key: string]: any;
}

const TestButton: React.FC<TestButtonProps> = ({ id }) => {
    return (
        <div className="d-flex my-4">
            <div className="d-flex flex-column mr-5">
                <Button content="Button Outline Gray" color="gray" variant="outline" className="my-3" />
                <Button content="Button Outline Green" color="green" variant="outline" className="my-3" />
                <Button
                    content="Button Outline Green Disabled"
                    color="green"
                    variant="outline"
                    className="my-3"
                    disabled
                />
                <Button content="Button Standard" color="gray" variant="standard" className="my-3" />
                <Button content="Button Standard" color="primary" variant="standard" className="my-3" />
                <Button content="Button Standard Disabled" color="muted" variant="standard" className="my-3" disabled />
                <Button content="Button Trans" color="green" variant="trans" className="my-3" />
                <Button content="Button Trans" variant="trans" className="my-3" />
                <Button content="Button Trans Disabled" variant="trans" className="my-3" disabled />
                <Button content="Disabled Button" className="my-3" disabled />
                <Button content="Button Medium Error" className="my-3" size="medium" color="error" />
                <Button content="Button Small Success" className="my-3" size="small" color="success" />
                <Button content="Button X-small" className="my-3" size="x-small" />
            </div>
            <div className="d-flex flex-column mx-5">
                <Button content="Button Outline Disabled" variant="outline" className="my-3" disabled />
                <Button content="Button Outline Medium" className="my-3" size="medium" variant="outline" />
                <Button content="Button Outline Small" className="my-3" size="small" variant="outline" />
                <Button content="Button Outline X-small" className="my-3" size="x-small" variant="outline" />
            </div>
            <div className="d-flex flex-column ml-5">
                <Button variant="trans">Button With Children</Button>
                <Button content="Icon Button" iconName="home" />
                <Button content="Icon Button" iconName="home" disabled />
                <Button content="Icon Button Trans" iconName="home" suffixIcon="home" variant="trans" />
                <Button content="Icon Button Outline" className="my-3" iconName="home" variant="outline" />
                <Button className="my-3" iconName="home" variant="outline" disabled />
                <Button className="my-3" iconName="home" variant="outline" />
                <Button className="my-3" iconName="home" variant="outline" size="medium" />
                <Button className="my-3" iconName="home" variant="outline" size="small" />
                <Button className="my-3" iconName="home" variant="outline" size="x-small" />
                <Button className="my-3 px-0 py-0" iconName="home" variant="outline" size="auto" />
                <Button className="my-3 py-1 px-1" iconName="home" variant="outline" size="fit-content" />
            </div>
        </div>
    );
};

export default TestButton;
