const fs = require('fs');
const path = require('path');
const csso = require('csso');
const crypto = require('crypto');
const pkg = require('./package.json');

const publicPath = path.resolve(__dirname, 'public');

let html = fs.readFileSync(path.resolve(__dirname, `src/index.html`));

html = html.toString().replace(/{{ version }}/g, pkg.version);

let css = fs.readFileSync(path.join(publicPath, `assets/app.css`));
css = csso.minify(css.toString()).css;
const cssHash = crypto
  .createHash('sha256')
  .update(css)
  .digest('base64');

html = html.toString().replace(/{{ css }}/g, css);
html = html.toString().replace(/{{ css-hash }}/g, cssHash);

let js = fs.readFileSync(path.join(publicPath, `assets/app.min.js`));
const jsHash = crypto
  .createHash('sha256')
  .update(js)
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

console.log(`\n🚀 Build complete!`);
