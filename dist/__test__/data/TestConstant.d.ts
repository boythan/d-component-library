export declare const ATTRIBUTE_INPUT_TYPE: ({
    id: string;
    label: string;
    iconName: string;
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
    subMenu?: undefined;
})[];
