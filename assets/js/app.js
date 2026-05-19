/* ============================================================
   APP CORE — theme, progress store, shared helpers
   Loaded once. Every page/pattern uses these globals.
   ============================================================ */
(function(){
  'use strict';

  /* ---------- Theme ---------- */
  const TK = 'dsa_theme';
  const App = window.App = {};

  App.applyTheme = function(t){
    document.documentElement.setAttribute('data-theme', t);
    const i = document.getElementById('ti'), n = document.getElementById('tt');
    if(i) i.textContent = t === 'dark' ? '🌙' : '☀️';
    if(n) n.textContent = t === 'dark' ? 'Dark' : 'Light';
  };
  App.toggleTheme = function(){
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    App.applyTheme(next);
    try{ localStorage.setItem(TK, next); }catch(e){}
  };
  App.initTheme = function(){
    let t = 'dark';
    try{ t = localStorage.getItem(TK) || 'dark'; }catch(e){}
    App.applyTheme(t);
  };

  /* ---------- Progress: completed patterns ---------- */
  const PK = 'dsa_tracker_progress_v1';
  App.getDone = function(){
    try{ return JSON.parse(localStorage.getItem(PK)) || {}; }catch(e){ return {}; }
  };
  App.setDone = function(obj){
    try{ localStorage.setItem(PK, JSON.stringify(obj)); }catch(e){}
  };
  App.togglePattern = function(n){
    const d = App.getDone();
    if(d[n]) delete d[n]; else d[n] = true;
    App.setDone(d);
    return d;
  };
  App.resetProgress = function(){
    try{ localStorage.removeItem(PK); }catch(e){}
  };

  /* ---------- Progress: per-pattern drill problems ---------- */
  App.getDrill = function(patternN){
    try{ return JSON.parse(localStorage.getItem('dsa_drill_p'+patternN)) || {}; }catch(e){ return {}; }
  };
  App.toggleDrill = function(patternN, id){
    const d = App.getDrill(patternN);
    if(d[id]) delete d[id]; else d[id] = true;
    try{ localStorage.setItem('dsa_drill_p'+patternN, JSON.stringify(d)); }catch(e){}
    return d;
  };

  /* ---------- Shared topbar ---------- */
  App.topbar = function(crumbHTML){
    return `<div class="topbar">
      <div class="crumb">${crumbHTML}</div>
      <button class="theme-btn" onclick="App.toggleTheme()"><span id="ti">🌙</span><span id="tt">Dark</span></button>
    </div>`;
  };

  /* ---------- Storage availability warning ---------- */
  App.storageOK = function(){
    try{ localStorage.setItem('__t','1'); localStorage.removeItem('__t'); return true; }
    catch(e){ return false; }
  };

  App.initTheme();
})();
