[![GitHub](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE)

# 🧀 Formaggino

A small vanilla js library for validate your forms without external dependencies

## Getting started

Install the package

`npm install formaggino`

Initialize the library

```js
import Formaggino from "formaggino";
const formaggino = new Formaggino();
```

Create a form remember to include `method`, `action` and `novalidate` on your form

```html
<form
  method="POST"
  id="form"
  action="https://your-action.io/sendform"
  novalidate
>
  <input name="name" type="text" required />
  <span class="form-error">Your error text</span>
  ...
  <div class="form-report-error">error</div>
  <div class="form-report-success">success</div>
  <span class="form-loading"> loading... </span>
  <button type="submit">submit</button>
</form>
```

call the `submitEvent` method

```js
formaggino.submitEvent("#form");
```

# Options

| Option        |  Type   |        defaul         | description                                                        |
| :------------ | :-----: | :-------------------: | ------------------------------------------------------------------ | --- |
| mode          | string  |      `form-data`      | the type of data to send to fetch request, you can also use `json` |
| loadingClass  | string  |    `form-loading`     | the type of data to send to fetch request, you can also use `json` |
| errorClass    | string  |     `form-error`      | the type of data to send to fetch request, you can also use `json` |
| formSuccess   | string  | `form-report-success` | the type of data to send to fetch request, you can also use `json` |
| formError     | string  |  `form-report-error`  | the type of data to send to fetch request, you can also use `json` |
| closingTiming | integer |         `3000`          | the type of data to send to fetch request, you can also use `json` | ]   |
| listener      | string  |      `form-data`      | the type of data to send to fetch request, you can also use `json` |

## Contributing

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

## License

[The MIT License (MIT)](https://github.com/lotrekagency/formaggino/blob/3415e9878e9c90ddc39daad87d71820fca65d925/LICENSE)
