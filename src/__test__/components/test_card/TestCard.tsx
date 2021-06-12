import React from "react";
import Card from "../../../components/card/Card";
import Select from "../../../components/select/Select";

export interface TestCardProps {
    [key: string]: any;
}

const TestCard: React.FC<TestCardProps> = ({ id }) => {
    return (
        <Card className="bg-muted w-100 h-100">
            <Card title="Card Title" sideText="Edit" customRight={<Select dataSource={[]} />} index="99+">
                This pattern relies less on the compiler, and more on your codebase to ensure both runtime and
                type-system are correctly kept in sync. Constraints The mixin pattern is supported natively inside the
                TypeScript compiler by code flow analysis. There are a few cases where you can hit the edges of the
                native support. Decorators and Mixins #4881 You cannot use decorators to provide mixins via code flow
                analysis:
            </Card>
        </Card>
    );
};

export default TestCard;
