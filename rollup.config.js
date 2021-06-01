import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import bundleScss from "rollup-plugin-bundle-scss";
// import scss from "rollup-plugin-scss";
import path from "path";

import pkg from "./package.json";

export default {
    input: "src/dcomponent.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: true,
        },
    ],
    plugins: [
        external(),
        resolve(),
        // scss(),
        postcss({
            // extract: true,
            // Or with custom file name, it will generate file relative to bundle.js in v3

            extract: path.resolve("dist/index.css"),
        }),
        bundleScss(),
        typescript({
            rollupCommonJSResolveHack: true,
            exclude: "**/__tests__/**",
            clean: true,
        }),
        commonjs({
            include: ["node_modules/**"],
            namedExports: {
                "node_modules/react/react.js": ["Children", "Component", "PropTypes", "createElement"],
                "node_modules/react-dom/index.js": ["render"],
                "node_modules/react-is/index.js": ["isFragment", "ForwardRef", "isMemo"],
            },
        }),
    ],
};
