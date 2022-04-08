import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import scss from "rollup-plugin-scss";
import json from '@rollup/plugin-json';
import markdown from '@jackfranklin/rollup-plugin-markdown'

const LIBRARY_NAME = "Formaggino"; // Change with your library's name
const EXTERNAL = []; // Indicate which modules should be treated as external
const GLOBALS = {}; // https://rollupjs.org/guide/en/#outputglobals

const makeConfig = (env = "development") => {
  const config = [
    {
      input: "src/index.js",
      external: EXTERNAL,
      output: [
        {
          file: `docs/dist/${LIBRARY_NAME}.esm.js`, // ESM
          format: "es",
          exports: "auto",
          globals: GLOBALS,
        },
      ],
      plugins: [
        // Uncomment the following 2 lines if your library has external dependencies
        // resolve(), // teach Rollup how to find external modules
        // commonjs(), // so Rollup can convert external modules to an ES module
        babel({
          babelHelpers: "bundled",
          exclude: ["node_modules/**"],
        }),
        scss({
          output: "./docs/dist/style.min.css",
          failOnError: true,
          outputStyle: env === "production" ? "compressed" : null,
          watch: ["./public"],
        }),
      ],
    },
    {
      input: "docs/js/index.js",
      external: EXTERNAL,
      output: [
        {
          name: LIBRARY_NAME,
          file: `docs/dist/scripts.js`, // UMD
          format: "cjs",
          exports: "auto",
          globals: GLOBALS,
        },
      ],
      plugins: [
        babel({
          babelHelpers: "bundled",
          exclude: ["node_modules/**"],
        }),
        scss({
          output: "./docs/dist/style.min.css",
          failOnError: true,
          outputStyle: env === "production" ? "compressed" : null,
          watch: ["./public"],
        }),
        commonjs(), // so Rollup can convert external modules to an ES module
        resolve(), // teach Rollup how to find external modules
        json(),
        markdown()
      ],
    },
  ];

  if (env === "production") {
    config.forEach((el) => {
      el.plugins.push(
        terser({
          output: {
            comments: /^!/,
          },
        })
      );
    });
  }
  return config;
};

export default (commandLineArgs) => {
  let configs = makeConfig();

  // Production
  if (commandLineArgs.environment === "BUILD:production") {
    configs = makeConfig("production");
  }

  return configs;
};
