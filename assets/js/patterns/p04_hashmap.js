/* ============================================================
   PATTERN 04 — HASHMAP / FREQUENCY COUNTER
   ============================================================ */
(function(){
  'use strict';
  const N = 4;

  App.registerPattern(N, function(root, meta){
    root.innerHTML = App.topbar(`<a href="#/tracker">← Pattern Tracker</a> &nbsp;/&nbsp; ${meta.phase} · ${meta.phaseTitle}`) + `
      <h1>Pattern 04 — <span class="pat">HashMap / Frequency Counter</span></h1>
      <div class="tagline">Turn an O(n) search into O(1) lookup by storing what you've seen.</div>
      <div class="meta-row">
        <span class="pill e">Difficulty: Easy</span>
        <span class="pill e">ROI: High</span>
        <span class="pill tc">Time: O(n)</span>
        <span class="pill tc">Space: O(n)</span>
      </div>
      <div class="tabs">
        <button class="tab active" data-t="two">Two Sum</button>
        <button class="tab" data-t="ana">Anagram Check</button>
        <button class="tab" data-t="fu">First Unique Char</button>
        <button class="tab" data-t="tmpl">Mental Template</button>
        <button class="tab" data-t="key">Key Takeaways</button>
        <button class="tab" data-t="drill">Drill Set</button>
      </div>

      <div class="panel active" id="pn-two">
        <div class="sec-title">Two Sum (unsorted, one pass)</div>
        <div class="sec-desc">target = 9. For each number, check if its complement is already in the map. Check first, store after.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>current</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>found</div>
          <div class="lg"><span class="sw" style="background:var(--c-win);border:1px solid var(--win)"></span>stored</div>
        </div>
        <div class="arr" id="tw-arr"></div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:6px">HashMap {value → index}</div>
        <div id="tw-map" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;min-height:30px"></div>
        <div class="info" id="tw-info">Press <b>Next</b>. We check complement first, then store.</div>
        <div class="stats">
          <div class="stat"><div class="l">Current</div><div class="v" id="tw-c">—</div></div>
          <div class="stat"><div class="l">Need (t−num)</div><div class="v" id="tw-n">—</div></div>
          <div class="stat"><div class="l">Answer</div><div class="v" id="tw-a" style="font-size:14px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="tw-next">Next step</button><button class="act" id="tw-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">two_sum</span>(nums, target):
    seen = {}
    <span class="kw">for</span> i, num <span class="kw">in</span> <span class="fn">enumerate</span>(nums):
        c = target - num
        <span class="kw">if</span> c <span class="kw">in</span> seen:
            <span class="kw">return</span> [seen[c], i]   <span class="cm"># check FIRST</span>
        seen[num] = i              <span class="cm"># store AFTER</span>
    <span class="kw">return</span> []</pre>
      </div>

      <div class="panel" id="pn-ana">
        <div class="sec-title">Valid anagram</div>
        <div class="sec-desc">Build frequency from s, then subtract using t. All zeros at the end → anagram.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>current char</div>
          <div class="lg"><span class="sw" style="background:var(--c-win);border:1px solid var(--win)"></span>from s (add)</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>from t (subtract)</div>
        </div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:4px">String s</div>
        <div class="arr" id="an-s"></div>
        <div style="font-size:12px;color:var(--text-3);margin:8px 0 4px">String t</div>
        <div class="arr" id="an-t"></div>
        <div style="font-size:12px;color:var(--text-3);margin:10px 0 6px">Frequency map</div>
        <div id="an-map" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;min-height:30px"></div>
        <div class="info" id="an-info">Press <b>Next</b>. Build from s, then cancel with t.</div>
        <div class="stats">
          <div class="stat"><div class="l">Phase</div><div class="v" id="an-ph" style="font-size:15px">Build</div></div>
          <div class="stat"><div class="l">Char</div><div class="v" id="an-c">—</div></div>
          <div class="stat"><div class="l">Result</div><div class="v" id="an-r" style="font-size:14px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="an-next">Next step</button><button class="act" id="an-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">is_anagram</span>(s, t):
    <span class="kw">if</span> <span class="fn">len</span>(s) != <span class="fn">len</span>(t): <span class="kw">return</span> <span class="kw">False</span>
    count = {}
    <span class="kw">for</span> c <span class="kw">in</span> s: count[c] = count.<span class="fn">get</span>(c,0) + 1
    <span class="kw">for</span> c <span class="kw">in</span> t:
        count[c] = count.<span class="fn">get</span>(c,0) - 1
        <span class="kw">if</span> count[c] &lt; 0: <span class="kw">return</span> <span class="kw">False</span>
    <span class="kw">return</span> <span class="kw">True</span>
<span class="cm"># Pythonic: Counter(s) == Counter(t)</span></pre>
      </div>

      <div class="panel" id="pn-fu">
        <div class="sec-title">First unique character</div>
        <div class="sec-desc">Two passes: pass 1 counts frequencies, pass 2 finds the first char with count 1.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>scanning</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>unique (count 1)</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>duplicate</div>
        </div>
        <div class="arr" id="fu-arr"></div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:6px">Frequency map</div>
        <div id="fu-map" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;min-height:30px"></div>
        <div class="info" id="fu-info">Press <b>Next</b>. Pass 1 counts; pass 2 finds first count = 1.</div>
        <div class="stats">
          <div class="stat"><div class="l">Phase</div><div class="v" id="fu-ph" style="font-size:15px">Count</div></div>
          <div class="stat"><div class="l">Checking</div><div class="v" id="fu-ch">—</div></div>
          <div class="stat"><div class="l">Answer idx</div><div class="v" id="fu-a">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="fu-next">Next step</button><button class="act" id="fu-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">first_unique_char</span>(s):
    count = {}
    <span class="kw">for</span> c <span class="kw">in</span> s: count[c] = count.<span class="fn">get</span>(c,0) + 1
    <span class="kw">for</span> i, c <span class="kw">in</span> <span class="fn">enumerate</span>(s):
        <span class="kw">if</span> count[c] == 1: <span class="kw">return</span> i
    <span class="kw">return</span> -1</pre>
      </div>

      <div class="panel" id="pn-tmpl">
        <div class="sec-title">The HashMap mental template</div>
        <div class="sec-desc">Every hashmap problem is one of four shapes.</div>
        <div class="tip"><b>Recognition signal:</b> "find pair", "count occurrences", "detect duplicate", "group by", "first/last seen" → reach for a HashMap.</div>
        <pre><span class="cm"># Shape 1: Lookup complement (Two Sum)</span>
seen = {}
<span class="kw">for</span> i, x <span class="kw">in</span> <span class="fn">enumerate</span>(arr):
    <span class="kw">if</span> target - x <span class="kw">in</span> seen: <span class="kw">return</span> [seen[target-x], i]
    seen[x] = i

<span class="cm"># Shape 2: Frequency counter</span>
<span class="kw">from</span> collections <span class="kw">import</span> Counter
freq = Counter(arr)

<span class="cm"># Shape 3: Grouping by canonical key</span>
<span class="kw">from</span> collections <span class="kw">import</span> defaultdict
g = defaultdict(list)
<span class="kw">for</span> w <span class="kw">in</span> words: g[<span class="fn">tuple</span>(<span class="fn">sorted</span>(w))].<span class="fn">append</span>(w)

<span class="cm"># Shape 4: First/last seen index</span>
first = {}
<span class="kw">for</span> i, x <span class="kw">in</span> <span class="fn">enumerate</span>(arr):
    <span class="kw">if</span> x <span class="kw">not</span> <span class="kw">in</span> first: first[x] = i</pre>
      </div>

      <div class="panel" id="pn-key">
        <div class="sec-title">Key takeaways — burn these in</div>
        <ul class="keypts">
          <li><b>The core idea:</b> O(1) lookup replaces O(n) scanning. Trade O(n) space for O(n²)→O(n) time.</li>
          <li><b>Four shapes:</b> complement lookup, frequency counter, grouping, first/last seen.</li>
          <li><b>Two Sum order trap:</b> check complement FIRST, then store — or you may match a number with itself.</li>
          <li><b>Counter is your superpower:</b> <code>Counter(s)==Counter(t)</code> solves anagram; <code>.most_common(k)</code> solves top-k.</li>
          <li><b>defaultdict over dict for grouping</b> — no key-existence checks, fewer bugs under pressure.</li>
          <li><b>Say the trade-off aloud:</b> "O(n) space for the map to get O(n) time instead of O(n²)."</li>
        </ul>
      </div>

      <div class="panel" id="pn-drill">
        <div class="sec-title">Drill Set — where mastery actually happens</div>
        <div class="sec-desc">Do them in order. Struggle 20+ min before any hint. Progress saves in this browser.</div>
        <div class="drill-grp">
          <h3><span class="lvl easy">WARM UP · EASY</span> build the reflex</h3>
          ${drill('hm_e1','LC 1 — Two Sum','The canonical complement-lookup. Must be instant.')}
          ${drill('hm_e2','LC 242 — Valid Anagram','Frequency counter basics.')}
          ${drill('hm_e3','LC 217 — Contains Duplicate','Set membership — simplest hashmap use.')}
          ${drill('hm_e4','LC 387 — First Unique Character','Two-pass frequency counter.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl med">CORE · MEDIUM</span> interview bread-and-butter</h3>
          ${drill('hm_m1','LC 49 — Group Anagrams','Grouping by canonical key. Asked everywhere.')}
          ${drill('hm_m2','LC 347 — Top K Frequent Elements','Counter + heap/bucket. Very common.')}
          ${drill('hm_m3','LC 438 — Find All Anagrams in a String','Frequency map + sliding window combined.')}
          ${drill('hm_m4','LC 36 — Valid Sudoku','Multiple hashmaps tracking rows/cols/boxes.')}
          ${drill('hm_m5','LC 454 — 4Sum II','Two-map pairing trick. Clever counter use.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl hard">BOSS · HARD</span> Google-tier</h3>
          ${drill('hm_h1','LC 128 — Longest Consecutive Sequence','HashSet + O(n) sequence walking. A famous hard.')}
          ${drill('hm_h2','LC 460 — LFU Cache','HashMap + frequency buckets + linked structure.')}
          ${drill('hm_h3','LC 76 — Minimum Window Substring','need/have hashmaps + window (links back to Pattern 1).')}
        </div>
        <div class="rubric">
          <h3>✅ Readiness self-check — be brutally honest</h3>
          <ul>
            <li>I instantly classify a problem into one of the 4 hashmap shapes.</li>
            <li>I solved LC 1 and LC 49 <b>without hints</b>.</li>
            <li>I can explain the Two Sum check-then-store order trap aloud.</li>
            <li>I use Counter and defaultdict fluently, not raw dicts.</li>
            <li>I cracked LC 128 and understand why it's O(n) not O(n log n).</li>
            <li>I always state the space/time trade-off in interviews.</li>
          </ul>
          <div class="verdict">All six → tracker, tick Pattern 04, request Pattern 05. <b>Any unchecked → more reps.</b></div>
        </div>
      </div>
      <footer>Pattern 04 of 26 · Next: Kadane's Algorithm</footer>`;
    wire(root);
  });

  function drill(id,name,meta){return `<div class="prob" data-id="${id}"><span class="pchk" data-drill="${id}">✓</span><div class="pinfo"><div class="pname">${name}</div><div class="pmeta">${meta}</div></div></div>`;}

  function wire(root){
    root.querySelectorAll('.tab').forEach(btn=>{
      btn.addEventListener('click',()=>{
        root.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
        root.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        root.querySelector('#pn-'+btn.dataset.t).classList.add('active');
      });
    });
    const ds=App.getDrill(N);
    root.querySelectorAll('.pchk').forEach(c=>{
      const id=c.dataset.drill,row=c.closest('.prob');
      if(ds[id]){c.classList.add('on');row.classList.add('checked');}
      c.addEventListener('click',()=>{const d=App.toggleDrill(N,id);if(d[id]){c.classList.add('on');row.classList.add('checked');}else{c.classList.remove('on');row.classList.remove('checked');}});
    });
    initTwo(root); initAna(root); initFU(root);
  }

  function pill(txt,hl){return `<span class="pill" style="${hl?'background:var(--c-best);color:var(--best)':'background:var(--panel-2);color:var(--text-2)'}">${txt}</span>`;}

  function initTwo(root){
    const A=[2,7,11,15,1,8],T=9; let idx=0,map={},done=false;
    const el=id=>root.querySelector(id);
    function rArr(a,hits){return A.map((v,i)=>{let c='cell';if(hits&&hits.includes(i))c+=' best';else if(i<a)c+=' win';else if(i===a)c+=' left';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function rMap(hl){const e=Object.entries(map);return e.length?e.map(([k,v])=>pill(k+'→'+v,k==hl)).join(''):'<span style="color:var(--text-3);font-size:12px">(empty)</span>';}
    function reset(){idx=0;map={};done=false;el('#tw-arr').innerHTML=rArr(-1,null);el('#tw-map').innerHTML=rMap(null);el('#tw-info').innerHTML='Press <b>Next</b>. We check complement first, then store.';el('#tw-c').textContent='—';el('#tw-n').textContent='—';el('#tw-a').textContent='—';}
    function step(){if(done){reset();return;}if(idx>=A.length){done=true;el('#tw-info').innerHTML='No pair found.';return;}const num=A[idx],need=T-num;el('#tw-c').textContent=num;el('#tw-n').textContent=need;if(map.hasOwnProperty(need)){el('#tw-arr').innerHTML=rArr(idx,[map[need],idx]);el('#tw-map').innerHTML=rMap(need);el('#tw-info').innerHTML=`num=<b>${num}</b>, need=<b>${need}</b>. Found at index ${map[need]}! Answer [${map[need]}, ${idx}]`;el('#tw-a').textContent=`[${map[need]},${idx}]`;done=true;}else{el('#tw-info').innerHTML=`num=<b>${num}</b>, need=<b>${need}</b>. Not in map → store {${num}: ${idx}}`;map[num]=idx;el('#tw-arr').innerHTML=rArr(idx,null);el('#tw-map').innerHTML=rMap(num);idx++;}}
    el('#tw-next').addEventListener('click',step);el('#tw-reset').addEventListener('click',reset);reset();
  }

  function initAna(root){
    const S='anagram'.split(''),Tt='nagaram'.split(''); let idx=0,phase='build',freq={},done=false;
    const el=id=>root.querySelector(id);
    function rA(arr,a,ph){return arr.map((v,i)=>{let c='cell';if(i===a)c+=' left';else if(i<a)c+=ph==='build'?' win':' right';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function rMap(hl,ph){const e=Object.entries(freq).filter(([,v])=>v!==0);return e.length?e.map(([k,v])=>pill(k+':'+v,k===hl)).join(''):'<span style="color:var(--text-3);font-size:12px">(empty)</span>';}
    function reset(){idx=0;phase='build';freq={};done=false;el('#an-s').innerHTML=rA(S,-1,'build');el('#an-t').innerHTML=rA(Tt,-1,'sub');el('#an-map').innerHTML=rMap(null,'build');el('#an-info').innerHTML='Press <b>Next</b>. Build from s, then cancel with t.';el('#an-ph').textContent='Build';el('#an-c').textContent='—';el('#an-r').textContent='—';}
    function step(){if(done){reset();return;}if(phase==='build'){if(idx>=S.length){phase='sub';idx=0;el('#an-info').innerHTML='Phase 1 done. Now subtract using t.';el('#an-ph').textContent='Subtract';return;}const c=S[idx];freq[c]=(freq[c]||0)+1;el('#an-s').innerHTML=rA(S,idx,'build');el('#an-map').innerHTML=rMap(c,'build');el('#an-info').innerHTML=`Build: s[${idx}]='<b>${c}</b>' → freq[${c}]=${freq[c]}`;el('#an-c').textContent=c;idx++;}else{if(idx>=Tt.length){done=true;const z=Object.values(freq).every(v=>v===0);el('#an-info').innerHTML=`Done! All cancelled → <b>${z?'IS an anagram':'NOT an anagram'}</b>`;el('#an-r').textContent=z?'Anagram':'No';return;}const c=Tt[idx];freq[c]=(freq[c]||0)-1;el('#an-t').innerHTML=rA(Tt,idx,'sub');el('#an-map').innerHTML=rMap(c,'sub');el('#an-info').innerHTML=`Subtract: t[${idx}]='<b>${c}</b>' → freq[${c}]=${freq[c]}`;el('#an-c').textContent=c;idx++;}}
    el('#an-next').addEventListener('click',step);el('#an-reset').addEventListener('click',reset);reset();
  }

  function initFU(root){
    const S='loveleetcode'.split(''); let idx=0,freq={},phase='count',done=false;
    const el=id=>root.querySelector(id);
    function rArr(a,ph,ans){return S.map((v,i)=>{let c='cell';if(ans!==null&&i===ans)c+=' best';else if(ph==='find'&&i<a)c+=(freq[S[i]]===1?' best':' right');else if(i===a)c+=' left';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function rMap(hl){const e=Object.entries(freq);return e.length?e.map(([k,v])=>pill(k+':'+v,k===hl)).join(''):'<span style="color:var(--text-3);font-size:12px">(empty)</span>';}
    function reset(){idx=0;freq={};phase='count';done=false;el('#fu-arr').innerHTML=rArr(-1,'count',null);el('#fu-map').innerHTML='<span style="color:var(--text-3);font-size:12px">(empty)</span>';el('#fu-info').innerHTML='Press <b>Next</b>. Pass 1 counts; pass 2 finds first count = 1.';el('#fu-ph').textContent='Count';el('#fu-ch').textContent='—';el('#fu-a').textContent='—';}
    function step(){if(done){reset();return;}if(phase==='count'){if(idx>=S.length){phase='find';idx=0;el('#fu-info').innerHTML='Map complete. Scan left→right for first count = 1.';el('#fu-ph').textContent='Find';return;}const c=S[idx];freq[c]=(freq[c]||0)+1;el('#fu-arr').innerHTML=rArr(idx,'count',null);el('#fu-map').innerHTML=rMap(c);el('#fu-info').innerHTML=`Count: s[${idx}]='<b>${c}</b>' → freq[${c}]=${freq[c]}`;el('#fu-ch').textContent=c;idx++;}else{if(idx>=S.length){done=true;el('#fu-info').innerHTML='No unique char. Return −1.';return;}const c=S[idx];el('#fu-ch').textContent=c;if(freq[c]===1){el('#fu-arr').innerHTML=rArr(idx,'find',idx);el('#fu-map').innerHTML=rMap(c);el('#fu-info').innerHTML=`Find: s[${idx}]='<b>${c}</b>', count=<b>1</b>. First unique! Return <b>${idx}</b>.`;el('#fu-a').textContent=idx;done=true;}else{el('#fu-arr').innerHTML=rArr(idx,'find',null);el('#fu-map').innerHTML=rMap(c);el('#fu-info').innerHTML=`Find: s[${idx}]='<b>${c}</b>', count=${freq[c]}. Duplicate, skip.`;idx++;}}}
    el('#fu-next').addEventListener('click',step);el('#fu-reset').addEventListener('click',reset);reset();
  }
})();
