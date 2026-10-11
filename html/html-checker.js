/* Basic source checks for the teaching playground, not a full HTML conformance validator. */
(() => {
  const known = new Set(('a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr svg math').split(' '));
  const voidTags = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
  const optional = new Set('html head body li dt dd p rt rp optgroup option colgroup thead tbody tfoot tr td th'.split(' '));
  const blocks = new Set('address article aside blockquote details div dl fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre search section table ul'.split(' '));
  const implicit = {
    li: ['li'], dt: ['dt', 'dd'], dd: ['dt', 'dd'],
    rt: ['rt', 'rp'], rp: ['rt', 'rp'], option: ['option'],
    optgroup: ['option', 'optgroup'], tr: ['td', 'th', 'tr'],
    td: ['td', 'th'], th: ['td', 'th'],
    thead: ['td', 'th', 'tr', 'thead', 'tbody'],
    tbody: ['td', 'th', 'tr', 'thead', 'tbody'],
    tfoot: ['td', 'th', 'tr', 'thead', 'tbody'], body: ['head']
  };

  window.checkHTML = source => {
    const issues = [];
    const stack = [];
    const lineStarts = [0];
    for (let n = 0; n < source.length; n++) if (source[n] === '\n') lineStarts.push(n + 1);
    function report(offset, message) {
      let low = 0, high = lineStarts.length;
      while (low + 1 < high) {
        const middle = (low + high) >> 1;
        if (lineStarts[middle] <= offset) low = middle;
        else high = middle;
      }
      issues.push({line: low + 1, column: offset - lineStarts[low] + 1, offset, message});
    }
    let cursor = 0;
    while (cursor < source.length) {
      const start = source.indexOf('<', cursor);
      if (start < 0) break;
      if (source.startsWith('<!--', start)) {
        const end = source.indexOf('-->', start + 4);
        if (end < 0) { report(start, 'This comment is not finished. Add -->.'); break; }
        cursor = end + 3;
        continue;
      }
      // Scan to the closing angle bracket without treating > inside quotes as a delimiter.
      let end = start + 1, quote = '';
      for (; end < source.length; end++) {
        const char = source[end];
        if (quote) { if (char === quote) quote = ''; }
        else if (char === '"' || char === "'") quote = char;
        else if (char === '>' || char === '<') break;
      }
      if (end === source.length || source[end] !== '>') {
        report(start, quote ? 'An attribute quote is not closed. Close the quote and add >.' : 'This tag is not finished. Add >.');
        cursor = end;
        continue;
      }
      cursor = end + 1;
      const token = source.slice(start + 1, end);
      if (/^!doctype\s+html\s*$/i.test(token)) continue;
      const match = /^(\/)?([a-zA-Z][\w:.-]*)([\s\S]*)$/.exec(token);
      if (!match || (match[3] && !/^[\s/]/.test(match[3]))) {
        report(start, 'Invalid tag syntax. Use <tag> or </tag>; write &lt; for a literal <.');
        continue;
      }
      const closing = !!match[1], tag = match[2].toLowerCase(), rest = match[3];
      const foreign = stack.some(entry => entry.tag === 'svg' || entry.tag === 'math');
      if (!foreign && !known.has(tag) && !tag.includes('-')) {
        report(start, `Unknown HTML tag <${tag}>. Check the spelling of the tag name.`);
      }
      if (closing) {
        if (rest.trim()) report(start, `Closing tag </${tag}> must not contain attributes or a slash after its name.`);
        if (voidTags.has(tag) && !foreign) {
          report(start, `<${tag}> does not need a closing tag. Remove </${tag}>.`);
          continue;
        }
        const index = stack.map(entry => entry.tag).lastIndexOf(tag);
        if (index < 0) report(start, `There is no opening <${tag}> for this </${tag}>. Check that the names match.`);
        else {
          for (let j = stack.length - 1; j > index; j--) {
            if (!optional.has(stack[j].tag)) report(start, `Close <${stack[j].tag}> with </${stack[j].tag}> before </${tag}>.`);
          }
          stack.length = index;
        }
        continue;
      }
      if (!foreign) {
        while (stack.length) {
          const top = stack[stack.length - 1].tag;
          if ((top === 'p' && blocks.has(tag)) || (implicit[tag] || []).includes(top)) stack.pop();
          else break;
        }
      }
      if (voidTags.has(tag) && !foreign) continue;
      if (/\/\s*$/.test(rest)) {
        if (foreign || tag === 'svg' || tag === 'math') continue;
        report(start, `<${tag}> cannot close itself with /> in HTML. Use <${tag}></${tag}>.`);
      }
      stack.push({tag, offset: start});
      // These elements contain text, not nested HTML tags.
      if (['script', 'style', 'textarea', 'title'].includes(tag) && !foreign) {
        const close = new RegExp('</' + tag + '\\s*>', 'ig');
        close.lastIndex = cursor;
        const found = close.exec(source);
        if (found) { cursor = close.lastIndex; stack.pop(); }
        else { cursor = source.length; }
      }
    }
    for (const entry of stack) {
      if (!optional.has(entry.tag)) report(entry.offset, `Missing closing tag </${entry.tag}> for this <${entry.tag}>.`);
    }
    return issues.sort((a, b) => a.offset - b.offset);
  };
})();
