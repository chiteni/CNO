(() => {
  const qs = new URLSearchParams(location.search);
  const chapterId = parseInt(qs.get('ch'), 10) || 1;
  const lesson = (window.LESSONS || []).find(l => l.id === chapterId);
  const chrome = document.getElementById('chapterChrome');
  const body = document.getElementById('chapterBody');
  const footerNav = document.getElementById('chapterFooterNav');

  if (!lesson) { location.href = 'index.html'; return; }

  const STORAGE_KEY = 'cno-learn-progress';
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { chapters: {}, completed: [] }; }
    catch (_) { return { chapters: {}, completed: [] }; }
  }
  function saveProgress() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (_) {} }
  const progress = loadProgress();
  progress.chapters = progress.chapters || {};
  progress.completed = progress.completed || [];
  progress.chapters[chapterId] = progress.chapters[chapterId] || {};
  progress.lastChapter = chapterId;

  const STEPS = ['discover', 'watch', 'guided', 'practice', 'done'];
  const STEP_LABELS = { discover: 'Discover', watch: 'Watch', guided: 'Practice', practice: 'Challenge', done: 'Done' };
  let stepIndex = Math.max(0, STEPS.indexOf(progress.chapters[chapterId].step || 'discover'));
  let guidedLevel = progress.chapters[chapterId].guidedLevel || 1;

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function persist() {
    progress.chapters[chapterId].step = STEPS[stepIndex];
    progress.chapters[chapterId].guidedLevel = guidedLevel;
    saveProgress();
  }

  function markComplete() {
    if (!progress.completed.includes(chapterId)) progress.completed.push(chapterId);
    progress.chapters[chapterId].completed = true;
    saveProgress();
  }

  /* ---- Shared helpers ---- */

  function highlightCode(code, tags) {
    let out = escapeHtml(code);
    (tags || []).forEach(tag => {
      const re = new RegExp('(&lt;/?)(' + tag + ')\\b', 'g');
      out = out.replace(re, (m, bracket, name) => bracket + '<span class="tag-token" data-tag="' + tag + '">' + name + '</span>');
    });
    return out;
  }

  function renderPreview(iframe, source) {
    try {
      const page = new DOMParser().parseFromString(source, 'text/html');
      for (const link of page.querySelectorAll('a[href], area[href]')) {
        let href = link.getAttribute('href').trim();
        if (/^www\./i.test(href)) { href = 'https://' + href; link.setAttribute('href', href); }
        if (/^(https?:|\/\/)/i.test(href)) { link.setAttribute('target', '_blank'); link.relList.add('noopener', 'noreferrer'); }
      }
      iframe.srcdoc = '<!doctype html>\n' + page.documentElement.outerHTML;
    } catch (_) { iframe.srcdoc = ''; }
  }

  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function feedbackHtml(result) {
    if (result.passed) {
      return '<div class="feedback feedback-ok"><strong>Nice work!</strong> That matches what this exercise needs.</div>';
    }
    return '<div class="feedback feedback-error"><strong>Not quite yet:</strong><ul>' +
      result.messages.map(m => '<li>' + escapeHtml(m) + '</li>').join('') + '</ul></div>';
  }

  /* ---- Chrome: header + stepper ---- */

  function renderChrome() {
    const options = window.LESSONS.map(l => {
      const done = progress.completed.includes(l.id) ? ' ✓' : '';
      return '<option value="' + l.id + '"' + (l.id === chapterId ? ' selected' : '') + '>Chapter ' + l.id + ': ' + l.title + done + '</option>';
    }).join('');
    const dots = STEPS.map((s, i) => {
      const cls = i === stepIndex ? 'dot active' : (i < stepIndex ? 'dot done' : 'dot');
      return '<li class="' + cls + '" data-step="' + i + '">' + (i + 1) + '<span>' + STEP_LABELS[s] + '</span></li>';
    }).join('');
    chrome.innerHTML =
      '<div class="chapter-top">' +
        '<a class="back-link" href="index.html">&larr; Back to Chapters</a>' +
        '<label class="chapter-jump">Jump to <select id="chapterSelect">' + options + '</select></label>' +
      '</div>' +
      '<div class="chapter-head"><div class="eyebrow">Chapter ' + lesson.id + ' of 10</div>' +
        '<h1>' + escapeHtml(lesson.title) + '</h1><p>' + escapeHtml(lesson.goal) + '</p></div>' +
      '<ol class="stepper">' + dots + '</ol>';
    chrome.querySelector('#chapterSelect').addEventListener('change', e => { location.href = 'chapter.html?ch=' + e.target.value; });
    chrome.querySelectorAll('.stepper .dot').forEach(d => d.addEventListener('click', () => go(parseInt(d.dataset.step, 10))));
  }

  function renderFooterNav(opts) {
    opts = opts || {};
    footerNav.innerHTML =
      '<button class="button" id="prevStep"' + (stepIndex === 0 ? ' disabled' : '') + '>&larr; Back</button>' +
      '<button class="button reset-btn" id="resetExercise" type="button">Reset Exercise</button>' +
      '<button class="run" id="nextStep"' + (opts.nextDisabled ? ' disabled' : '') + ' type="button">' + (opts.nextLabel || 'Continue →') + '</button>';
    footerNav.querySelector('#prevStep').addEventListener('click', () => go(stepIndex - 1));
    footerNav.querySelector('#nextStep').addEventListener('click', () => { if (opts.onNext) opts.onNext(); else go(stepIndex + 1); });
    footerNav.querySelector('#resetExercise').addEventListener('click', () => render());
  }

  function go(index) {
    stepIndex = Math.max(0, Math.min(STEPS.length - 1, index));
    if (STEPS[stepIndex] === 'guided') guidedLevel = progress.chapters[chapterId].guidedLevel || 1;
    persist();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---- Step 1: Discover the Tag ---- */

  function renderDiscover() {
    const t = lesson.teach;
    const demoSource = t.void ? t.open : t.open + t.content + t.close;
    const partsHtml = t.void
      ? '<span class="part-open">' + escapeHtml(t.open) + '</span>'
      : '<span class="part-open">' + escapeHtml(t.open) + '</span><span class="part-content">' + escapeHtml(t.content) + '</span><span class="part-close">' + escapeHtml(t.close) + '</span>';
    body.innerHTML =
      '<section class="lesson-card">' +
        '<div class="card-heading">Discover the tag</div>' +
        '<p class="teach-sentence">' + t.sentence + '</p>' +
        '<div class="discover-grid">' +
          '<div class="code-block demo-code">' + partsHtml + '</div>' +
          '<iframe class="preview-frame" id="discoverPreview" title="Live preview" sandbox="allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer"></iframe>' +
        '</div>' +
        (t.void
          ? '<div class="legend"><span class="swatch part-open"></span> This tag has no content or closing tag — everything lives in its attributes.</div>'
          : '<div class="legend"><span class="swatch part-open"></span> opening tag &nbsp; <span class="swatch part-content"></span> content &nbsp; <span class="swatch part-close"></span> closing tag</div>') +
        '<p class="teach-extra">' + t.extra + '</p>' +
      '</section>';
    renderPreview(document.getElementById('discoverPreview'), demoSource);
    renderFooterNav({ nextLabel: 'See it in a real page →' });
  }

  /* ---- Step 2: Watch and Understand ---- */

  function renderWatch() {
    const w = lesson.watch;
    const tags = w.annotations.map(a => a.tag);
    const chips = w.annotations.map(a => '<button type="button" class="tag-chip" data-tag="' + a.tag + '">&lt;' + a.tag + '&gt;</button>').join('');
    body.innerHTML =
      '<section class="lesson-card">' +
        '<div class="card-heading">Watch and understand</div>' +
        '<p>Here is a small ready-made webpage. Click a tag below (or in the code) to see what it does.</p>' +
        '<div class="watch-grid">' +
          '<pre class="code-block" id="watchCode">' + highlightCode(w.code, tags) + '</pre>' +
          '<iframe class="preview-frame" id="watchPreview" title="Rendered example" sandbox="allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer"></iframe>' +
        '</div>' +
        '<div class="annotation-chips">' + chips + '</div>' +
        '<div class="feedback feedback-info" id="watchNote" hidden></div>' +
      '</section>';
    renderPreview(document.getElementById('watchPreview'), w.code);
    const note = document.getElementById('watchNote');
    function select(tag) {
      document.querySelectorAll('#watchCode .tag-token').forEach(s => s.classList.toggle('active', s.dataset.tag === tag));
      document.querySelectorAll('.tag-chip').forEach(c => c.classList.toggle('active', c.dataset.tag === tag));
      const found = w.annotations.find(a => a.tag === tag);
      note.hidden = false;
      note.innerHTML = '<strong>&lt;' + tag + '&gt;</strong> — ' + escapeHtml(found.note);
    }
    document.querySelectorAll('.tag-chip').forEach(c => c.addEventListener('click', () => select(c.dataset.tag)));
    document.querySelectorAll('#watchCode .tag-token').forEach(s => s.addEventListener('click', () => select(s.dataset.tag)));
    renderFooterNav({ nextLabel: 'Practice it →' });
  }

  /* ---- Step 3: Guided coding (levels 1-4) ---- */

  function renderGuided() {
    const g = lesson.guided;
    const levelTabs = [1, 2, 3, 4].map(n =>
      '<button type="button" class="level-tab' + (n === guidedLevel ? ' active' : '') + (n > maxUnlockedLevel() ? ' locked' : '') + '" data-level="' + n + '">Level ' + n + '</button>'
    ).join('');
    body.innerHTML =
      '<section class="lesson-card">' +
        '<div class="card-heading">Guided coding</div>' +
        '<p>Help decreases as you go — by Level 4 you’re writing it yourself.</p>' +
        '<div class="level-tabs">' + levelTabs + '</div>' +
        '<div id="levelBody"></div>' +
      '</section>';
    bindLevelTabClicks();
    const levelBody = document.getElementById('levelBody');
    if (guidedLevel === 1) renderLevel1(levelBody, g.level1);
    else if (guidedLevel === 2) renderExercise(levelBody, g.level2, {
      typeLabel: 'Level 2 · Complete the missing code',
      onPass: () => { unlockLevel(3); refreshLevelTabs(); refreshGuidedFooter(); }
    });
    else if (guidedLevel === 3) renderExercise(levelBody, g.level3, {
      typeLabel: 'Level 3 · Fix the mistake', starterKey: 'broken',
      onPass: () => { unlockLevel(4); refreshLevelTabs(); refreshGuidedFooter(); }
    });
    else renderExercise(levelBody, g.level4, {
      typeLabel: 'Level 4 · Write it yourself', hints: g.level4.hints,
      onPass: () => { unlockLevel(4); refreshGuidedFooter(); }
    });
    refreshGuidedFooter();
  }

  function bindLevelTabClicks() {
    document.querySelectorAll('.level-tab').forEach(btn => btn.addEventListener('click', () => {
      const n = parseInt(btn.dataset.level, 10);
      if (n > maxUnlockedLevel()) return;
      guidedLevel = n; persist();
      renderGuided();
    }));
  }
  function refreshLevelTabs() {
    const tabsEl = document.querySelector('.level-tabs');
    if (!tabsEl) return;
    tabsEl.innerHTML = [1, 2, 3, 4].map(n =>
      '<button type="button" class="level-tab' + (n === guidedLevel ? ' active' : '') + (n > maxUnlockedLevel() ? ' locked' : '') + '" data-level="' + n + '">Level ' + n + '</button>'
    ).join('');
    bindLevelTabClicks();
  }
  function refreshGuidedFooter() {
    renderFooterNav({ nextLabel: 'Try the independent exercise →', nextDisabled: maxUnlockedLevel() < 4 });
  }
  function maxUnlockedLevel() {
    return (progress.chapters[chapterId].guidedMax || 1);
  }
  function unlockLevel(n) {
    progress.chapters[chapterId].guidedMax = Math.max(maxUnlockedLevel(), n);
    saveProgress();
  }

  function renderLevel1(container, data) {
    let chosen = null;
    function draw() {
      const display = data.template.replace(/\{\{TAG\}\}/g, chosen ? chosen : '____');
      const options = data.options.map(opt =>
        '<button type="button" class="tag-chip ' + (chosen === opt ? (opt === data.answer ? 'active ok' : 'active bad') : '') + '" data-opt="' + opt + '">' + opt + '</button>'
      ).join('');
      container.innerHTML =
        '<p>' + escapeHtml(data.prompt) + '</p>' +
        '<pre class="code-block">' + escapeHtml(display) + '</pre>' +
        '<div class="tag-chip-row">' + options + '</div>' +
        '<div id="level1Feedback"></div>';
      container.querySelectorAll('[data-opt]').forEach(btn => btn.addEventListener('click', () => {
        chosen = btn.dataset.opt;
        draw();
        const fb = document.getElementById('level1Feedback');
        if (chosen === data.answer) {
          fb.innerHTML = '<div class="feedback feedback-ok"><strong>Nice!</strong> &lt;' + chosen + '&gt; is correct.</div>';
          unlockLevel(2);
          refreshLevelTabs();
          refreshGuidedFooter();
        } else {
          fb.innerHTML = '<div class="feedback feedback-error">Not quite — try another tag.</div>';
        }
      }));
    }
    draw();
  }

  /* Shared exercise renderer: used by guided levels 2-4, the independent exercise, and the follow-up correction. */
  function renderExercise(container, data, opts) {
    opts = opts || {};
    const starter = data[opts.starterKey || 'starter'] || '';
    let revealedHints = 0;
    const referenceBlock = opts.reference
      ? '<div class="reference-panel"><div class="panel-label">Target preview</div><iframe class="preview-frame ref-preview" title="Reference preview" sandbox="allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer"></iframe></div>'
      : '';
    container.innerHTML =
      (opts.typeLabel ? '<div class="panel-label">' + opts.typeLabel + '</div>' : '') +
      (data.title ? '<h3>' + escapeHtml(data.title) + '</h3>' : '') +
      (data.prompt ? '<p>' + escapeHtml(data.prompt) + '</p>' : '') +
      (data.instructions ? '<ul class="instructions">' + data.instructions.map(i => '<li>' + escapeHtml(i) + '</li>').join('') + '</ul>' : '') +
      '<div class="exercise-grid">' +
        '<div>' +
          '<textarea class="exercise-code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off">' + escapeHtml(starter) + '</textarea>' +
          '<div class="exercise-actions">' +
            '<button class="button run-btn" type="button">Run Code</button>' +
            '<button class="run check-btn" type="button">Check My Code</button>' +
            (opts.hints || data.hint ? '<button class="button hint-btn" type="button">Hint</button>' : '') +
          '</div>' +
          (opts.hints || data.hint ? '<div class="hint-box" hidden></div>' : '') +
          '<div class="ex-feedback"></div>' +
        '</div>' +
        '<div>' + referenceBlock + '<div class="panel-label">Your preview</div><iframe class="preview-frame ex-preview" title="Your preview" sandbox="allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer"></iframe></div>' +
      '</div>' +
      (data.extraChallenge ? '<p class="extra-challenge"><strong>Extra challenge:</strong> ' + escapeHtml(data.extraChallenge) + '</p>' : '');

    if (opts.reference) renderPreview(container.querySelector('.ref-preview'), opts.reference);
    const codeEl = container.querySelector('.exercise-code');
    const feedback = container.querySelector('.ex-feedback');
    const previewFrame = container.querySelector('.ex-preview');

    codeEl.addEventListener('keydown', e => {
      if (e.key === 'Tab') { e.preventDefault(); const s = codeEl.selectionStart, en = codeEl.selectionEnd; codeEl.setRangeText('  ', s, en, 'end'); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runNow(); }
    });
    function runNow() { renderPreview(previewFrame, codeEl.value); }
    container.querySelector('.run-btn').addEventListener('click', runNow);
    container.querySelector('.check-btn').addEventListener('click', () => {
      runNow();
      const result = window.ExerciseChecker.run(codeEl.value, data.checks || []);
      feedback.innerHTML = feedbackHtml(result);
      if (result.passed && opts.onPass) opts.onPass();
    });
    const hintList = opts.hints || (data.hint ? [data.hint] : []);
    const hintBtn = container.querySelector('.hint-btn');
    if (hintBtn) hintBtn.addEventListener('click', () => {
      revealedHints = Math.min(hintList.length, revealedHints + 1);
      const box = container.querySelector('.hint-box');
      box.hidden = false;
      box.innerHTML = hintList.slice(0, revealedHints).map(h => '<div>› ' + escapeHtml(h) + '</div>').join('');
    });
  }

  /* ---- Step 4: Independent exercise (+ mistakes / correction) ---- */

  function renderPractice() {
    const data = lesson.independent;
    body.innerHTML = '<section class="lesson-card"><div class="card-heading">Independent exercise</div><div id="practiceBody"></div><div id="correctionBody"></div></section>';
    const container = document.getElementById('practiceBody');
    renderExercise(container, data, {
      typeLabel: 'No hints needed — you’ve got this',
      reference: data.referenceCode,
      onPass: () => { document.getElementById('correctionBody').innerHTML = ''; markPracticeDone(true); }
    });
    const correctionBody = document.getElementById('correctionBody');
    const showCorrectionBtn = document.createElement('button');
    showCorrectionBtn.type = 'button';
    showCorrectionBtn.className = 'button';
    showCorrectionBtn.textContent = 'Still stuck? Show Correct Solution';
    showCorrectionBtn.addEventListener('click', () => renderCorrection(correctionBody));
    container.querySelector('.check-btn').insertAdjacentElement('afterend', showCorrectionBtn);
    renderFooterNav({ nextLabel: 'Finish chapter →', nextDisabled: !isPracticeDone(), onNext: () => { markComplete(); go(stepIndex + 1); } });
  }

  function isPracticeDone() { return !!progress.chapters[chapterId].practiceDone; }
  function markPracticeDone(v) { progress.chapters[chapterId].practiceDone = v; saveProgress(); renderFooterNav({ nextLabel: 'Finish chapter →', nextDisabled: !isPracticeDone(), onNext: () => { markComplete(); go(stepIndex + 1); } }); }

  function renderCorrection(container) {
    const c = lesson.correction;
    container.innerHTML =
      '<div class="correction-panel">' +
        '<div class="panel-label">Learn from this mistake</div>' +
        '<pre class="code-block broken-code">' + escapeHtml(c.broken) + '</pre>' +
        '<p>' + escapeHtml(c.explain) + '</p>' +
        '<pre class="code-block fixed-code">' + escapeHtml(c.fixed) + '</pre>' +
        '<div id="followUpBody"></div>' +
      '</div>';
    renderExercise(document.getElementById('followUpBody'), { prompt: c.followUp.prompt, broken: c.followUp.broken, checks: c.followUp.checks }, {
      typeLabel: 'One more try',
      starterKey: 'broken',
      onPass: () => { markPracticeDone(true); }
    });
  }

  /* ---- Step 5: Completion ---- */

  function renderDone() {
    const comp = lesson.completion;
    const nextLesson = window.LESSONS.find(l => l.id === lesson.id + 1);
    body.innerHTML =
      '<section class="lesson-card completion-panel">' +
        '<div class="card-heading">Chapter completed! 🎉</div>' +
        '<p class="completion-summary">' + escapeHtml(comp.summary) + '</p>' +
        '<div class="panel-label">Tags you mastered</div>' +
        '<div class="tag-chip-row">' + comp.tagsMastered.map(t => '<span class="tag-chip static">&lt;' + t + '&gt;</span>').join('') + '</div>' +
        '<div class="completion-actions">' +
          '<button class="button" id="retryChapter" type="button">Retry Chapter</button>' +
          '<a class="button" href="index.html">Choose Another Chapter</a>' +
          (nextLesson ? '<a class="run" href="chapter.html?ch=' + nextLesson.id + '">Next Chapter →</a>' : '<a class="run" href="index.html">Back to Chapters</a>') +
        '</div>' +
      '</section>';
    document.getElementById('retryChapter').addEventListener('click', () => {
      progress.chapters[chapterId] = { completed: progress.chapters[chapterId].completed };
      saveProgress();
      stepIndex = 0; guidedLevel = 1;
      persist(); render();
    });
    footerNav.innerHTML = '';
  }

  function render() {
    renderChrome();
    const step = STEPS[stepIndex];
    if (step === 'discover') renderDiscover();
    else if (step === 'watch') renderWatch();
    else if (step === 'guided') renderGuided();
    else if (step === 'practice') renderPractice();
    else renderDone();
  }

  render();
})();
