/* ============================================================
   PATTERN 01 — SLIDING WINDOW
   This is the TEMPLATE every future pattern module copies.
   Contract: call App.registerPattern(N, function(root, meta){...})
   The function renders the full page into `root` (an element).
   ============================================================ */
(function(){
  'use strict';
  const N = 1;

  App.registerPattern(N, function(root, meta){
    root.innerHTML = App.topbar(`<a href="#/tracker">← Pattern Tracker</a> &nbsp;/&nbsp; ${meta.phase} · ${meta.phaseTitle}`) + `
      <h1>Pattern 01 — <span class="pat">Sliding Window</span></h1>
      <div class="tagline">Avoid recomputing overlapping work by maintaining a moving window with running state.</div>
      <div class="meta-row">
        <span class="pill e">Difficulty: Easy</span>
        <span class="pill e">ROI: High</span>
        <span class="pill tc">Time: O(n)</span>
        <span class="pill tc">Space: O(1) or O(k)</span>
      </div>
      <div class="tabs">
        <button class="tab active" data-t="fixed">Fixed Window</button>
        <button class="tab" data-t="var">Variable Window</button>
        <button class="tab" data-t="str">String Window</button>
        <button class="tab" data-t="tmpl">Mental Template</button>
        <button class="tab" data-t="key">Key Takeaways</button>
        <button class="tab" data-t="drill">Drill Set</button>
      </div>
      <div class="panel active" id="pn-fixed">
        <div class="sec-title">Max sum subarray of size k</div>
        <div class="sec-desc">k = 3. Slide a fixed-size window: add the new right element, drop the old left element. No re-summing.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>left</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>right</div>
          <div class="lg"><span class="sw" style="background:var(--c-win);border:1px solid var(--win)"></span>in window</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>best</div>
        </div>
        <div class="arr" id="f-arr"></div>
        <div class="info" id="f-info">Press <b>Next</b> to build the first window.</div>
        <div class="stats">
          <div class="stat"><div class="l">Window sum</div><div class="v" id="f-cur">—</div></div>
          <div class="stat"><div class="l">Max sum</div><div class="v" id="f-max">—</div></div>
          <div class="stat"><div class="l">Best window</div><div class="v" id="f-best" style="font-size:14px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="f-next">Next step</button><button class="act" id="f-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">max_sum_subarray</span>(arr, k):
    window_sum = <span class="fn">sum</span>(arr[:k])     <span class="cm"># first window</span>
    max_sum = window_sum
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(k, <span class="fn">len</span>(arr)):
        window_sum += arr[i]      <span class="cm"># add right</span>
        window_sum -= arr[i-k]    <span class="cm"># drop left</span>
        max_sum = <span class="fn">max</span>(max_sum, window_sum)
    <span class="kw">return</span> max_sum</pre>
      </div>
      <div class="panel" id="pn-var">
        <div class="sec-title">Smallest subarray with sum ≥ target</div>
        <div class="sec-desc">target = 7. Expand right until the sum qualifies, then shrink from left to minimise length.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>left</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>right</div>
          <div class="lg"><span class="sw" style="background:var(--c-win);border:1px solid var(--win)"></span>in window</div>
        </div>
        <div class="arr" id="v-arr"></div>
        <div class="info" id="v-info">Press <b>Next</b> to start expanding.</div>
        <div class="stats">
          <div class="stat"><div class="l">Window sum</div><div class="v" id="v-sum">—</div></div>
          <div class="stat"><div class="l">Target</div><div class="v">7</div></div>
          <div class="stat"><div class="l">Min length</div><div class="v" id="v-min">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="v-next">Next step</button><button class="act" id="v-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">min_subarray_len</span>(target, arr):
    left = 0
    window_sum = 0
    min_len = <span class="fn">float</span>(<span class="st">'inf'</span>)
    <span class="kw">for</span> right <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(arr)):
        window_sum += arr[right]        <span class="cm"># expand</span>
        <span class="kw">while</span> window_sum &gt;= target:     <span class="cm"># shrink</span>
            min_len = <span class="fn">min</span>(min_len, right - left + 1)
            window_sum -= arr[left]
            left += 1
    <span class="kw">return</span> min_len <span class="kw">if</span> min_len != <span class="fn">float</span>(<span class="st">'inf'</span>) <span class="kw">else</span> 0</pre>
      </div>
      <div class="panel" id="pn-str">
        <div class="sec-title">Longest substring without repeating characters</div>
        <div class="sec-desc">When a duplicate enters, jump left past its previous position. A hashmap stores last-seen indices.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>left</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>right</div>
          <div class="lg"><span class="sw" style="background:var(--c-win);border:1px solid var(--win)"></span>valid window</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>best</div>
        </div>
        <div class="arr" id="s-arr"></div>
        <div class="info" id="s-info">Press <b>Next</b> to begin scanning.</div>
        <div class="stats">
          <div class="stat"><div class="l">Window</div><div class="v" id="s-win" style="font-size:15px">—</div></div>
          <div class="stat"><div class="l">Max length</div><div class="v" id="s-max">—</div></div>
          <div class="stat"><div class="l">Seen map</div><div class="v" id="s-map" style="font-size:12px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="s-next">Next step</button><button class="act" id="s-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">length_of_longest_substring</span>(s):
    char_index = {}
    left = 0
    max_len = 0
    <span class="kw">for</span> right <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(s)):
        <span class="kw">if</span> s[right] <span class="kw">in</span> char_index <span class="kw">and</span> char_index[s[right]] &gt;= left:
            left = char_index[s[right]] + 1
        char_index[s[right]] = right
        max_len = <span class="fn">max</span>(max_len, right - left + 1)
    <span class="kw">return</span> max_len</pre>
      </div>
      <div class="panel" id="pn-tmpl">
        <div class="sec-title">The universal mental template</div>
        <div class="sec-desc">Every sliding window problem fits this skeleton. Memorise the shape, not individual solutions.</div>
        <div class="tip"><b>Recognition signal:</b> "subarray / substring", "contiguous", "maximum / minimum", "at most k", "at least target" → Sliding Window. If the array has negatives and asks for sum = k, use Prefix Sum instead.</div>
        <pre><span class="cm"># VARIABLE WINDOW (expand + shrink)</span>
<span class="kw">def</span> <span class="fn">sliding_window</span>(arr):
    left = 0
    result = 0
    state = 0                       <span class="cm"># sum / count / set</span>
    <span class="kw">for</span> right <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(arr)):
        state += arr[right]         <span class="cm"># 1. EXPAND</span>
        <span class="kw">while</span> <span class="fn">invalid</span>(state):        <span class="cm"># 2. SHRINK</span>
            state -= arr[left]
            left += 1
        result = <span class="fn">max</span>(result, right - left + 1)  <span class="cm"># 3. RECORD</span>
    <span class="kw">return</span> result

<span class="cm"># FIXED WINDOW (size k constant)</span>
<span class="kw">def</span> <span class="fn">fixed_window</span>(arr, k):
    left = 0; s = 0; best = 0
    <span class="kw">for</span> right <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(arr)):
        s += arr[right]
        <span class="kw">if</span> right - left + 1 &gt; k:
            s -= arr[left]; left += 1
        <span class="kw">if</span> right - left + 1 == k:
            best = <span class="fn">max</span>(best, s)
    <span class="kw">return</span> best</pre>
      </div>
      <div class="panel" id="pn-key">
        <div class="sec-title">Key takeaways — burn these in</div>
        <ul class="keypts">
          <li><b>The core trick:</b> when the window moves, you add one element and remove one. O(n²) → O(n).</li>
          <li><b>Fixed vs variable:</b> fixed = size k constant (add right, drop right−k). Variable = size changes on a condition.</li>
          <li><b>The shrink condition is everything.</b> Ask "what makes this window invalid?" — that's your while-loop guard.</li>
          <li><b>String problems need a hashmap, not a set.</b> A map says <i>where</i> a char was, letting you jump left past the duplicate.</li>
          <li><b>Negatives break sliding window.</b> Array has negatives + wants sum = k → use Prefix Sum + hashmap.</li>
          <li><b>Say the trade-off aloud in interviews:</b> "O(n) time, O(k) space, single pass."</li>
        </ul>
      </div>
      <div class="panel" id="pn-drill">
        <div class="sec-title">Drill Set — where mastery actually happens</div>
        <div class="sec-desc">Tutorials are the map. These are the territory. Do them in order. Struggle 20+ min before any hint. Progress saves in this browser.</div>
        <div class="drill-grp">
          <h3><span class="lvl easy">WARM UP · EASY</span> build the reflex</h3>
          ${drill('sw_e1','LC 643 — Maximum Average Subarray I','Pure fixed window. If not trivial, re-watch the Fixed tab.')}
          ${drill('sw_e2','LC 1456 — Max Vowels in Substring of Length k','Fixed window with a counter instead of a sum.')}
          ${drill('sw_e3','LC 219 — Contains Duplicate II','Window + set. Trains the "valid window" mindset.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl med">CORE · MEDIUM</span> interview bread-and-butter</h3>
          ${drill('sw_m1','LC 3 — Longest Substring Without Repeating Characters','THE canonical variable window. Asked everywhere. Master cold.')}
          ${drill('sw_m2','LC 209 — Minimum Size Subarray Sum','Expand-then-shrink. The variable window archetype.')}
          ${drill('sw_m3','LC 424 — Longest Repeating Character Replacement','Window + "at most k changes". A real step-up.')}
          ${drill('sw_m4','LC 567 — Permutation in String','Fixed window + frequency match. Amazon/Microsoft favourite.')}
          ${drill('sw_m5','LC 1004 — Max Consecutive Ones III','"At most k zeros" — same skeleton as 424, new skin.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl hard">BOSS · HARD</span> Google-tier — combine patterns</h3>
          ${drill('sw_h1','LC 76 — Minimum Window Substring','Hardest common window problem. need/have counters. Expect to fail 2–3× — that is normal.')}
          ${drill('sw_h2','LC 239 — Sliding Window Maximum','Window + monotonic deque. Fully cracks after Pattern 9.')}
          ${drill('sw_h3','LC 992 — Subarrays with K Different Integers','"Exactly k" = atMost(k) − atMost(k−1). A mind-bender.')}
        </div>
        <div class="rubric">
          <h3>✅ Readiness self-check — be brutally honest</h3>
          <ul>
            <li>I <b>recognise</b> a sliding window problem from the wording in under 10 seconds.</li>
            <li>I write the variable-window skeleton <b>from memory</b>, no errors.</li>
            <li>I solved LC 3 and LC 209 <b>without hints</b> in under 20 min each.</li>
            <li>I can explain <b>why</b> negatives break sliding window, aloud.</li>
            <li>I attempted LC 76 and understand the need/have idea, even if it took tries.</li>
            <li>I can state & <b>justify</b> complexity ("each element enters and leaves once").</li>
          </ul>
          <div class="verdict">All six → tracker, tick Pattern 01, request Pattern 02. <b>Any unchecked → more reps. Do not move on.</b></div>
        </div>
      </div>
      <footer>Pattern 01 of 26 · Next: Two Pointers · Ask "build Pattern 2 as a module" when your rubric is all-green</footer>`;

    wire(root);
  });

  function drill(id, name, meta){
    return `<div class="prob" data-id="${id}"><span class="pchk" data-drill="${id}">✓</span><div class="pinfo"><div class="pname">${name}</div><div class="pmeta">${meta}</div></div></div>`;
  }

  function wire(root){
    // tabs
    root.querySelectorAll('.tab').forEach(btn=>{
      btn.addEventListener('click',()=>{
        root.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
        root.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        root.querySelector('#pn-'+btn.dataset.t).classList.add('active');
      });
    });
    // drill checkboxes
    const dstate = App.getDrill(N);
    root.querySelectorAll('.pchk').forEach(c=>{
      const id=c.dataset.drill;
      const row=c.closest('.prob');
      if(dstate[id]){ c.classList.add('on'); row.classList.add('checked'); }
      c.addEventListener('click',()=>{
        const d=App.toggleDrill(N,id);
        if(d[id]){c.classList.add('on');row.classList.add('checked');}
        else{c.classList.remove('on');row.classList.remove('checked');}
      });
    });
    initFixed(root); initVar(root); initStr(root);
  }

  /* ---- FIXED ---- */
  function initFixed(root){
    const A=[2,1,5,1,3,2],K=3; let S=-1,sum=0,mx=0,bL=0,done=false;
    const el=id=>root.querySelector(id);
    function render(l,r,bl,br){ el('#f-arr').innerHTML=A.map((v,i)=>{let c='cell';if(bl>=0&&i>=bl&&i<=br)c+=' best';else if(i>=l&&i<=r&&l>=0)c+=' win';if(i===l)c='cell left';if(i===r&&r!==l)c='cell right';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join(''); }
    function reset(){S=-1;sum=0;mx=0;bL=0;done=false;render(-1,-1,-1,-1);el('#f-info').innerHTML='Press <b>Next</b> to build the first window.';el('#f-cur').textContent='—';el('#f-max').textContent='—';el('#f-best').textContent='—';}
    function step(){if(done){reset();return;}S++;if(S===0){sum=A[0]+A[1]+A[2];mx=sum;bL=0;render(0,2,-1,-1);el('#f-info').innerHTML=`First window [0..2]: sum = <b>${sum}</b>`;el('#f-cur').textContent=sum;el('#f-max').textContent=mx;el('#f-best').textContent='[0..2]';return;}const i=S+K-1;if(i>=A.length){done=true;render(-1,-1,bL,bL+K-1);el('#f-info').innerHTML=`Done! Max sum = <b>${mx}</b> at [${bL}..${bL+K-1}]`;return;}const rem=A[i-K],add=A[i];sum+=add-rem;const l=i-K+1;if(sum>mx){mx=sum;bL=l;}render(l,i,-1,-1);el('#f-info').innerHTML=`Add arr[${i}]=${add}, drop arr[${i-K}]=${rem} → sum = <b>${sum}</b>`;el('#f-cur').textContent=sum;el('#f-max').textContent=mx;el('#f-best').textContent=`[${bL}..${bL+K-1}]`;}
    el('#f-next').addEventListener('click',step); el('#f-reset').addEventListener('click',reset); reset();
  }

  /* ---- VARIABLE ---- */
  function initVar(root){
    const A=[2,3,1,2,4,3],T=7; let L=0,R=-1,sum=0,mn=Infinity,done=false;
    const el=id=>root.querySelector(id);
    function render(l,r){ el('#v-arr').innerHTML=A.map((v,i)=>{let c='cell';if(i>=l&&i<=r)c+=' win';if(i===l)c='cell left';if(i===r&&r!==l)c='cell right';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join(''); }
    function reset(){L=0;R=-1;sum=0;mn=Infinity;done=false;render(-1,-1);el('#v-info').innerHTML='Press <b>Next</b> to start expanding.';el('#v-sum').textContent='—';el('#v-min').textContent='—';}
    function step(){if(done){reset();return;}if(sum>=T){const len=R-L+1;if(len<mn)mn=len;el('#v-info').innerHTML=`Sum ${sum} ≥ ${T}: shrink. Drop arr[${L}]=${A[L]}. Length was <b>${len}</b>`;sum-=A[L];L++;render(L,R);el('#v-sum').textContent=sum;el('#v-min').textContent=mn===Infinity?'—':mn;return;}R++;if(R>=A.length){done=true;el('#v-info').innerHTML=`Done! Minimum length = <b>${mn===Infinity?0:mn}</b>`;render(-1,-1);el('#v-min').textContent=mn===Infinity?'0':mn;return;}sum+=A[R];render(L,R);el('#v-info').innerHTML=`Expand: add arr[${R}]=${A[R]} → sum = <b>${sum}</b>`;el('#v-sum').textContent=sum;}
    el('#v-next').addEventListener('click',step); el('#v-reset').addEventListener('click',reset); reset();
  }

  /* ---- STRING ---- */
  function initStr(root){
    const STR=['a','b','c','a','b','b','c']; let L=0,R=-1,map={},mx=0,bL=0,bR=-1,done=false;
    const el=id=>root.querySelector(id);
    function render(l,r,bl,br){ el('#s-arr').innerHTML=STR.map((v,i)=>{let c='cell';if(bl>=0&&i>=bl&&i<=br)c+=' best';else if(i>=l&&i<=r&&l>=0)c+=' win';if(i===l)c='cell left';if(i===r&&r!==l)c='cell right';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join(''); }
    function reset(){L=0;R=-1;map={};mx=0;bL=0;bR=-1;done=false;render(-1,-1,-1,-1);el('#s-info').innerHTML='Press <b>Next</b> to begin scanning.';el('#s-win').textContent='—';el('#s-max').textContent='—';el('#s-map').textContent='—';}
    function step(){if(done){reset();return;}R++;if(R>=STR.length){done=true;render(-1,-1,bL,bR);el('#s-info').innerHTML=`Done! Longest = <b>${mx}</b>`;return;}const ch=STR[R];let msg='';if(map[ch]!==undefined&&map[ch]>=L){msg=`Duplicate '<b>${ch}</b>' → jump left to ${map[ch]+1}. `;L=map[ch]+1;}map[ch]=R;const len=R-L+1;if(len>mx){mx=len;bL=L;bR=R;}msg+=`Window "${STR.slice(L,R+1).join('')}", length <b>${len}</b>`;render(L,R,-1,-1);el('#s-info').innerHTML=msg;el('#s-win').textContent='"'+STR.slice(L,R+1).join('')+'"';el('#s-max').textContent=mx;el('#s-map').textContent=Object.entries(map).map(([k,v])=>k+':'+v).join(' ');}
    el('#s-next').addEventListener('click',step); el('#s-reset').addEventListener('click',reset); reset();
  }
})();
