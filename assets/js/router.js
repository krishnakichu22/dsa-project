/* ============================================================
   ROUTER — hash-based SPA routing
   Routes:
     #/help            → onboarding guide
     #/tracker         → pattern tracker (default)
     #/pattern/<n>     → a pattern's training page
   Pattern pages load their module from assets/js/patterns/<module>.js
   on demand. A module must call: App.registerPattern(n, renderFn)
   ============================================================ */
(function(){
  'use strict';
  const root = () => document.getElementById('app');
  const loaded = {};                 // module name -> true
  window.__PATTERN_RENDERERS = {};   // n -> render function

  window.App.registerPattern = function(n, fn){
    window.__PATTERN_RENDERERS[n] = fn;
  };

  /* ---- HELP PAGE ---- */
  function renderHelp(){
    root().innerHTML = App.topbar('DSA Zero to Hero System') + `
      <h1>START HERE — <span class="accent">How This Works</span></h1>
      <div class="sub">A 90-second read. Then you'll know exactly how to use this to go from scared to interview-ready.</div>
      <div class="note"><b>The one-sentence idea:</b> This is a personal, offline, interactive DSA course. Each pattern has a training page — you study it, then a Drill Set forces you to actually solve problems until that pattern is automatic.</div>

      <div class="sec-title">The daily loop</div>
      <div class="sec-desc">Open Tracker → pick the next pattern → study its tabs → do the Drill Set → pass the rubric → tick the box → repeat. One pattern per session. Depth beats speed.</div>

      <div class="sec-title">How to study one pattern</div>
      <ul class="keypts">
        <li><b>Watch the visual tabs first.</b> Press "Next step" repeatedly. Predict the next step before clicking.</li>
        <li><b>Memorise the Mental Template.</b> You should reproduce the skeleton on blank paper.</li>
        <li><b>Read Key Takeaways.</b> These are exactly what interviewers watch for.</li>
        <li><b>Do the Drill Set.</b> This is 70% of the value. The tabs are the map; the drills are the territory.</li>
        <li><b>Pass the rubric honestly.</b> Any unchecked box = more reps, not moving on.</li>
      </ul>

      <div class="tip"><b>The readiness test:</b> Can you solve a <i>new</i> medium problem in that pattern, under 25 min, explaining aloud, <i>without notes</i>? Yes → advance. No → more problems, not more reading.</div>

      <div class="sec-title">Adding the next pattern</div>
      <div class="sec-desc">Ask: "build Pattern N as a module". You'll get one JS file. Drop it in <code>assets/js/patterns/</code>, flip its <code>module</code> field in <code>data/patterns.js</code>, refresh. That's it — no other file changes.</div>

      <div class="tip"><b>Honest expectation:</b> This makes your reps ~3x more efficient via instant pattern recognition. It does not replace them. Google = patterns + 250–400 solved problems + 15–25 mocks + spaced repetition.</div>

      <div style="margin-top:20px"><a href="#/tracker" style="color:var(--accent);text-decoration:none">→ Go to the Tracker</a></div>
      <footer>You're not behind. You're building a system most people never do.</footer>`;
  }

  /* ---- TRACKER PAGE ---- */
  function renderTracker(){
    const done = App.getDone();
    let total = 0;
    const phasesHTML = window.PATTERNS.map(ph => {
      const pd = ph.items.filter(p => done[p.n]).length;
      total += pd;
      const rows = ph.items.map(p => {
        const has = !!p.module;
        return `<tr class="${done[p.n]?'done':''} ${has?'row-link':''}" ${has?`onclick="if(!event.target.classList.contains('chk'))location.hash='#/pattern/${p.n}'"`:''}>
          <td><span class="chk ${done[p.n]?'on':''}" onclick="event.stopPropagation();TrackerToggle(${p.n})">✓</span><span class="num">${p.n}</span></td>
          <td class="pname">${p.name}${has?' &nbsp;<span style="color:var(--accent);font-size:11px">●</span>':' <span style="color:var(--text-3);font-size:11px">(soon)</span>'}</td>
          <td><span class="badge ${p.d}">${p.dl}</span></td>
          <td><span class="badge ${p.r}">${p.rl}</span></td>
          <td class="lc">${p.lc}</td>
        </tr>`;
      }).join('');
      return `<div class="phase">
        <div class="ph-head" onclick="this.parentNode.classList.toggle('collapsed')">
          <span class="ph-badge" style="background:${ph.color}">${ph.phase}</span>
          <span class="ph-title">${ph.title}</span>
          <span class="ph-meta">${ph.items.length} patterns · ${pd} done</span>
          <span class="ph-arrow">▼</span>
        </div>
        <table>
          <tr><th>#</th><th>Pattern</th><th>Difficulty</th><th>ROI</th><th>Key LeetCode</th></tr>
          ${rows}
        </table></div>`;
    }).join('');
    const pct = Math.round(total/26*100);

    root().innerHTML = App.topbar('DSA Zero to Hero') + `
      <h1>DSA <span class="accent">Zero to Hero</span> — Pattern Tracker</h1>
      <div class="sub">Complete roadmap to crack product-based company interviews · Python</div>
      <div class="nav-help" style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><span>New here? → <a href="#/help">Read START HERE first</a></span><a href="E:\DSA_Cracking\dsa-projectassets/js/floor.html" target="_blank" style="font-family:inherit;font-size:12px;padding:7px 16px;border-radius:20px;background:var(--accent);color:#1a1205;text-decoration:none;font-weight:600">📋 THE FLOOR</a></div>
      <div class="note"><b>Tip:</b> Click any row with a <span style="color:var(--accent)">●</span> to open its training page. Tick the box only after you've cleared its Drill Set rubric. Progress saves in this browser.</div>
      <div class="summary">
        <div class="card"><div class="val">26</div><div class="lbl">Total</div></div>
        <div class="card"><div class="val" style="color:var(--green)">${total}</div><div class="lbl">Completed</div></div>
        <div class="card"><div class="val" style="color:var(--accent)">${26-total}</div><div class="lbl">Remaining</div></div>
        <div class="card"><div class="val">${pct}%</div><div class="lbl">Progress</div></div>
      </div>
      <div class="pbar-wrap">
        <div class="pbar-top"><span>Overall progress</span><span>${total} / 26 patterns</span></div>
        <div class="pbar"><div class="pfill" style="width:${pct}%"></div></div>
      </div>
      ${phasesHTML}
      <div class="reset"><button onclick="if(confirm('Reset all progress?')){App.resetProgress();renderRoute();}">Reset all progress</button></div>
      <footer>Patterns ordered by learning dependency, not difficulty</footer>`;
  }
  window.TrackerToggle = function(n){ App.togglePattern(n); renderTracker(); };

  /* ---- PATTERN PAGE ---- */
  function renderPattern(n){
    const meta = window.PATTERN_BY_N[n];
    if(!meta){ location.hash = '#/tracker'; return; }

    // already have renderer?
    if(window.__PATTERN_RENDERERS[n]){ window.__PATTERN_RENDERERS[n](root(), meta); return; }

    // no module assigned -> coming soon
    if(!meta.module){
      root().innerHTML = App.topbar(`<a href="#/tracker">← Tracker</a> / ${meta.phaseTitle}`) + `
        <div class="locked">
          <div class="big">🔒</div>
          <h2>Pattern ${n}: ${meta.name}</h2>
          <p>This training page isn't built yet.</p>
          <p>To add it, ask: <code>build Pattern ${n} as a module</code>. You'll get one JS file to drop into <code>assets/js/patterns/</code>.</p>
          <p style="margin-top:16px"><a href="#/tracker" style="color:var(--accent);text-decoration:none">← Back to Tracker</a></p>
        </div>`;
      return;
    }

    // load module on demand
    if(loaded[meta.module]){ return; }
    root().innerHTML = `<div class="locked"><div class="big">⏳</div><h2>Loading ${meta.name}…</h2></div>`;
    const s = document.createElement('script');
    s.src = 'assets/js/patterns/' + meta.module + '.js';
    s.onload = () => { loaded[meta.module] = true;
      if(window.__PATTERN_RENDERERS[n]) window.__PATTERN_RENDERERS[n](root(), meta);
      else root().innerHTML = App.topbar(`<a href="#/tracker">← Tracker</a>`) + `<div class="locked"><div class="big">⚠️</div><h2>Module loaded but did not register.</h2><p>The pattern module must call App.registerPattern(${n}, fn).</p></div>`;
    };
    s.onerror = () => {
      root().innerHTML = App.topbar(`<a href="#/tracker">← Tracker</a>`) + `
        <div class="locked"><div class="big">⚠️</div><h2>Could not load module</h2>
        <p>Expected file: <code>assets/js/patterns/${meta.module}.js</code></p>
        <p>Make sure you're running via the local server (see README), not opening index.html directly.</p>
        <p style="margin-top:16px"><a href="#/tracker" style="color:var(--accent)">← Back</a></p></div>`;
    };
    document.body.appendChild(s);
  }

  /* ---- ROUTE DISPATCH ---- */
  window.renderRoute = function(){
    const h = location.hash || '#/tracker';
    if(h.startsWith('#/help')) return renderHelp();
    if(h.startsWith('#/pattern/')){
      const n = parseInt(h.split('/')[2], 10);
      if(!isNaN(n)) return renderPattern(n);
    }
    return renderTracker();
  };
  window.renderTracker = renderTracker;

  window.addEventListener('hashchange', window.renderRoute);
  window.addEventListener('DOMContentLoaded', window.renderRoute);
})();