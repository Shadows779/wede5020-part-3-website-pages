const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'pages', 'enquiry.html'), 'utf8');
const script = fs.readFileSync(path.join(__dirname, '..', 'js', 'index.js'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');

assert(html.includes('id="enquiry-form"'), 'The enquiry form must have the id expected by the JS script.');
assert(html.includes('name="services"'), 'The select element must use the name expected by the JS validation.');
assert(html.includes('src="../js/index.js"'), 'The page must load the JS file from the correct path.');
assert(script.includes('info@apexnetcafe.co.za'), 'The enquiry form must send emails to info@apexnetcafe.co.za.');
assert(script.includes('Apex Cafe Enquiry: ${product}') || script.includes('Apex Cafe Enquiry: ${selectedService}'), 'The enquiry mailto subject should reflect the user-selected service.');
assert(css.includes(':focus-visible'), 'The stylesheet should define a visible keyboard focus state for interactive elements.');
assert(css.includes('Merriweather') && css.includes('Montserrat'), 'The stylesheet should use the consistent branded typography stack across pages.');
assert(css.includes('@media (max-width: 768px)') && css.includes('grid-template-columns: 1fr'), 'The responsive layout should stack image grids and forms on smaller screens.');

console.log('Enquiry page contract checks passed.');
