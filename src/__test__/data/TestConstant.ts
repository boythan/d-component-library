import { DropdownProps } from "../../components/dropdown/Dropdown";
import Messages from "../../language/Messages";

// eslint-disable-next-line import/prefer-default-export
export const ATTRIBUTE_INPUT_TYPE = [
    {
        id: "dropdown",
        label: "dropdowndropdowndropdowndropdown",
        iconName: "person",
        subObject: {
            name: "Test",
            id: "test",
            children: {
                name: "children",
                id: "children",
            },
        },
        subMenu: [
            {
                id: "color",
                label: "swatchColor",
                subMenu: [
                    { id: "text", label: "swatchText" },
                    { id: "image", label: "swatchImage" },
                    { id: "color", label: "swatchColor" },
                    { id: "color", label: "swatchColor" },
                ],
            },
            { id: "color", label: "swatchColor" },
            { id: "color", label: "swatchColor" },
            { id: "color", label: "swatchColor" },
            { id: "color", label: "swatchColor" },
        ],
    },
    { id: "text", label: "swatchText " },
    { id: "image", label: "swatchImage" },
    { id: "color", label: "swatchColor" },
    { id: "theme", label: "swatchTheme" },
    { id: "size", label: "swatchSize" },
    { id: "thin", label: "swatchThin" },
    { id: "fat", label: "swatchFat" },
];

export const SELECT_DATA = [
    { id: "text", label: "swatchText" },
    { id: "image", label: "swatchImage" },
    { id: "color", label: "swatchColor" },
    { id: "color1", label: "swatchColor" },
    { id: "color2", label: "swatchColor" },
    { id: "color3", label: "swatchColor" },
    { id: "color4", label: "swatchColor" },
    { id: "color5", label: "swatchColor" },
    { id: "color6", label: "swatchColor" },
    { id: "color7", label: "swatchColor" },
    { id: "color8", label: "swatchColor" },
    { id: "color9", label: "swatchColor" },
    { id: "color10", label: "swatchColor" },
    { id: "color11", label: "swatchColor" },
];

export const LANGUAGES: DropdownProps["dataSource"] = [
    {
        id: "thai",
        label: "Thai",
        iconName: "person",
        image: "./images/languages/language-1.png",
    },
    {
        id: "eng",
        label: "English",
        iconName: "person",
        image: "./images/languages/language-3.png",
    },
];

export const DELIVERY_STATUS_LIST = [
    {
        id: "pending",
        value: "pending",
        label: "pendingName",
        color: "#FFBD59 ",
    },

    { id: "reject", value: "reject", label: "rejected", color: "#EB5757" },

    {
        id: "confirm",
        value: "confirm",
        label: "confirmed",
        color: "#33B950",
    },
    {
        id: "cancelled",
        value: "cancelled",
        label: "cancelled",
        color: "#8D8D8D",
    },
];

export const TREE_DATA = [
    {
        id: "timeline",
        label: "timeLine",
        iconName: "access_time",
        title: "timeLine",
    },
    {
        id: "employee",
        label: "employee",
        iconName: "manage_accounts",
        title: "employee",
    },
    {
        id: "employeeDetail",
        label: "employeeDetail",
        title: "employeeDetail",
        notShow: true,
        parentId: "employee",
    },
    {
        id: "newEmployee",
        label: "newEmployee",
        title: "newEmployee",
        notShow: true,
        parentId: "employee",
    },

    {
        id: "paySlipGroup",
        label: "paySlipGroup",
        iconName: "paid",
        title: "paySlipGroup",
        subMenu: [],
    },

    {
        id: "createPaySlip",
        label: "createPaySlip",
        title: "createPaySlip",
        notShow: true,
        parentId: "paySlipGroup",
    },
    {
        id: "createPaySlipSub",
        label: "createPaySlipSub",
        title: "createPaySlipSub",
        notShow: true,
        parentId: "createPaySlip",
    },
    {
        id: "createPaySlipSub_1",
        label: "createPaySlipSub_1",
        title: "createPaySlipSub_1",
        notShow: true,
        parentId: "createPaySlipSub",
    },
    {
        id: "payslipDetail",
        label: "payslipDetail",
        title: "payslipDetail",
        notShow: true,
        parentId: "paySlipGroup",
    },

    {
        id: "request",
        label: "request",
        iconName: "shutter_speed",
        title: "request",
        subMenu: [
            {
                id: "eventRequest",
                label: "eventRequest",
                title: "eventRequest",
                notShow: true,
                parentId: "request",
                query: "tab=eventRequest",
                subMenu: [
                    {
                        id: "eventDetail",
                        label: "eventDetail",
                        title: "eventDetail",
                        notShow: true,
                        parentId: "eventRequest",
                    },
                    {
                        id: "eventCreate",
                        label: "eventCreate",
                        title: "eventCreate",
                        notShow: true,
                        parentId: "eventRequest",
                    },
                ],
            },
            {
                id: "leaveRequest",
                label: "leaveRequest",
                title: "leaveRequest",
                notShow: true,
                parentId: "request",
                query: "tab=leaveRequest",
                subMenu: [
                    {
                        id: "leaveDetail",
                        label: "leaveDetail",
                        title: "leaveDetail",
                        notShow: true,
                        parentId: "leaveRequest",
                    },
                    {
                        id: "leaveReqCreate",
                        label: "leaveReqCreate",
                        title: "leaveReqCreate",
                        notShow: true,
                        parentId: "leaveCreate",
                    },
                ],
            },
            {
                id: "otRequest",
                label: "otRequest",
                title: "otRequest",
                notShow: true,
                parentId: "request",
                query: "tab=otRequest",
                subMenu: [
                    {
                        id: "overtimeDetail",
                        label: "overtimeDetail",
                        title: "overtimeDetail",
                        notShow: true,
                        parentId: "otRequest",
                    },
                    {
                        id: "overtimeCreate",
                        label: "overtimeCreate",
                        title: "overtimeCreate",
                        notShow: true,
                        parentId: "otRequest",
                    },
                ],
            },
        ],
    },

    {
        id: "broadcast",
        label: "broadcast",
        iconName: "podcasts",
        title: "broadcast",
    },

    {
        id: "createBroadcast",
        label: "createBroadcast",
        title: "createBroadcast",
        notShow: true,
        parentId: "broadcast",
    },

    {
        id: "holiday",
        label: "holiday",
        iconName: "sailing",
        title: "holiday",
    },

    {
        id: "recruitment",
        label: "recruitment",
        iconName: "settings_input_antenna",
        title: "recruitment",
    },
];
