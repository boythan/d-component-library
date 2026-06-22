import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
export default {
    input: "src/dcomponent.tsx",
    external: ["react-is", "prop-types", "react-resizable", /yet-another-react-lightbox\/.*\.css/],
    output: [
        {
            dir: "dist/cjs",
            format: "cjs",
            exports: "named",
            preserveModules: true,
            preserveModulesRoot: "src",
            sourcemap: true,
        },
        {
            dir: "dist/es",
            format: "es",
            preserveModules: true,
            preserveModulesRoot: "src",
            sourcemap: true,
        },
    ],
    plugins: [
        external(),
        resolve(),
        image(),
        json(),
        postcss({
            extract: "index.css",
        }),
        typescript({
            exclude: "**/__tests__/**",
            clean: true,
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                exclude: ["node_modules", "dist", "src/__test__/**/*"],
                compilerOptions: {
                    noEmit: false,
                    declaration: true,
                    declarationDir: "dist/types",
                    outDir: "dist",
                },
            },
        }),
        commonjs({
            include: ["node_modules/**"],
        }),
    ],
    onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
        if (warning.code === "THIS_IS_UNDEFINED") return;
        warn(warning);
    },
};
