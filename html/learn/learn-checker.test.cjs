const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

/* A small, self-contained DOM-ish mock so exercise-checker.js's real logic (not a stand-in) can run
   under plain Node, with no new dependencies. Supports simple tag selectors, [attr] selectors, and
   two-part descendant selectors ('ul li') -- the only shapes used by this course's checks. */
function makeDoc(html) {
  const voidTags = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
  const tagRe = /<([a-zA-Z][\w-]*)((?:\s+[a-zA-Z-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*\/?>|<\/([a-zA-Z][\w-]*)>/g;
  const attrRe = /([a-zA-Z-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  const elements = [];
  const stack = [];
  let lastIndex = 0, m;
  function appendText(text) { if (stack.length) stack[stack.length - 1].text += text; }
  while ((m = tagRe.exec(html))) {
    appendText(html.slice(lastIndex, m.index));
    lastIndex = tagRe.lastIndex;
    if (m[3]) {
      const closeTag = m[3].toLowerCase();
      for (let i = stack.length - 1; i >= 0; i--) if (stack[i].tag === closeTag) { stack.length = i; break; }
      continue;
    }
    const tag = m[1].toLowerCase();
    const attrs = {};
    let am; attrRe.lastIndex = 0;
    while ((am = attrRe.exec(m[2] || ''))) attrs[am[1].toLowerCase()] = am[2] ?? am[3] ?? am[4] ?? '';
    const node = { tag, attrs, text: '', parent: stack[stack.length - 1] || null };
    elements.push(node);
    if (!voidTags.has(tag) && !/\/\s*>$/.test(m[0])) stack.push(node);
  }
  appendText(html.slice(lastIndex));

  function matchesPart(node, part) {
    const mm = /^([a-zA-Z][\w-]*)(?:\[([a-zA-Z-]+)\])?$/.exec(part);
    if (!mm) return false;
    if (node.tag !== mm[1]) return false;
    if (mm[2] && !(mm[2] in node.attrs)) return false;
    return true;
  }
  function isDescendantOf(node, ancestorTag) {
    let p = node.parent;
    while (p) { if (p.tag === ancestorTag) return true; p = p.parent; }
    return false;
  }
  function query(selector) {
    const parts = selector.trim().split(/\s+/);
    if (parts.length === 1) return elements.filter(n => matchesPart(n, parts[0]));
    const ancestorTag = /^[a-zA-Z][\w-]*/.exec(parts[0])[0];
    return elements.filter(n => matchesPart(n, parts[1]) && isDescendantOf(n, ancestorTag));
  }
  function wrap(node) {
    return { getAttribute: name => (name in node.attrs ? node.attrs[name] : null), get textContent() { return node.text; } };
  }
  return {
    querySelectorAll: sel => query(sel).map(wrap),
    querySelector: sel => { const r = query(sel); return r.length ? wrap(r[0]) : null; }
  };
}

const context = { window: {} };
context.DOMParser = class { parseFromString(html) { return makeDoc(html); } };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'html-checker.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'exercise-checker.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'lessons-data.js'), 'utf8'), context);
const Checker = context.window.ExerciseChecker;
const LESSONS = context.window.LESSONS;

/* ---- Checker primitives ---- */
assert.equal(Checker.hasTag('h1').test(makeDoc('<h1>Hi</h1>')), true);
assert.equal(Checker.hasTag('h1').test(makeDoc('<p>Hi</p>')), false);
assert.equal(Checker.hasTag('li', { min: 3 }).test(makeDoc('<ul><li>a</li><li>b</li></ul>')), false);
assert.equal(Checker.hasTag('li', { min: 3 }).test(makeDoc('<ul><li>a</li><li>b</li><li>c</li></ul>')), true);
assert.equal(Checker.hasNonEmptyText('p').test(makeDoc('<p></p>')), false);
assert.equal(Checker.hasNonEmptyText('p').test(makeDoc('<p>Hello</p>')), true);
assert.equal(Checker.hasAttr('a', 'href').test(makeDoc('<a>Go</a>')), false);
assert.equal(Checker.hasAttr('a', 'href').test(makeDoc('<a href="https://x.com">Go</a>')), true);
assert.equal(Checker.minCount('a[href]', 2, 'x').test(makeDoc('<a href="a">A</a><a>B</a>')), false);
assert.equal(Checker.minCount('a[href]', 2, 'x').test(makeDoc('<a href="a">A</a><a href="b">B</a>')), true);
assert.equal(Checker.minCount('ul li', 2, 'x').test(makeDoc('<ul><li>a</li></ul><ol><li>b</li></ol>')), false);
assert.equal(Checker.minCount('ul li', 2, 'x').test(makeDoc('<ul><li>a</li><li>b</li></ul>')), true);

/* ---- run(): syntax issues are caught before semantic checks, with a friendly message ---- */
let result = Checker.run('<h1>Hello', [Checker.hasTag('h1')]);
assert.equal(result.passed, false);
assert.match(result.messages[0], /Missing closing tag/);

/* ---- run(): accepts many different valid solutions, not one exact string ---- */
result = Checker.run('<h1>Totally different text</h1><p>Still passes.</p>', [Checker.hasTag('h1'), Checker.hasNonEmptyText('p')]);
assert.equal(result.passed, true);
assert.equal(result.messages.length, 0);

result = Checker.run('<h1>Hello</h1>', [Checker.hasTag('p'), Checker.hasAttr('a', 'href')]);
assert.equal(result.passed, false);
assert.equal(result.messages.length, 2);

/* ---- Every chapter's sample solution satisfies its own exercise's checks (curriculum self-consistency) ---- */
assert.equal(LESSONS.length, 10);
for (const lesson of LESSONS) {
  const outcome = Checker.run(lesson.independent.referenceCode, lesson.independent.checks);
  assert.equal(outcome.passed, true, `Chapter ${lesson.id} (${lesson.title}) reference solution should pass its own checks: ${outcome.messages.join('; ')}`);
}

console.log('Passed: checker primitives, syntax-first short-circuit, accepting varied valid solutions, and all 10 chapters’ sample solutions passing their own checks.');
