import { DropdownProps } from "../../components/dropdown/Dropdown";

// eslint-disable-next-line import/prefer-default-export
export const ATTRIBUTE_INPUT_TYPE = [
    {
        id: "dropdown",
        label: "dropdown",
        iconName: "person",
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
    { id: "text", label: "swatchText" },
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
