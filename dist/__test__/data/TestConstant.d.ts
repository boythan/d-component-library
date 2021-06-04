import { DropdownProps } from "../../components/dropdown/Dropdown";
export declare const ATTRIBUTE_INPUT_TYPE: ({
    id: string;
    label: string;
    iconName: string;
    subObject: {
        name: string;
        id: string;
        children: {
            name: string;
            id: string;
        };
    };
    subMenu: ({
        id: string;
        label: string;
        subMenu: {
            id: string;
            label: string;
        }[];
    } | {
        id: string;
        label: string;
        subMenu?: undefined;
    })[];
} | {
    id: string;
    label: string;
    iconName?: undefined;
    subObject?: undefined;
    subMenu?: undefined;
})[];
export declare const SELECT_DATA: {
    id: string;
    label: string;
}[];
export declare const LANGUAGES: DropdownProps["dataSource"];
