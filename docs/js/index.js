import "../styles/styles.scss";
import { getDocs } from "./docs";
import Formaggino from "../dist/Formaggino.esm.js";
import pkg from "../../package.json";
import readme from "../../README.md";
import mustache from "mustache";

const formaggino = new Formaggino();

formaggino.submitEvent("#form", { mode: "json" });

console.log(getDocs(""));

const contents = {
    pkg: pkg, 
    readme:readme
}

console.log(contents)

function render() {
  var template = document.getElementById("template").innerHTML;
  var rendered = mustache.render(template, { content: contents});
  document.getElementById("template").innerHTML = rendered;
}

render();
