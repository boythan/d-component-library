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
    // "text" class replacement: text-sm text-gray-500
    const textClassName = classNames("text-sm text-gray-500", classNameText);
    // page-header__breadcrumb replacement: flex items-center
    const containerClassName = classNames("flex items-center", className);
    const lastIndex = breadcrumb.length - 1;

    const breadcrumbView = breadcrumb.map((item: any, index: number) => {
        let link;

        if (lastIndex === index) {
            link = (
                <div key={index} className={classNames(textClassName, "font-medium text-gray-700")}>
                    {item.title}
                </div>
            );
        } else {
            link = (
                <div key={index} className="flex items-center">
                    <a
                        href={item.url}
                        className={classNames(textClassName, "text-primary hover:text-primary transition-colors")}
                    >
                        {item.title}
                    </a>
                    <Icon className="text-gray-400 mx-2 text-sm" name="chevron_right" />
                </div>
            );
        }

        return link;
    });

    return <div className={containerClassName}>{breadcrumbView}</div>;
};

export default Breadcrumb;
