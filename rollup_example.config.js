// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import scss from "rollup-plugin-scss";

const LIBRARY_NAME = "Formaggino"; // Change with your library's name
const EXTERNAL = []; // Indicate which modules should be treated as external
const GLOBALS = {}; // https://rollupjs.org/guide/en/#outputglobals

const makeConfig = (env = "development") => {
  const config = {
    input: "example/js/index.js",
    external: EXTERNAL,
    output: [
      {
        name: LIBRARY_NAME,
        file: `example/dist/scripts.js`, // UMD
        format: "umd",
        exports: "auto",
        globals: GLOBALS
      }
    ],
    plugins: [
      // Uncomment the following 2 lines if your library has external dependencies
      // resolve(), // teach Rollup how to find external modules
      // commonjs(), // so Rollup can convert external modules to an ES module
      babel({
        babelHelpers: "bundled",
        exclude: ["node_modules/**"]
      }),
      scss({
        output: "./example/dist/style.min.css",
        failOnError: true,
        outputStyle: env === "production" ? "compressed" : null,
        watch: ["./public"]
      })
    ]
  };

  if (env === "production") {
    config.plugins.push(
      terser({
        output: {
          comments: /^!/
        }
      })
    );
  }

  return config;
};

export default (commandLineArgs) => {
  const configs = [makeConfig()];

  // Production
  if (commandLineArgs.environment === "BUILD:production") {
    configs.push(makeConfig("production"));
  }

  return configs;
};
