/* ============================================================
   PATTERN 07 — BINARY SEARCH ON ARRAYS
   ============================================================ */
(function(){
  'use strict';
  const N = 7;

  App.registerPattern(N, function(root, meta){
    root.innerHTML = App.topbar(`<a href="#/tracker">← Pattern Tracker</a> &nbsp;/&nbsp; ${meta.phase} · ${meta.phaseTitle}`) + `
      <h1>Pattern 07 — <span class="pat">Binary Search on Arrays</span></h1>
      <div class="tagline">Halve the search space every step — not just for sorted arrays, but for any monotonic answer space.</div>
      <div class="meta-row">
        <span class="pill e">Difficulty: Easy</span>
        <span class="pill e">ROI: High</span>
        <span class="pill tc">Time: O(log n)</span>
        <span class="pill tc">Space: O(1)</span>
      </div>
      <div class="tabs">
        <button class="tab active" data-t="basic">Classic Search</button>
        <button class="tab" data-t="rot">Rotated Array</button>
        <button class="tab" data-t="ans">Search on Answer</button>
        <button class="tab" data-t="tmpl">Mental Template</button>
        <button class="tab" data-t="key">Key Takeaways</button>
        <button class="tab" data-t="drill">Drill Set</button>
      </div>

      <div class="panel active" id="pn-basic">
        <div class="sec-title">Classic binary search</div>
        <div class="sec-desc">target = 23. Compare with the midpoint; discard the half that can't contain it. Eliminated cells dim out.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>lo</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>hi</div>
          <div class="lg"><span class="sw" style="background:var(--c-win);border:1px solid var(--win)"></span>mid</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>found</div>
        </div>
        <div class="arr" id="bs-arr"></div>
        <div class="info" id="bs-info">Press <b>Next</b>. Array is sorted; target = 23.</div>
        <div class="stats">
          <div class="stat"><div class="l">lo / hi</div><div class="v" id="bs-lh" style="font-size:15px">—</div></div>
          <div class="stat"><div class="l">mid value</div><div class="v" id="bs-mv">—</div></div>
          <div class="stat"><div class="l">Search space</div><div class="v" id="bs-ss">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="bs-next">Next step</button><button class="act" id="bs-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">binary_search</span>(arr, target):
    lo, hi = 0, <span class="fn">len</span>(arr) - 1
    <span class="kw">while</span> lo &lt;= hi:
        mid = (lo + hi) // 2          <span class="cm"># or lo+(hi-lo)//2</span>
        <span class="kw">if</span> arr[mid] == target:
            <span class="kw">return</span> mid
        <span class="kw">elif</span> arr[mid] &lt; target:
            lo = mid + 1              <span class="cm"># discard left half</span>
        <span class="kw">else</span>:
            hi = mid - 1              <span class="cm"># discard right half</span>
    <span class="kw">return</span> -1</pre>
      </div>

      <div class="panel" id="pn-rot">
        <div class="sec-title">Search in rotated sorted array (LC 33)</div>
        <div class="sec-desc">target = 0. One half of mid is always sorted. Check which, decide if target lies in it, then discard the other half.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>lo</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>hi</div>
          <div class="lg"><span class="sw" style="background:var(--c-win);border:1px solid var(--win)"></span>mid</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>found</div>
        </div>
        <div class="arr" id="rt-arr"></div>
        <div class="info" id="rt-info">Press <b>Next</b>. Rotated array; target = 0.</div>
        <div class="stats">
          <div class="stat"><div class="l">lo / hi</div><div class="v" id="rt-lh" style="font-size:15px">—</div></div>
          <div class="stat"><div class="l">mid value</div><div class="v" id="rt-mv">—</div></div>
          <div class="stat"><div class="l">Sorted half</div><div class="v" id="rt-sh" style="font-size:13px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="rt-next">Next step</button><button class="act" id="rt-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">search_rotated</span>(arr, target):
    lo, hi = 0, <span class="fn">len</span>(arr) - 1
    <span class="kw">while</span> lo &lt;= hi:
        mid = (lo + hi) // 2
        <span class="kw">if</span> arr[mid] == target: <span class="kw">return</span> mid
        <span class="kw">if</span> arr[lo] &lt;= arr[mid]:           <span class="cm"># left half sorted</span>
            <span class="kw">if</span> arr[lo] &lt;= target &lt; arr[mid]:
                hi = mid - 1
            <span class="kw">else</span>:
                lo = mid + 1
        <span class="kw">else</span>:                            <span class="cm"># right half sorted</span>
            <span class="kw">if</span> arr[mid] &lt; target &lt;= arr[hi]:
                lo = mid + 1
            <span class="kw">else</span>:
                hi = mid - 1
    <span class="kw">return</span> -1</pre>
      </div>

      <div class="panel" id="pn-ans">
        <div class="sec-title">Binary search on the answer (Koko eating bananas, LC 875)</div>
        <div class="sec-desc">Speed isn't in an array — but the answer space [1..max] is monotonic: if speed k works, so does k+1. Binary search the speed.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>lo speed</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>hi speed</div>
          <div class="lg"><span class="sw" style="background:var(--c-win);border:1px solid var(--win)"></span>mid speed</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>answer</div>
        </div>
        <div class="arr" id="ko-arr"></div>
        <div class="info" id="ko-info">Press <b>Next</b>. Piles=[3,6,7,11], h=8. Find minimum eating speed.</div>
        <div class="stats">
          <div class="stat"><div class="l">Speed range</div><div class="v" id="ko-rg" style="font-size:14px">—</div></div>
          <div class="stat"><div class="l">Try speed</div><div class="v" id="ko-mid">—</div></div>
          <div class="stat"><div class="l">Hours needed</div><div class="v" id="ko-hr" style="font-size:14px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="ko-next">Next step</button><button class="act" id="ko-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">min_eating_speed</span>(piles, h):
    <span class="kw">def</span> <span class="fn">hours</span>(k):
        <span class="kw">return</span> <span class="fn">sum</span>((p + k - 1) // k <span class="kw">for</span> p <span class="kw">in</span> piles)
    lo, hi = 1, <span class="fn">max</span>(piles)
    <span class="kw">while</span> lo &lt; hi:
        mid = (lo + hi) // 2
        <span class="kw">if</span> <span class="fn">hours</span>(mid) &lt;= h:
            hi = mid          <span class="cm"># mid works, try slower</span>
        <span class="kw">else</span>:
            lo = mid + 1      <span class="cm"># too slow, speed up</span>
    <span class="kw">return</span> lo</pre>
      </div>

      <div class="panel" id="pn-tmpl">
        <div class="sec-title">The binary search mental template</div>
        <div class="sec-desc">Two templates. The "lo &lt; hi, return lo" form is the safest for "find the boundary" problems.</div>
        <div class="tip"><b>Recognition signal:</b> sorted array · "find min/max such that…" · "minimize the maximum" · O(log n) demanded · answer space is monotone. If "if X works, X+1 works", binary-search the answer.</div>
        <pre><span class="cm"># Template A: exact match</span>
lo, hi = 0, <span class="fn">len</span>(a) - 1
<span class="kw">while</span> lo &lt;= hi:
    mid = (lo + hi) // 2
    <span class="kw">if</span> a[mid] == t: <span class="kw">return</span> mid
    <span class="kw">elif</span> a[mid] &lt; t: lo = mid + 1
    <span class="kw">else</span>: hi = mid - 1
<span class="kw">return</span> -1

<span class="cm"># Template B: find leftmost valid (boundary) — PREFER THIS</span>
lo, hi = 0, <span class="fn">len</span>(a)            <span class="cm"># note: hi = len, not len-1</span>
<span class="kw">while</span> lo &lt; hi:
    mid = (lo + hi) // 2
    <span class="kw">if</span> <span class="fn">condition</span>(mid):
        hi = mid                <span class="cm"># keep mid, search left</span>
    <span class="kw">else</span>:
        lo = mid + 1
<span class="kw">return</span> lo                       <span class="cm"># first index where condition is True</span>

<span class="cm"># Search on answer: replace a[mid] with feasible(mid)</span></pre>
      </div>

      <div class="panel" id="pn-key">
        <div class="sec-title">Key takeaways — burn these in</div>
        <ul class="keypts">
          <li><b>It's not just for sorted arrays.</b> If the answer space is monotone ("if k works, k+1 works"), binary-search the answer.</li>
          <li><b>Use <code>lo + (hi - lo) // 2</code></b> instead of <code>(lo+hi)//2</code> to avoid integer overflow in other languages (good habit, mentioned in interviews).</li>
          <li><b>Pick ONE template and master it.</b> The <code>lo &lt; hi</code> / <code>return lo</code> boundary form handles "leftmost/min that works" cleanly — fewer off-by-one bugs.</li>
          <li><b>Loop invariant is everything.</b> Be crystal clear what <code>lo</code> and <code>hi</code> mean and whether the range is inclusive — most bugs are here.</li>
          <li><b>Rotated array trick:</b> one side of mid is always sorted. Identify it, test if target is inside it, discard the other half.</li>
          <li><b>"Minimize the maximum / maximize the minimum"</b> is almost always binary-search-on-answer (ship capacity, Koko, splitting arrays).</li>
        </ul>
      </div>

      <div class="panel" id="pn-drill">
        <div class="sec-title">Drill Set — where mastery actually happens</div>
        <div class="sec-desc">Do them in order. Struggle 20+ min before any hint. Progress saves in this browser.</div>
        <div class="drill-grp">
          <h3><span class="lvl easy">WARM UP · EASY</span> build the reflex</h3>
          ${drill('bn_e1','LC 704 — Binary Search','The pure template. Must be bug-free from memory.')}
          ${drill('bn_e2','LC 35 — Search Insert Position','Boundary template — find leftmost valid index.')}
          ${drill('bn_e3','LC 278 — First Bad Version','Classic "search on answer" intro. Same as Template B.')}
          ${drill('bn_e4','LC 374 — Guess Number Higher or Lower','Cements the discard-a-half reflex.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl med">CORE · MEDIUM</span> interview bread-and-butter</h3>
          ${drill('bn_m1','LC 33 — Search in Rotated Sorted Array','THE rotated-array problem. Asked everywhere.')}
          ${drill('bn_m2','LC 153 — Find Minimum in Rotated Sorted Array','Find the pivot with binary search.')}
          ${drill('bn_m3','LC 74 — Search a 2D Matrix','Treat the matrix as one flattened sorted array.')}
          ${drill('bn_m4','LC 875 — Koko Eating Bananas','Canonical binary-search-on-answer. Master this idea.')}
          ${drill('bn_m5','LC 162 — Find Peak Element','Binary search without a sorted array — slope logic.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl hard">BOSS · HARD</span> Google-tier</h3>
          ${drill('bn_h1','LC 4 — Median of Two Sorted Arrays','The famous O(log(m+n)) partition search. A rite of passage.')}
          ${drill('bn_h2','LC 410 — Split Array Largest Sum','Minimize-the-maximum via binary search on answer.')}
          ${drill('bn_h3','LC 1011 — Capacity To Ship Packages Within D Days','Same family as 410/875. Solve all three back-to-back.')}
        </div>
        <div class="rubric">
          <h3>✅ Readiness self-check — be brutally honest</h3>
          <ul>
            <li>I write bug-free binary search from memory, both templates.</li>
            <li>I solved LC 33 (rotated) <b>without hints</b> and can explain the sorted-half logic aloud.</li>
            <li>I recognise "minimize the maximum" as binary-search-on-answer instantly.</li>
            <li>I solved LC 875 (Koko) and understand the feasible(mid) idea.</li>
            <li>I can state my loop invariant precisely (what lo/hi mean, inclusive?).</li>
            <li>I attempted LC 4 and understand the partition intuition.</li>
          </ul>
          <div class="verdict">All six → tracker, tick Pattern 07, request Pattern 08. <b>Any unchecked → more reps.</b></div>
        </div>
      </div>
      <footer>Pattern 07 of 26 · Next: Stack-based Problems</footer>`;
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
    initBasic(root); initRot(root); initKoko(root);
  }

  function initBasic(root){
    const A=[2,5,8,12,16,23,38,56,72,91],T=23;
    let lo=0,hi=A.length-1,done=false,foundAt=-1;
    const el=id=>root.querySelector(id);
    function render(mid){el('#bs-arr').innerHTML=A.map((v,i)=>{let c='cell';if(i===foundAt)c+=' best';else if(i<lo||i>hi){c+='';}else if(i===mid)c+=' win';else if(i===lo)c+=' left';else if(i===hi)c+=' right';const dim=(i<lo||i>hi)&&foundAt<0?'opacity:.28':'';return`<div class="${c}" style="${dim}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function reset(){lo=0;hi=A.length-1;done=false;foundAt=-1;render(-1);el('#bs-info').innerHTML='Press <b>Next</b>. Array is sorted; target = 23.';el('#bs-lh').textContent='—';el('#bs-mv').textContent='—';el('#bs-ss').textContent='—';}
    function step(){
      if(done){reset();return;}
      if(lo>hi){done=true;el('#bs-info').innerHTML='Not found. Return −1.';return;}
      const mid=(lo+hi)>>1;render(mid);
      el('#bs-lh').textContent=`${lo} / ${hi}`;el('#bs-mv').textContent=A[mid];el('#bs-ss').textContent=`${hi-lo+1} left`;
      if(A[mid]===T){foundAt=mid;done=true;render(mid);el('#bs-info').innerHTML=`arr[${mid}] = <b>${A[mid]}</b> == target. Found at index <b>${mid}</b>!`;}
      else if(A[mid]<T){el('#bs-info').innerHTML=`arr[${mid}]=${A[mid]} &lt; 23 → discard left half, lo = ${mid+1}`;lo=mid+1;}
      else{el('#bs-info').innerHTML=`arr[${mid}]=${A[mid]} &gt; 23 → discard right half, hi = ${mid-1}`;hi=mid-1;}
    }
    el('#bs-next').addEventListener('click',step);el('#bs-reset').addEventListener('click',reset);reset();
  }

  function initRot(root){
    const A=[4,5,6,7,0,1,2],T=0;
    let lo=0,hi=A.length-1,done=false,foundAt=-1;
    const el=id=>root.querySelector(id);
    function render(mid){el('#rt-arr').innerHTML=A.map((v,i)=>{let c='cell';if(i===foundAt)c+=' best';else if(i===mid)c+=' win';else if(i===lo)c+=' left';else if(i===hi)c+=' right';const dim=(i<lo||i>hi)&&foundAt<0?'opacity:.28':'';return`<div class="${c}" style="${dim}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function reset(){lo=0;hi=A.length-1;done=false;foundAt=-1;render(-1);el('#rt-info').innerHTML='Press <b>Next</b>. Rotated array; target = 0.';el('#rt-lh').textContent='—';el('#rt-mv').textContent='—';el('#rt-sh').textContent='—';}
    function step(){
      if(done){reset();return;}
      if(lo>hi){done=true;el('#rt-info').innerHTML='Not found. Return −1.';return;}
      const mid=(lo+hi)>>1;render(mid);
      el('#rt-lh').textContent=`${lo} / ${hi}`;el('#rt-mv').textContent=A[mid];
      if(A[mid]===T){foundAt=mid;done=true;render(mid);el('#rt-info').innerHTML=`arr[${mid}] = <b>${A[mid]}</b> == target. Found at index <b>${mid}</b>!`;el('#rt-sh').textContent='—';return;}
      if(A[lo]<=A[mid]){el('#rt-sh').textContent='left';
        if(A[lo]<=T&&T<A[mid]){el('#rt-info').innerHTML=`Left half [${A[lo]}..${A[mid]}] is sorted & contains 0 → search left. hi=${mid-1}`;hi=mid-1;}
        else{el('#rt-info').innerHTML=`Left half sorted but 0 not in it → search right. lo=${mid+1}`;lo=mid+1;}
      }else{el('#rt-sh').textContent='right';
        if(A[mid]<T&&T<=A[hi]){el('#rt-info').innerHTML=`Right half [${A[mid]}..${A[hi]}] is sorted & contains 0 → search right. lo=${mid+1}`;lo=mid+1;}
        else{el('#rt-info').innerHTML=`Right half sorted but 0 not in it → search left. hi=${mid-1}`;hi=mid-1;}
      }
    }
    el('#rt-next').addEventListener('click',step);el('#rt-reset').addEventListener('click',reset);reset();
  }

  function initKoko(root){
    const PILES=[3,6,7,11],H=8,MAXP=11;
    let lo=1,hi=MAXP,done=false,ans=-1;
    const el=id=>root.querySelector(id);
    function hours(k){return PILES.reduce((a,p)=>a+Math.ceil(p/k),0);}
    function render(mid){let cells='';for(let k=1;k<=MAXP;k++){let c='cell';if(k===ans)c+=' best';else if(k===mid)c+=' win';else if(k===lo)c+=' left';else if(k===hi)c+=' right';const dim=(k<lo||k>hi)&&ans<0?'opacity:.28':'';cells+=`<div class="${c}" style="${dim}"><span class="ix">${k}</span>${k}</div>`;}el('#ko-arr').innerHTML=cells;}
    function reset(){lo=1;hi=MAXP;done=false;ans=-1;render(-1);el('#ko-info').innerHTML='Press <b>Next</b>. Piles=[3,6,7,11], h=8. Find minimum eating speed.';el('#ko-rg').textContent='—';el('#ko-mid').textContent='—';el('#ko-hr').textContent='—';}
    function step(){
      if(done){reset();return;}
      if(lo>=hi){done=true;ans=lo;render(lo);el('#ko-info').innerHTML=`Converged! Minimum eating speed = <b>${lo}</b> bananas/hour.`;el('#ko-rg').textContent=`${lo}`;return;}
      const mid=(lo+hi)>>1;const h=hours(mid);render(mid);
      el('#ko-rg').textContent=`[${lo}..${hi}]`;el('#ko-mid').textContent=mid;el('#ko-hr').textContent=`${h} (limit ${H})`;
      if(h<=H){el('#ko-info').innerHTML=`Speed ${mid} → ${h} hrs ≤ ${H}. Works! Try slower: hi=${mid}`;hi=mid;}
      else{el('#ko-info').innerHTML=`Speed ${mid} → ${h} hrs &gt; ${H}. Too slow! Speed up: lo=${mid+1}`;lo=mid+1;}
    }
    el('#ko-next').addEventListener('click',step);el('#ko-reset').addEventListener('click',reset);reset();
  }
})();
