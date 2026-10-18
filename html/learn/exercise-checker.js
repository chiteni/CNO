/* Checks a student's HTML against an exercise's requirements.
   Accepts any valid solution: it looks for required tags/attributes/content,
   not for an exact match against one "correct" string. */
(() => {
  function parseDoc(source) {
    return new DOMParser().parseFromString(source, 'text/html');
  }

  function textOf(el) {
    return (el && el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  /* ---- Check builders: each returns {test(doc, source), message} ---- */

  function hasTag(tag, opts = {}) {
    const min = opts.min || 1;
    const label = opts.label || `<${tag}>`;
    return {
      test: doc => doc.querySelectorAll(tag).length >= min,
      message: min > 1
        ? `Your page needs at least ${min} ${label} elements.`
        : `Your page is missing ${/^[aeiou]/i.test(label) ? 'an' : 'a'} ${label}.`
    };
  }

  function hasNonEmptyText(tag, opts = {}) {
    const min = opts.min || 1;
    const label = opts.label || `<${tag}>`;
    return {
      test: doc => Array.from(doc.querySelectorAll(tag)).filter(el => textOf(el).length > 0).length >= min,
      message: `Your ${label} needs some text inside it.`
    };
  }

  function hasAttr(selector, attr, opts = {}) {
    const label = opts.label || selector;
    return {
      test: doc => {
        const el = doc.querySelector(selector);
        return !!(el && el.getAttribute(attr) && el.getAttribute(attr).trim());
      },
      message: `Your ${label} is missing its ${attr} attribute.`
    };
  }

  function minCount(selector, min, message) {
    return { test: doc => doc.querySelectorAll(selector).length >= min, message };
  }

  function custom(test, message) {
    return { test, message };
  }

  /* ---- Runner ---- */

  function run(source, checks) {
    const syntax = window.checkHTML(source);
    if (syntax.length) {
      return {
        passed: false,
        messages: syntax.slice(0, 3).map(issue => issue.message)
      };
    }
    const doc = parseDoc(source);
    const messages = [];
    for (const check of checks) {
      let ok = false;
      try { ok = !!check.test(doc, source); } catch (_) { ok = false; }
      if (!ok) messages.push(check.message);
    }
    return { passed: messages.length === 0, messages };
  }

  window.ExerciseChecker = { parseDoc, run, hasTag, hasNonEmptyText, hasAttr, minCount, custom };
})();
