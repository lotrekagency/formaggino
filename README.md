![build](https://github.com/lotrekagency/formaggino/workflows/build/badge.svg)

# 🧀 Formaggino

A small vanilla js library for validate your forms without external dependencies


## Getting started



### 3. Build for development

- Having all the dependencies installed run `npm run dev`. This command will generate `UMD` (unminified), `CommonJS` and `ESM` modules under the `dist` folder. It will also watch for changes in source files to recompile.

### 4. Build for production

- Having all the dependencies installed run `npm run build`. This command will generate the same modules as above and one extra minified `UMD` bundle for usage in browser.

## Scripts

- `npm run build` - Produces production version of library modules under `dist` folder.
- `npm run dev` - Produces a development version of library and runs a watcher to watch for changes.
- `npm run test` - Runs the tests.
- `npm run test:watch` - Runs the tests in watch mode for development.
- `npm run test:coverage` - Runs the tests and provides with test coverage information.
- `npm run lint` - Lints the source code with ESlint.
- `npm run prepare` - Run both BEFORE the package is packed and published, on local npm install without any arguments, and when installing git dependencies.
- `npm run clean` - Deletes `dist` and `coverage` folders.

## Misc

- By default all source code is located under the `src` folder.
- Be default `dist` folder is excluded from source control but included for npm. You can change this behavior by not excluding this folder inside the `.gitignore` file.
- The starter kit assumes that all tests are located under `test` folder with `.spec.js` extension.

## License

[The MIT License (MIT)](https://georapbox.mit-license.org/@2019)
