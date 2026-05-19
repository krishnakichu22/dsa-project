/* ============================================================
   PATTERN 03 — PREFIX SUM
   ============================================================ */
(function(){
  'use strict';
  const N = 3;

  App.registerPattern(N, function(root, meta){
    root.innerHTML = App.topbar(`<a href="#/tracker">← Pattern Tracker</a> &nbsp;/&nbsp; ${meta.phase} · ${meta.phaseTitle}`) + `
      <h1>Pattern 03 — <span class="pat">Prefix Sum</span></h1>
      <div class="tagline">Pay O(n) once to build a running-sum array, then answer any range query in O(1).</div>
      <div class="meta-row">
        <span class="pill e">Difficulty: Easy</span>
        <span class="pill e">ROI: High</span>
        <span class="pill tc">Build: O(n)</span>
        <span class="pill tc">Query: O(1)</span>
      </div>
      <div class="tabs">
        <button class="tab active" data-t="build">Build Prefix</button>
        <button class="tab" data-t="query">Range Query</button>
        <button class="tab" data-t="sub">Subarray Sum = k</button>
        <button class="tab" data-t="tmpl">Mental Template</button>
        <button class="tab" data-t="key">Key Takeaways</button>
        <button class="tab" data-t="drill">Drill Set</button>
      </div>

      <div class="panel active" id="pn-build">
        <div class="sec-title">Step 1 — Build the prefix array</div>
        <div class="sec-desc">prefix[i+1] = prefix[i] + arr[i]. The one-time O(n) setup. Note the sentinel prefix[0]=0.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>computing</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>done</div>
        </div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:4px">Original array</div>
        <div class="arr" id="b-orig"></div>
        <div style="font-size:12px;color:var(--text-3);margin:8px 0 4px">Prefix array (sentinel 0 in front)</div>
        <div class="arr" id="b-pre"></div>
        <div class="info" id="b-info">Press <b>Next</b> to build one element at a time.</div>
        <div class="stats">
          <div class="stat"><div class="l">Index</div><div class="v" id="b-i">—</div></div>
          <div class="stat"><div class="l">prefix[i]</div><div class="v" id="b-v">—</div></div>
          <div class="stat"><div class="l">Formula</div><div class="v" id="b-f" style="font-size:13px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="b-next">Next step</button><button class="act" id="b-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">build_prefix</span>(arr):
    n = <span class="fn">len</span>(arr)
    prefix = [0] * (n + 1)      <span class="cm"># prefix[0] = 0 sentinel</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):
        prefix[i+1] = prefix[i] + arr[i]
    <span class="kw">return</span> prefix</pre>
      </div>

      <div class="panel" id="pn-query">
        <div class="sec-title">Step 2 — Range sum in O(1)</div>
        <div class="sec-desc">sum(L, R) = prefix[R+1] − prefix[L]. Drag the sliders; the answer updates instantly with no loop.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>range / endpoints</div>
        </div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:4px">Original array</div>
        <div class="arr" id="q-orig"></div>
        <div style="font-size:12px;color:var(--text-3);margin:8px 0 4px">Prefix array</div>
        <div class="arr" id="q-pre"></div>
        <div style="display:flex;gap:18px;flex-wrap:wrap;margin:14px 0;font-size:13px;color:var(--text-2)">
          <label>L: <input type="range" id="q-l" min="0" max="6" value="1" style="width:120px"> <span id="q-lv">1</span></label>
          <label>R: <input type="range" id="q-r" min="0" max="6" value="4" style="width:120px"> <span id="q-rv">4</span></label>
        </div>
        <div class="info" id="q-info">Drag sliders to see range sum computed instantly.</div>
        <div class="stats">
          <div class="stat"><div class="l">prefix[R+1]</div><div class="v" id="q-pr">—</div></div>
          <div class="stat"><div class="l">prefix[L]</div><div class="v" id="q-pl">—</div></div>
          <div class="stat"><div class="l">Range sum</div><div class="v" id="q-ans">—</div></div>
        </div>
        <pre><span class="kw">def</span> <span class="fn">range_sum</span>(prefix, L, R):
    <span class="kw">return</span> prefix[R+1] - prefix[L]   <span class="cm"># O(1)</span></pre>
      </div>

      <div class="panel" id="pn-sub">
        <div class="sec-title">Step 3 — Subarray sum equals k</div>
        <div class="sec-desc">k = 3. If (current_prefix − k) was seen before, those subarrays end here with sum k. Hashmap counts prefixes.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>current</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>match found</div>
        </div>
        <div class="arr" id="su-arr"></div>
        <div class="info" id="su-info">Press <b>Next</b>. We check if (prefix − k) exists in the map.</div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:6px">Hashmap {prefix_sum → count}</div>
        <div id="su-map" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;min-height:30px"></div>
        <div class="stats">
          <div class="stat"><div class="l">Current prefix</div><div class="v" id="su-p">0</div></div>
          <div class="stat"><div class="l">Looking for</div><div class="v" id="su-l">—</div></div>
          <div class="stat"><div class="l">Count</div><div class="v" id="su-c">0</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="su-next">Next step</button><button class="act" id="su-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">subarray_sum</span>(arr, k):
    seen = {0: 1}              <span class="cm"># empty prefix</span>
    curr = 0; count = 0
    <span class="kw">for</span> num <span class="kw">in</span> arr:
        curr += num
        count += seen.<span class="fn">get</span>(curr - k, 0)
        seen[curr] = seen.<span class="fn">get</span>(curr, 0) + 1
    <span class="kw">return</span> count</pre>
      </div>

      <div class="panel" id="pn-tmpl">
        <div class="sec-title">The prefix sum mental template</div>
        <div class="sec-desc">Two variants cover almost every interview problem.</div>
        <div class="tip"><b>Recognition signal:</b> "range sum query", "number of subarrays with sum = k / divisible by k". Array can have negatives → prefix sum, not sliding window.</div>
        <pre><span class="cm"># Variant 1: range queries</span>
prefix = [0]*(n+1)
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n): prefix[i+1] = prefix[i] + arr[i]
<span class="cm"># sum(L,R) = prefix[R+1] - prefix[L]</span>

<span class="cm"># Variant 2: count subarrays with sum = k</span>
<span class="kw">from</span> collections <span class="kw">import</span> defaultdict
seen = defaultdict(int); seen[0] = 1
curr = count = 0
<span class="kw">for</span> x <span class="kw">in</span> arr:
    curr += x
    count += seen[curr - k]
    seen[curr] += 1

<span class="cm"># Variant 3: divisible by k (modulo trick)</span>
curr = (curr + x) % k
count += seen[curr]; seen[curr] += 1</pre>
      </div>

      <div class="panel" id="pn-key">
        <div class="sec-title">Key takeaways — burn these in</div>
        <ul class="keypts">
          <li><b>The core idea:</b> pay O(n) once, answer any range sum in O(1) via subtraction.</li>
          <li><b>prefix[0]=0 is not optional.</b> The sentinel handles subarrays starting at index 0 — the #1 forgotten bug.</li>
          <li><b>Range formula:</b> <code>sum(L,R) = prefix[R+1] − prefix[L]</code>. Burn it in.</li>
          <li><b>The hashmap upgrade</b> flips the question: "how many previous prefixes equal curr − k?" → O(n).</li>
          <li><b>When sliding window fails</b> (negatives present), prefix sum + hashmap saves you.</li>
          <li><b>Modulo trick:</b> same remainder ⇒ subarray divisible by k. Replace <code>curr−k</code> with <code>curr%k</code>.</li>
        </ul>
      </div>

      <div class="panel" id="pn-drill">
        <div class="sec-title">Drill Set — where mastery actually happens</div>
        <div class="sec-desc">Do them in order. Struggle 20+ min before any hint. Progress saves in this browser.</div>
        <div class="drill-grp">
          <h3><span class="lvl easy">WARM UP · EASY</span> build the reflex</h3>
          ${drill('ps_e1','LC 303 — Range Sum Query (Immutable)','Pure prefix build + O(1) query. The template itself.')}
          ${drill('ps_e2','LC 1480 — Running Sum of 1d Array','Literally building a prefix array. Trivial but cements it.')}
          ${drill('ps_e3','LC 724 — Find Pivot Index','Left sum vs right sum — prefix intuition.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl med">CORE · MEDIUM</span> interview bread-and-butter</h3>
          ${drill('ps_m1','LC 560 — Subarray Sum Equals K','THE canonical prefix + hashmap problem. Master cold.')}
          ${drill('ps_m2','LC 525 — Contiguous Array','Trick: treat 0 as −1, then it is "sum = 0".')}
          ${drill('ps_m3','LC 974 — Subarray Sums Divisible by K','The modulo trick variant.')}
          ${drill('ps_m4','LC 238 — Product of Array Except Self','Prefix + suffix products. Same idea, multiplication.')}
          ${drill('ps_m5','LC 304 — Range Sum Query 2D','2D prefix sum. A real step-up worth doing.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl hard">BOSS · HARD</span> Google-tier</h3>
          ${drill('ps_h1','LC 523 — Continuous Subarray Sum','Modulo + first-seen index. Subtle edge cases.')}
          ${drill('ps_h2','LC 862 — Shortest Subarray with Sum at Least K','Prefix + monotonic deque (after Pattern 9).')}
          ${drill('ps_h3','LC 1074 — Number of Submatrices That Sum to Target','2D prefix + the LC 560 trick combined.')}
        </div>
        <div class="rubric">
          <h3>✅ Readiness self-check — be brutally honest</h3>
          <ul>
            <li>I never forget the prefix[0]=0 sentinel.</li>
            <li>I solved LC 560 <b>without hints</b> and can explain the curr−k logic aloud.</li>
            <li>I know <b>why</b> sliding window fails with negatives and prefix sum doesn't.</li>
            <li>I can do the LC 525 "treat 0 as −1" reframing on my own.</li>
            <li>I understand the modulo trick for divisibility (LC 974).</li>
            <li>I can write both variants from memory.</li>
          </ul>
          <div class="verdict">All six → tracker, tick Pattern 03, request Pattern 04. <b>Any unchecked → more reps.</b></div>
        </div>
      </div>
      <footer>Pattern 03 of 26 · Next: HashMap / Frequency Counter</footer>`;
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
    initBuild(root); initQuery(root); initSub(root);
  }

  const ORIG=[3,-2,5,1,-4,6,2], PRE=[0,3,1,6,7,3,9,11];

  function initBuild(root){
    let idx=0,done=false; const el=id=>root.querySelector(id);
    function rOrig(a){return ORIG.map((v,i)=>{let c='cell';if(i===a)c+=' left';else if(i<a)c+=' best';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function rPre(up){return PRE.map((v,i)=>{let c='cell';if(i===up)c+=' left';else if(i<up)c+=' best';else return`<div class="${c}"><span class="ix">${i}</span>?</div>`;return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function reset(){idx=0;done=false;el('#b-orig').innerHTML=rOrig(-1);el('#b-pre').innerHTML=rPre(0);el('#b-info').innerHTML='Press <b>Next</b> to build one element at a time.';el('#b-i').textContent='—';el('#b-v').textContent='—';el('#b-f').textContent='—';}
    function step(){if(done){reset();return;}if(idx>=ORIG.length){done=true;el('#b-orig').innerHTML=rOrig(-1);el('#b-pre').innerHTML=rPre(ORIG.length+1);el('#b-info').innerHTML='Done! Any range sum is now O(1).';return;}const i=idx;el('#b-orig').innerHTML=rOrig(i);el('#b-pre').innerHTML=rPre(i+1);el('#b-info').innerHTML=`prefix[${i+1}] = prefix[${i}] + arr[${i}] = <b>${PRE[i]} + ${ORIG[i]} = ${PRE[i+1]}</b>`;el('#b-i').textContent=i+1;el('#b-v').textContent=PRE[i+1];el('#b-f').textContent=`${PRE[i]} + ${ORIG[i]}`;idx++;}
    el('#b-next').addEventListener('click',step);el('#b-reset').addEventListener('click',reset);reset();
  }

  function initQuery(root){
    const el=id=>root.querySelector(id);
    function rOrig(L,R){return ORIG.map((v,i)=>{let c='cell';if(i>=L&&i<=R)c+=' best';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function rPre(L,R){return PRE.map((v,i)=>{let c='cell';if(i===R+1||i===L)c+=' best';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function upd(){let L=+el('#q-l').value,R=+el('#q-r').value;if(R<L){R=L;el('#q-r').value=L;}el('#q-lv').textContent=L;el('#q-rv').textContent=R;el('#q-orig').innerHTML=rOrig(L,R);el('#q-pre').innerHTML=rPre(L,R);const ans=PRE[R+1]-PRE[L];el('#q-pr').textContent=PRE[R+1];el('#q-pl').textContent=PRE[L];el('#q-ans').textContent=ans;el('#q-info').innerHTML=`sum[${L}..${R}] = prefix[${R+1}] − prefix[${L}] = <b>${PRE[R+1]} − ${PRE[L]} = ${ans}</b>`;}
    el('#q-l').addEventListener('input',upd);el('#q-r').addEventListener('input',upd);upd();
  }

  function initSub(root){
    const A=[1,2,1,2,1],K=3; let idx=0,curr=0,cnt=0,map={0:1},done=false;
    const el=id=>root.querySelector(id);
    function rArr(a,found){return A.map((v,i)=>{let c='cell';if(i===a)c+=found?' best':' left';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function rMap(hl){return Object.entries(map).map(([k,v])=>{let cls='pill';let st=k==hl?'background:var(--c-best);color:var(--best)':'background:var(--panel-2);color:var(--text-2)';return`<span class="pill" style="${st}">{${k}: ${v}}</span>`}).join('')||'<span style="color:var(--text-3);font-size:12px">(empty)</span>';}
    function reset(){idx=0;curr=0;cnt=0;map={0:1};done=false;el('#su-arr').innerHTML=rArr(-1,false);el('#su-map').innerHTML=rMap(null);el('#su-info').innerHTML=`Press <b>Next</b>. We check if (prefix − k) exists in the map. k = ${K}`;el('#su-p').textContent=0;el('#su-l').textContent='—';el('#su-c').textContent=0;}
    function step(){if(done){reset();return;}if(idx>=A.length){done=true;el('#su-info').innerHTML=`Done! Found <b>${cnt}</b> subarrays with sum = ${K}.`;return;}curr+=A[idx];const need=curr-K;const f=map[need]||0;cnt+=f;el('#su-arr').innerHTML=rArr(idx,false);el('#su-p').textContent=curr;el('#su-l').textContent=need;if(f>0){el('#su-info').innerHTML=`arr[${idx}]=${A[idx]}. prefix=<b>${curr}</b>. Need <b>${need}</b> → found ${f}×! count += ${f}`;}else{el('#su-info').innerHTML=`arr[${idx}]=${A[idx]}. prefix=<b>${curr}</b>. Need <b>${need}</b> → not in map. Store ${curr}.`;}map[curr]=(map[curr]||0)+1;el('#su-map').innerHTML=rMap(f>0?need:null);el('#su-c').textContent=cnt;idx++;}
    el('#su-next').addEventListener('click',step);el('#su-reset').addEventListener('click',reset);reset();
  }
})();
