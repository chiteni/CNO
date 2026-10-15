const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'html-checker.js'), 'utf8'), context);
const check = context.window.checkHTML;
for (const source of [
  '<h1>Hello</h1><p>Welcome</p>',
  '<!doctype html><html><head><title>My page</title></head><body><img src="a.jpg"><br><input disabled></body></html>',
  '<ul><li>One<li>Two</ul>', '<p>One<p>Two',
  '<table><tbody><tr><td>One<td>Two<tr><td>Three</table>',
  '<select><option>One<option>Two</select>',
  '<!-- <wrong> --><div title="a > b">OK</div>',
  '<script>if (a < b) console.log("<fake>");</script>',
  '<style>div::before {content: "<fake>"}</style>',
  '<textarea><fake></textarea>', '<my-card></my-card>',
  '<svg><path d="M0 0" /></svg>', '<DIV>Hello</DIV>', ''
]) assert.equal(check(source).length, 0, source);
for (const [source, message] of [
  ['<h7>Hello</h7>', 'Unknown HTML tag'],
  ['<div>Hi', 'Missing closing tag </div>'],
  ['<div><span>Hi</div>', 'Close <span>'],
  ['<h1>Hello</h2>', 'There is no opening <h2>'],
  ['<p>Hello</p></br>', 'does not need a closing tag'],
  ['<div', 'Add >'],
  ['<img src="hello>', 'quote is not closed'],
  ['<!-- hi', 'comment is not finished'],
  ['<div/>', 'cannot close itself'],
  ['<div></div class="x">', 'must not contain attributes'],
  ['< h1>Hi', 'Invalid tag syntax']
]) assert(check(source).some(issue => issue.message.includes(message)), source);
const issue = check('<p>OK</p>\n  <wrong></wrong>')[0];
assert.equal(issue.line, 2);
assert.equal(issue.column, 3);

// Exercise the page's actual Run, input, location-link, and Clear handlers.
const nodes = {};
function element() {
  return { value: '', hidden: true, children: [], style: {},
    addEventListener(type, handler) { this[type] = handler; },
    replaceChildren() { this.children = []; },
    append(...children) { this.children.push(...children); },
    appendChild(child) { this.children.push(child); },
    focus() {}, setSelectionRange(start) { this.selectionStart = start; }
  };
}
context.document = {
  getElementById(id) { return nodes[id] ||= element(); },
  createElement: element
};
context.getComputedStyle = () => ({lineHeight: '25px'});
const previewLinks = [];
context.DOMParser = class {
  parseFromString(source) {
    return {
      querySelectorAll: () => previewLinks,
      documentElement: {outerHTML: source}
    };
  }
};
const page = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
new vm.Script(page.match(/<script>\s*([\s\S]*?)<\/script>/)[1]).runInNewContext(context);
nodes.code.value = '<h7>Hello</h7>';
nodes.runCode.click();
assert.equal(nodes.htmlChecks.hidden, false);
assert.match(nodes.checkSummary.textContent, /issues found/);
assert.equal(nodes.previewFrame.srcdoc, '<!doctype html>\n' + nodes.code.value);
nodes.checkOutput.children[0].children[0].click();
assert.equal(nodes.code.selectionStart, 0);
nodes.code.value = '<h1>Hello</h1>';
nodes.code.input();
assert.equal(nodes.htmlChecks.hidden, true);
nodes.runCode.click();
assert.equal(nodes.checkOutput.children.length, 0);
assert.match(nodes.checkSummary.textContent, /No tag errors/);
for (const href of ['www.cnn.com', 'https://example.com', '//example.com', '#section', 'lesson.html']) {
  const attributes = {href};
  const rel = new Set();
  previewLinks.push({
    getAttribute: name => attributes[name],
    setAttribute: (name, value) => { attributes[name] = value; },
    relList: {add: (...values) => values.forEach(value => rel.add(value))},
    attributes, rel
  });
}
nodes.runCode.click();
assert.equal(previewLinks[0].attributes.href, 'https://www.cnn.com');
for (const link of previewLinks.slice(0, 3)) {
  assert.equal(link.attributes.target, '_blank');
  assert(link.rel.has('noopener') && link.rel.has('noreferrer'));
}
for (const link of previewLinks.slice(3)) assert.equal(link.attributes.target, undefined);
assert.match(page, /sandbox="allow-popups allow-popups-to-escape-sandbox"/);
nodes.clearPreview.click();
assert.equal(nodes.htmlChecks.hidden, true);
assert.equal(nodes.previewFrame.srcdoc, '');
console.log('Passed: valid HTML, common tag errors, line numbers, Run feedback, correction, location links, and Clear.');
