import classNames from "classnames";
import React from "react";
import Icon from "../elements/icon/Icon";

export interface IBreadcrumb {
    title: string;
    url: string;
}

export interface BreadcrumbProps {
    breadcrumb: IBreadcrumb[];
    classNameText?: string;
    className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb, classNameText, className }) => {
    const textClassName = classNames("text", classNameText);
    const containerClassName = classNames("page-header__breadcrumb", className);
    const lastIndex = breadcrumb.length - 1;

    const breadcrumbView = breadcrumb.map((item: any, index: number) => {
        let link;

        if (lastIndex === index) {
            link = <div className={textClassName}>{item.title}</div>;
        } else {
            link = (
                <div key={index} className="flex-center">
                    <a href={item.url} className={textClassName}>
                        {item.title}
                    </a>
                    <Icon className="breadcrumb-arrow mx-2" name="chevron_right" />
                </div>
            );
        }

        return link;
    });

    return <div className={containerClassName}>{breadcrumbView}</div>;
};

export default Breadcrumb;
