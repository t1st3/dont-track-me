const fs = require('fs');
const beautify = require('js-beautify').js_beautify;

const packageJson = JSON.parse(fs.readFileSync('./package.json'));
const manifestJson = JSON.parse(fs.readFileSync('./src/manifest.json'));

const items = [
	'name',
	'version',
	'description'
];

for (let i = 0; i < items.length; i++) {
	manifestJson[items[i]] = packageJson[items[i]];
}

fs.writeFileSync('./src/manifest.json', beautify(JSON.stringify(manifestJson), { indent_size: 2 }) + '\n');
