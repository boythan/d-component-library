import React, { CSSProperties, useMemo } from "react";

export interface ITriangleProps {
    position?: "left" | "right" | "top" | "bottom";
    color?: string;
    secondaryColor?: string;
    height?: number;
}

const Triangle: React.FC<ITriangleProps> = ({ position = "right", color, secondaryColor, height = 40 }) => {
    const borderStyle: CSSProperties = useMemo(() => {
        if (position === "left") {
            return {
                borderBottom: `${height}px solid ${secondaryColor}`,
                borderTop: `${height}px solid ${secondaryColor}`,
                borderLeft: `${height}px solid ${color}`,
            };
        }
        return {
            borderBottom: `${height}px solid ${secondaryColor}`,
            borderTop: `${height}px solid ${secondaryColor}`,
            borderRight: `${height}px solid ${color}`,
        };
    }, [position]);
    return (
        <div
            style={{
                width: 0,
                height: 0,
                backgroundColor: "white",
                ...borderStyle,
            }}
            // className="mx-1"
        />
    );
};

export default Triangle;
