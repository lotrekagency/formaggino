import pkg from "../../package.json";
import readme from "../../README.md";
import mustache from "mustache";

const contents = {
  pkg: pkg,
  readme: readme,
};

console.log(contents);

export function render() {
  var template = document.getElementById("template").innerHTML;
  var rendered = mustache.render(template, { content: contents });
  document.getElementById("template").innerHTML = rendered;
}
