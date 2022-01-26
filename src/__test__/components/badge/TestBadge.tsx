import React, { useState } from "react";
import Avatar from "../../../components/avatar/Avatar";
import Badge from "../../../components/elements/badge/Badge";
import Button from "../../../components/button/Button";
import Icon from "../../../components/elements/icon/Icon";

const TestBadge = () => {
    const [valueSelect, setValueSelect] = useState();

    return (
        <div>
            <div className="p-5 d-flex">
                <Badge className="mx-3" size="xx-small">
                    <Icon name="comment" size="small" />
                </Badge>
                <Badge className="mx-3" size="x-small">
                    <Icon name="comment" />
                </Badge>
                <Badge className="mx-3">
                    <Icon name="comment" size="x-large" />
                </Badge>
                <Badge className="mx-3">
                    <Icon name="comment" size="xx-large" />
                </Badge>
                <Badge className="mx-3" variant="index" size="small" index={20}>
                    <Icon name="comment" size="small" />
                </Badge>
                <Badge className="mx-3" variant="index" index="+99" size="medium">
                    <Icon name="comment" />
                </Badge>
                <Badge className="mx-3" variant="index" index="+99" size="large">
                    <Icon name="comment" size="x-large" />
                </Badge>
                <Badge className="mx-3" variant="index" size="xx-large" index={99}>
                    <Icon name="comment" size="xx-large" />
                </Badge>
            </div>
            <div className="p-5 d-flex">
                <Badge className="mx-3">
                    <Button iconName="filter_list" />
                </Badge>
                <Badge className="mx-3">
                    <Button iconName="filter_list" content="Filter" />
                </Badge>
                <Badge variant="index" className="mx-3">
                    <Button iconName="filter_list" />
                </Badge>
                <Badge variant="index" className="mx-3">
                    <Button iconName="filter_list" content="Filter" />
                </Badge>
            </div>
            <div className="p-5 d-flex">
                <Badge className="mx-3">
                    <Avatar text="Avatar" size="xx-small" />
                </Badge>
                <Badge className="mx-3">
                    <Avatar text="Avatar" size="x-small" />
                </Badge>
                <Badge className="mx-3">
                    <Avatar text="Avatar" size="small" />
                </Badge>
                <Badge className="mx-3" size="xx-large">
                    <Avatar text="Avatar" size="medium" />
                </Badge>
                <Badge className="mx-3" size="xxx-large">
                    <Avatar text="Avatar" size="large" />
                </Badge>
            </div>
            <div className="p-5 d-flex">
                <Badge
                    className="mx-3"
                    size="xx-large"
                    variant="index"
                    index={<Icon name="female" className="d-block" />}
                >
                    <Avatar text="Avatar" size="medium" />
                </Badge>
                <Badge className="mx-3" size="xxx-large">
                    <Avatar text="Avatar" size="large" />
                </Badge>
            </div>
        </div>
    );
};

export default TestBadge;
