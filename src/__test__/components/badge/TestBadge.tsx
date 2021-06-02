import React, { useState } from "react";
import Avatar from "../../../components/avatar/Avatar";
import Badge from "../../../components/badge/Badge";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";

const TestBadge = () => {
    const [valueSelect, setValueSelect] = useState();

    return (
        <div>
            <div className="p-5 d-flex">
                <Badge className="mx-3">
                    <Icon name="comment" size="small" />
                </Badge>
                <Badge className="mx-3">
                    <Icon name="comment" />
                </Badge>
                <Badge className="mx-3">
                    <Icon name="comment" size="x-large" />
                </Badge>
                <Badge className="mx-3">
                    <Icon name="comment" size="xx-large" />
                </Badge>
                <Badge className="mx-3" variant="index" index={20}>
                    <Icon name="comment" size="small" />
                </Badge>
                <Badge className="mx-3" variant="index" index="+99" size="x-large">
                    <Icon name="comment" />
                </Badge>
                <Badge className="mx-3" variant="index" index="+99" size="x-large">
                    <Icon name="comment" size="x-large" />
                </Badge>
                <Badge className="mx-3" variant="index">
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
                <Badge className="mx-3" size="xxx-large" variant="index" index="99+">
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
