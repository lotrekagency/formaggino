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

or use the options

```js
formaggino.submitEvent("#form"{
  mode: 'json',
  loadingClass: 'your-loading__custom_class',
  closingTimint: 8000
  ...
});
```

don't forget to set you css

```css
.form-error,
.invalid-feedback,
.form-loading,
.form-report-error,
.form-report-success {
  display: none;
}

.active {
  display: block;
}
```

# Options

| Option        |  Type   | Default               | Description                                                        |
| :------------ | :-----: | :-------------------- | ------------------------------------------------------------------ |
| mode          | string  | `form-data`           | the type of data to send to fetch request, you can also use `json` |
| loadingClass  | string  | `form-loading`        | the css class for loading element                                  |
| errorClass    | string  | `form-error`          | the css class for each single field of form                        |
| formSuccess   | string  | `form-report-success` | the css class for form success element                             |
| formError     | string  | `form-report-error`   | the css class for form error element                               |
| closingTiming | integer | `3000`                | timeout for form report duration                                   |
| listener      | string  | `change`              | the event listener for each single field in form                   |

## Contributing

### Build for development

- Having all the dependencies installed run `npm run dev`. This command will generate `UMD` (unminified), `CommonJS` and `ESM` modules under the `dist` folder. It will also watch for changes in source files to recompile.

### Build for production

- Having all the dependencies installed run `npm run build`. This command will generate the same modules as above and one extra minified `UMD` bundle for usage in browser.

## Scripts
- `npm run serve` - serve the project with http-server.
- `npm run build` - Produces production version of library modules under `dist` folder.
- `npm run dev` - Produces a development version of library and runs a watcher to watch for changes.
- `npm run docs:build` - Produces production version of library docs under `docs` folder.
- `npm run docs:dev` - Produces a development version of library docs under `docs` folder.
- `npm run test` - Runs the tests.
- `npm run lint` - Lints the source code with ESlint.
- `npm run prepare` - Run both BEFORE the package is packed and published, on local npm install without any arguments, and when installing git dependencies.


## License

[The MIT License (MIT)](https://github.com/lotrekagency/formaggino/blob/3415e9878e9c90ddc39daad87d71820fca65d925/LICENSE)
