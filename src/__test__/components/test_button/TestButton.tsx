import React from "react";
import Button from "../../../components/button/Button";

export interface TestButtonProps {
    [key: string]: any;
}

const TestButton: React.FC<TestButtonProps> = ({ id }) => {
    return (
        <div className="d-flex my-4">
            <div className="d-flex flex-column mr-5">
                <Button content="Button" color="gray" variant="outline" className="text-underline text-secondary" />
                <Button content="Button" color="gray" variant="standard" />
                <Button content="Button" color="muted" variant="standard" />
                <Button content="Button" color="green" variant="trans" />
                <Button content="Button" variant="trans" className="my-3" />
                <Button content="Disabled Button" className="my-3" disabled />
                <Button content="Button" className="my-3" size="medium" color="error" />
                <Button content="Button" className="my-3" size="small" color="success" />
                <Button content="Button" className="my-3" size="x-small" />
            </div>
            <div className="d-flex flex-column mx-5">
                <Button content="Button" variant="outline" className="my-3" disabled />
                <Button content="Button" className="my-3" size="medium" variant="outline" />
                <Button content="Button" className="my-3" size="small" variant="outline" />
                <Button content="Button" className="my-3" size="x-small" variant="outline" />
            </div>
            <div className="d-flex flex-column ml-5">
                <Button variant="trans">dgdgdgdg</Button>
                <Button content="Icon Button" iconName="home" />
                <Button content="Icon Button" iconName="home" suffixIcon="home" variant="trans" />
                <Button content="Icon Button" className="my-3" iconName="home" variant="outline" />
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
