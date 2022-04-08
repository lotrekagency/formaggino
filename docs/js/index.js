import "../styles/styles.scss";

import Formaggino from "../dist/Formaggino.esm.js";

const formaggino = new Formaggino();

formaggino.submitEvent("#form", { mode: "json" });
