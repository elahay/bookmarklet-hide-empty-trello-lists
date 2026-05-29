const fs = require('node:fs');

const BOOKMARKLET_PATH= 'Hide-Empty-Trello-Lists-Bookmarklet.js';
const DOC_PATH= 'docs/index.html';

function cleanCode(code) {
  return code.trim().
  replaceAll(/\/\*.*\*\//gm, '').
  replaceAll(/\/\/.*$/gm, '').
  replaceAll('\n', '').replaceAll(/\s+/gm, ' ');
}

const code = fs.readFileSync(BOOKMARKLET_PATH, 'utf8');
const cleanedCode = cleanCode(code);
const codeWithWrapper = `(function(){${cleanedCode}}();`;
const jsOutput = `javascript:${encodeURIComponent(cleanedCode)}`;
const html = `<a href="${jsOutput}">Hide Empty Trello Lists</a>`

const htmlFile = fs.readFileSync(DOC_PATH, 'utf8');
const output = htmlFile.replace(/<a .+>Hide Empty Trello Lists<\/a>/gm, html);

fs.writeFileSync(DOC_PATH, output);
