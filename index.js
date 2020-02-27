const fs = require('fs');
const path = require('path');
const csso = require('csso');
const terser = require("terser");
const crypto = require('crypto');
const pkg = require('./package.json');

const publicPath = path.resolve(__dirname, 'public');

let html = fs.readFileSync(path.resolve(__dirname, `src/index.html`));

html = html.toString().replace(/{{ version }}/g, pkg.version);

let css = fs.readFileSync(path.join(publicPath, `assets/app.css`));
css = csso.minify(css.toString()).css.trim();
const cssHash = crypto
  .createHash('sha256')
  .update(css, 'utf8')
  .digest('base64');

html = html.toString().replace(/{{ css }}/g, css);
html = html.toString().replace(/{{ css-hash }}/g, cssHash);

let js = fs.readFileSync(path.join(publicPath, `assets/app.js`));
// js = terser.minify(js.toString(), {}).code.trim();
const jsHash = crypto
  .createHash('sha256')
  .update(js, 'utf8')
  .digest('base64');


html = html.toString().replace(/{{ js }}/g, js);
html = html.toString().replace(/{{ js-hash }}/g, jsHash);

const tomlPath = path.resolve(__dirname, `netlify.toml`);
let toml = fs.readFileSync(tomlPath);
toml = toml
  .toString()
  .replace(/style-src 'sha256-[^']+?'/g, `style-src 'sha256-${cssHash}'`);
toml = toml
  .toString()
  .replace(/script-src 'sha256-[^']+?'/g, `script-src 'sha256-${jsHash}'`);
fs.writeFileSync(tomlPath, toml);

fs.writeFileSync(path.join(publicPath, `index.html`), html);

console.log(`css: ${cssHash}`);
console.log(`js: ${jsHash}`);

console.log(`\n🚀 Build complete!`);
