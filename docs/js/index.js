import "../styles/styles.scss";
import { render } from "./docs";
import Formaggino from "../dist/Formaggino.esm.js";

const formaggino = new Formaggino();

render();

formaggino.submitEvent("#form", { mode: "json" });