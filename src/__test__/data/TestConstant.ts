import { DropdownProps } from "../../components/dropdown/Dropdown";

// eslint-disable-next-line import/prefer-default-export
export const ATTRIBUTE_INPUT_TYPE = [
    {
        id: "dropdown",
        label: "dropdown",
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
    { id: "text", label: "swatchText swatchText swatchText  swatchText  swatchText  swatchText" },
    { id: "image", label: "swatchImage" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
    { id: "color", label: "swatchColor" },
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
