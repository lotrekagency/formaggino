"use strict";var e={name:"formaggino",version:"1.0.1",description:"A small vanilla js library for validate your forms",main:"dist/Formaggino.cjs.min.js",module:"dist/Formaggino.esm.min.js",unpkg:"dist/Formaggino.umd.min.js",files:["src/","dist/"],scripts:{serve:"http-server ./docs",build:"rollup -c --environment BUILD:production",dev:"rollup -c -w","docs:build":"rollup -c docs/rollup.config.js --environment BUILD:production","docs:dev":"concurrently 'rollup -c docs/rollup.config.js -w' 'yarn serve'",lint:"eslint src/**/*.js",test:"cypress open",prepare:"npm-run-all lint build"},repository:{type:"git",url:"git+https://github.com/lotrekagency/formaggino.git"},keywords:[],author:"Pierdomenico Reitano <pierdomenicoreitano@gmail.com>",license:"MIT",bugs:{url:"https://github.com/lotrekagency/formaggino/issues"},homepage:"https://lotrekagency.github.io/formaggino/",devDependencies:{"@babel/core":"~7.12.10","@babel/plugin-proposal-object-rest-spread":"~7.12.1","@babel/preset-env":"~7.12.11","@babel/register":"~7.12.10","@jackfranklin/rollup-plugin-markdown":"^0.3.0","@rollup/plugin-babel":"~5.2.2","@rollup/plugin-commonjs":"~17.0.0","@rollup/plugin-json":"^4.1.0","@rollup/plugin-node-resolve":"~11.1.0",concurrently:"^7.1.0","cross-env":"~7.0.3",cypress:"^9.5.3",eslint:"~7.18.0","http-server":"^14.1.0",mustache:"^4.2.0","node-sass":"^7.0.1","npm-run-all":"~4.1.5",rollup:"~2.38.0","rollup-plugin-scss":"^3.0.0","rollup-plugin-terser":"~7.0.2"},dependencies:{},browserslist:"> 0.5%, last 2 versions, Firefox ESR, not dead"},t=Object.prototype.toString,n=Array.isArray||function(e){return"[object Array]"===t.call(e)};function r(e){return"function"==typeof e}function o(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function i(e,t){return null!=e&&"object"==typeof e&&t in e}var s=RegExp.prototype.test;var a=/\S/;function l(e){return!function(e,t){return s.call(e,t)}(a,e)}var c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};var d=/\s*/,u=/\s+/,p=/\s*=/,f=/\s*\}/,h=/#|\^|\/|>|\{|&|=|!/;function g(e){this.string=e,this.tail=e,this.pos=0}function m(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function v(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}g.prototype.eos=function(){return""===this.tail},g.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},g.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},m.prototype.push=function(e){return new m(e,this)},m.prototype.lookup=function(e){var t,n,o,s=this.cache;if(s.hasOwnProperty(e))t=s[e];else{for(var a,l,c,d=this,u=!1;d;){if(e.indexOf(".")>0)for(a=d.view,l=e.split("."),c=0;null!=a&&c<l.length;)c===l.length-1&&(u=i(a,l[c])||(n=a,o=l[c],null!=n&&"object"!=typeof n&&n.hasOwnProperty&&n.hasOwnProperty(o))),a=a[l[c++]];else a=d.view[e],u=i(d.view,e);if(u){t=a;break}d=d.parent}s[e]=t}return r(t)&&(t=t.call(this.view)),t},v.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},v.prototype.parse=function(e,t){var r=this.templateCache,i=e+":"+(t||y.tags).join(":"),s=void 0!==r,a=s?r.get(i):void 0;return null==a&&(a=function(e,t){if(!e)return[];var r,i,s,a=!1,c=[],m=[],v=[],b=!1,w=!1,j="",k=0;function E(){if(b&&!w)for(;v.length;)delete m[v.pop()];else v=[];b=!1,w=!1}function x(e){if("string"==typeof e&&(e=e.split(u,2)),!n(e)||2!==e.length)throw new Error("Invalid tags: "+e);r=new RegExp(o(e[0])+"\\s*"),i=new RegExp("\\s*"+o(e[1])),s=new RegExp("\\s*"+o("}"+e[1]))}x(t||y.tags);for(var T,C,O,S,P,L,I=new g(e);!I.eos();){if(T=I.pos,O=I.scanUntil(r))for(var D=0,R=O.length;D<R;++D)l(S=O.charAt(D))?(v.push(m.length),j+=S):(w=!0,a=!0,j+=" "),m.push(["text",S,T,T+1]),T+=1,"\n"===S&&(E(),j="",k=0,a=!1);if(!I.scan(r))break;if(b=!0,C=I.scan(h)||"name",I.scan(d),"="===C?(O=I.scanUntil(p),I.scan(p),I.scanUntil(i)):"{"===C?(O=I.scanUntil(s),I.scan(f),I.scanUntil(i),C="&"):O=I.scanUntil(i),!I.scan(i))throw new Error("Unclosed tag at "+I.pos);if(P=">"==C?[C,O,T,I.pos,j,k,a]:[C,O,T,I.pos],k++,m.push(P),"#"===C||"^"===C)c.push(P);else if("/"===C){if(!(L=c.pop()))throw new Error('Unopened section "'+O+'" at '+T);if(L[1]!==O)throw new Error('Unclosed section "'+L[1]+'" at '+T)}else"name"===C||"{"===C||"&"===C?w=!0:"="===C&&x(O)}if(E(),L=c.pop())throw new Error('Unclosed section "'+L[1]+'" at '+I.pos);return function(e){for(var t,n=[],r=n,o=[],i=0,s=e.length;i<s;++i)switch((t=e[i])[0]){case"#":case"^":r.push(t),o.push(t),r=t[4]=[];break;case"/":o.pop()[5]=t[2],r=o.length>0?o[o.length-1][4]:n;break;default:r.push(t)}return n}(function(e){for(var t,n,r=[],o=0,i=e.length;o<i;++o)(t=e[o])&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}(m))}(e,t),s&&r.set(i,a)),a},v.prototype.render=function(e,t,n,r){var o=this.getConfigTags(r),i=this.parse(e,o),s=t instanceof m?t:new m(t,void 0);return this.renderTokens(i,s,n,e,r)},v.prototype.renderTokens=function(e,t,n,r,o){for(var i,s,a,l="",c=0,d=e.length;c<d;++c)a=void 0,"#"===(s=(i=e[c])[0])?a=this.renderSection(i,t,n,r,o):"^"===s?a=this.renderInverted(i,t,n,r,o):">"===s?a=this.renderPartial(i,t,n,o):"&"===s?a=this.unescapedValue(i,t):"name"===s?a=this.escapedValue(i,t,o):"text"===s&&(a=this.rawValue(i)),void 0!==a&&(l+=a);return l},v.prototype.renderSection=function(e,t,o,i,s){var a=this,l="",c=t.lookup(e[1]);if(c){if(n(c))for(var d=0,u=c.length;d<u;++d)l+=this.renderTokens(e[4],t.push(c[d]),o,i,s);else if("object"==typeof c||"string"==typeof c||"number"==typeof c)l+=this.renderTokens(e[4],t.push(c),o,i,s);else if(r(c)){if("string"!=typeof i)throw new Error("Cannot use higher-order sections without the original template");null!=(c=c.call(t.view,i.slice(e[3],e[5]),(function(e){return a.render(e,t,o,s)})))&&(l+=c)}else l+=this.renderTokens(e[4],t,o,i,s);return l}},v.prototype.renderInverted=function(e,t,r,o,i){var s=t.lookup(e[1]);if(!s||n(s)&&0===s.length)return this.renderTokens(e[4],t,r,o,i)},v.prototype.indentPartial=function(e,t,n){for(var r=t.replace(/[^ \t]/g,""),o=e.split("\n"),i=0;i<o.length;i++)o[i].length&&(i>0||!n)&&(o[i]=r+o[i]);return o.join("\n")},v.prototype.renderPartial=function(e,t,n,o){if(n){var i=this.getConfigTags(o),s=r(n)?n(e[1]):n[e[1]];if(null!=s){var a=e[6],l=e[5],c=e[4],d=s;0==l&&c&&(d=this.indentPartial(s,c,a));var u=this.parse(d,i);return this.renderTokens(u,t,n,d,o)}}},v.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(null!=n)return n},v.prototype.escapedValue=function(e,t,n){var r=this.getConfigEscape(n)||y.escape,o=t.lookup(e[1]);if(null!=o)return"number"==typeof o&&r===y.escape?String(o):r(o)},v.prototype.rawValue=function(e){return e[1]},v.prototype.getConfigTags=function(e){return n(e)?e:e&&"object"==typeof e?e.tags:void 0},v.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!n(e)?e.escape:void 0};var y={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){b.templateCache=e},get templateCache(){return b.templateCache}},b=new v;y.clearCache=function(){return b.clearCache()},y.parse=function(e,t){return b.parse(e,t)},y.render=function(e,t,r,o){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+((n(i=e)?"array":typeof i)+'" was given as the first argument for mustache#render(template, view, partials)'));var i;return b.render(e,t,r,o)},y.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return c[e]}))},y.Scanner=g,y.Context=m,y.Writer=v;var w={pkg:e,readme:{html:'<p><a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="GitHub" /></a></p>\n<h1 id="🧀-formaggino">🧀 Formaggino</h1>\n<p>A small vanilla js library for validate your forms without external dependencies</p>\n<h2 id="getting-started">Getting started</h2>\n<p>Install the package</p>\n<p><code>npm install formaggino</code></p>\n<p>Initialize the library</p>\n<pre><code class="js language-js">import Formaggino from "formaggino";\nconst formaggino = new Formaggino();</code></pre>\n<p>Create a form remember to include <code>method</code>, <code>action</code> and <code>novalidate</code> on your form</p>\n<pre><code class="html language-html">&lt;form\n  method="POST"\n  id="form"\n  action="https://your-action.io/sendform"\n  novalidate\n&gt;\n  &lt;input name="name" type="text" required /&gt;\n  &lt;span class="form-error"&gt;Your error text&lt;/span&gt;\n  ...\n  &lt;div class="form-report-error"&gt;error&lt;/div&gt;\n  &lt;div class="form-report-success"&gt;success&lt;/div&gt;\n  &lt;span class="form-loading"&gt; loading... &lt;/span&gt;\n  &lt;button type="submit"&gt;submit&lt;/button&gt;\n&lt;/form&gt;</code></pre>\n<p>call the <code>submitEvent</code> method</p>\n<pre><code class="js language-js">formaggino.submitEvent("#form");</code></pre>\n<p>or use the options</p>\n<pre><code class="js language-js">formaggino.submitEvent("#form"{\n  mode: \'json\',\n  loadingClass: \'your-loading__custom_class\',\n  closingTimint: 8000\n  ...\n});</code></pre>\n<p>don\'t forget to set you css</p>\n<pre><code class="css language-css">.form-error,\n.invalid-feedback,\n.form-loading,\n.form-report-error,\n.form-report-success {\n  display: none;\n}\n\n.active {\n  display: block;\n}</code></pre>\n<h1 id="options">Options</h1>\n<table>\n<thead>\n<tr>\n<th id="option" style="text-align:left;">Option</th>\n<th id="type" style="text-align:center;">Type</th>\n<th id="default" style="text-align:left;">Default</th>\n<th id="description">Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="text-align:left;">mode</td>\n<td style="text-align:center;">string</td>\n<td style="text-align:left;"><code>form-data</code></td>\n<td>the type of data to send to fetch request, you can also use <code>json</code></td>\n</tr>\n<tr>\n<td style="text-align:left;">loadingClass</td>\n<td style="text-align:center;">string</td>\n<td style="text-align:left;"><code>form-loading</code></td>\n<td>the css class for loading element</td>\n</tr>\n<tr>\n<td style="text-align:left;">errorClass</td>\n<td style="text-align:center;">string</td>\n<td style="text-align:left;"><code>form-error</code></td>\n<td>the css class for each single field of form</td>\n</tr>\n<tr>\n<td style="text-align:left;">formSuccess</td>\n<td style="text-align:center;">string</td>\n<td style="text-align:left;"><code>form-report-success</code></td>\n<td>the css class for form success element</td>\n</tr>\n<tr>\n<td style="text-align:left;">formError</td>\n<td style="text-align:center;">string</td>\n<td style="text-align:left;"><code>form-report-error</code></td>\n<td>the css class for form error element</td>\n</tr>\n<tr>\n<td style="text-align:left;">closingTiming</td>\n<td style="text-align:center;">integer</td>\n<td style="text-align:left;"><code>3000</code></td>\n<td>timeout for form report duration</td>\n</tr>\n<tr>\n<td style="text-align:left;">listener</td>\n<td style="text-align:center;">string</td>\n<td style="text-align:left;"><code>change</code></td>\n<td>the event listener for each single field in form</td>\n</tr>\n</tbody>\n</table>\n<h2 id="contributing">Contributing</h2>\n<h3 id="build-for-development">Build for development</h3>\n<ul>\n<li>Having all the dependencies installed run <code>npm run dev</code>. This command will generate <code>UMD</code> (unminified), <code>CommonJS</code> and <code>ESM</code> modules under the <code>dist</code> folder. It will also watch for changes in source files to recompile.</li>\n</ul>\n<h3 id="build-for-production">Build for production</h3>\n<ul>\n<li>Having all the dependencies installed run <code>npm run build</code>. This command will generate the same modules as above and one extra minified <code>UMD</code> bundle for usage in browser.</li>\n</ul>\n<h2 id="scripts">Scripts</h2>\n<ul>\n<li><code>npm run serve</code> - serve the project with http-server.</li>\n<li><code>npm run build</code> - Produces production version of library modules under <code>dist</code> folder.</li>\n<li><code>npm run dev</code> - Produces a development version of library and runs a watcher to watch for changes.</li>\n<li><code>npm run docs:build</code> - Produces production version of library docs under <code>docs</code> folder.</li>\n<li><code>npm run docs:dev</code> - Produces a development version of library docs under <code>docs</code> folder.</li>\n<li><code>npm run test</code> - Runs the tests.</li>\n<li><code>npm run lint</code> - Lints the source code with ESlint.</li>\n<li><code>npm run prepare</code> - Run both BEFORE the package is packed and published, on local npm install without any arguments, and when installing git dependencies.</li>\n</ul>\n<h2 id="license">License</h2>\n<p><a href="https://github.com/lotrekagency/formaggino/blob/3415e9878e9c90ddc39daad87d71820fca65d925/LICENSE">The MIT License (MIT)</a></p>',metadata:{},filename:"README.md",path:"/Users/pierdomenicoreitano/Documents/Projects/formaggino/README.md"}};function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function E(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function T(e,t,n){return t&&x(e.prototype,t),n&&x(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}console.log(w);var O=function(){function e(){E(this,e)}return T(e,[{key:"setupRequest",value:function(e){var t=e.method,n=e.body,r=e.headers;r=k({},r),n instanceof FormData||(r["Content-Type"]="application/json",n=JSON.stringify(n));var o=new Headers;return Object.keys(r).forEach((function(e){return o.append(e,r[e])})),{method:t||"POST",headers:o,body:n}}},{key:"get",value:function(e,t){var n=this.setupRequest({method:"GET"}),r=new URLSearchParams(t);return r?fetch(e+r,n):fetch(e,n)}},{key:"post",value:function(e,t){var n=this.setupRequest({method:"POST",body:t});return fetch(e,n)}}]),e}();function S(e,t){var n;return function(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];var s=function(){clearTimeout(n),e.apply(void 0,o)};clearTimeout(n),n=setTimeout(s,t)}}var P,L,I=function(){function e(){E(this,e)}return T(e,[{key:"checkInputError",value:function(e,t){this.errorFinder(e.target,t,e.target.checkValidity())}},{key:"errorFinder",value:function(e,t,n){for(;e;)e.classList.contains(t)&&!n?e.classList.add("active"):e.classList.remove("active"),e=e.nextElementSibling}},{key:"triggerReport",value:function(e,t){document.querySelector(".".concat(e)).classList.add("active"),setTimeout((function(){document.querySelector(".".concat(e)).classList.remove("active")}),t)}},{key:"validate",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.errorClass,o=n.listener;e.preventDefault();var i=e.target,s=o||"change",a=r||"form-error",l=i.querySelectorAll(":invalid"),c=i.querySelectorAll(".active");return c.forEach((function(e){return e.classList.remove("active")})),i.addEventListener(s,(function(e){S(t.checkInputError(e,r),400)})),!!i.checkValidity()||(l.forEach((function(e){t.errorFinder(e,a,!1)})),!1)}}]),e}(),D=function(){function e(){E(this,e),this.request=new O,this.validation=new I}return T(e,[{key:"checkError",value:function(e){if(e.status>=200&&e.status<=299)return e.json();throw Error(e.statusText)}},{key:"submit",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.mode,o=n.loadingClass,i=n.errorClass,s=n.formSuccess,a=n.formError,l=n.closingTiming,c=n.listener,d=e.target,u=d.action,p=d.method,f=r||"form-data",h=o||"form-loading",g=a||"form-report-error",m=s||"form-report-success",v=l||3e3,y=document.querySelector(".".concat(h)),b=new FormData(d),w=this.validation.validate(e,{errorClass:i,listener:c});"json"===f&&(b=Object.fromEntries(b.entries())),w&&"post"===p&&(y.classList.add("active"),this.request.post(u,b).then(this.checkError).then((function(){t.validation.triggerReport(m,v),d.reset()})).catch((function(){return t.validation.triggerReport(g,v)})).finally((function(){y.classList.remove("active")})))}},{key:"submitEvent",value:function(e,t){var n=this;t=k({},t),document.querySelector(e).addEventListener("submit",(function(e){n.submit(e,t)}))}}]),e}(),R=new D;P=document.getElementById("template").innerHTML,L=y.render(P,{content:w}),document.getElementById("template").innerHTML=L,R.submitEvent("#form",{mode:"json"});
