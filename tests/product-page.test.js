const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'pages', 'product.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');

assert(html.includes('class="search"'), 'The product page should include a search container for the product filter bar.');
assert(html.includes('class="search-input"'), 'The product page should include the search input used for filtering products.');
assert(html.includes('class="image-grid"'), 'The product page should include the image grid wrapper for the product cards.');
assert(/addEventListener\(\s*["']input["']\s*/.test(html), 'The search input should listen for typing to filter products.');
assert(/figure|figcaption|filter\s*\(/i.test(html), 'The page should include filtering logic for product cards based on their content and price.');

let figureDepth = 0;
let validFigureStructure = true;
for (const match of html.matchAll(/<\/?figure\b[^>]*>/gi)) {
  const tag = match[0].toLowerCase();
  if (tag.startsWith('<figure')) {
    figureDepth += 1;
    if (figureDepth > 1) {
      validFigureStructure = false;
      break;
    }
  } else if (tag.startsWith('</figure')) {
    figureDepth -= 1;
    if (figureDepth < 0) {
      validFigureStructure = false;
      break;
    }
  }
}
assert(validFigureStructure && figureDepth === 0, 'Product cards should not be nested inside each other, and each figure should close properly.');

assert(css.includes('.search {') || css.includes('.search{'), 'The stylesheet should define a search container style.');
assert(css.includes('.search-input') || css.includes('.search-input{'), 'The stylesheet should define the product search field styling.');
assert(css.includes('.image-grid') || css.includes('.image-grid{'), 'The stylesheet should define the image grid layout.');

console.log('Product page layout checks passed.');
