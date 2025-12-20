// load the custom theme CSS file because variable must be compiled
const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = `/open-bamz-bootstrap/theme-bootstrap5.css`;
document.head.appendChild(link);

import bootstrap5 from "./bootstrap-lib.mjs" ;

// @ts-ignore
window.bootstrap5 = bootstrap5;

// @ts-ignore
window.bootstrap = bootstrap5.bootstrap
