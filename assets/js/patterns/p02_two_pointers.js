/* ============================================================
   PATTERN 02 — TWO POINTERS
   ============================================================ */
(function(){
  'use strict';
  const N = 2;

  App.registerPattern(N, function(root, meta){
    root.innerHTML = App.topbar(`<a href="#/tracker">← Pattern Tracker</a> &nbsp;/&nbsp; ${meta.phase} · ${meta.phaseTitle}`) + `
      <h1>Pattern 02 — <span class="pat">Two Pointers</span></h1>
      <div class="tagline">Use the sorted order (or structure) to make one smart decision per step — eliminating a nested loop.</div>
      <div class="meta-row">
        <span class="pill e">Difficulty: Easy</span>
        <span class="pill e">ROI: High</span>
        <span class="pill tc">Time: O(n) / O(n log n)</span>
        <span class="pill tc">Space: O(1)</span>
      </div>
      <div class="tabs">
        <button class="tab active" data-t="ts">Opposite Ends</button>
        <button class="tab" data-t="three">Three Sum</button>
        <button class="tab" data-t="pal">Palindrome</button>
        <button class="tab" data-t="sd">Same Direction</button>
        <button class="tab" data-t="tmpl">Mental Template</button>
        <button class="tab" data-t="key">Key Takeaways</button>
        <button class="tab" data-t="drill">Drill Set</button>
      </div>

      <div class="panel active" id="pn-ts">
        <div class="sec-title">Two Sum on a sorted array</div>
        <div class="sec-desc">target = 9. Left at start, right at end. Sum too big → move right left. Too small → move left right.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>left</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>right</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>found</div>
        </div>
        <div class="arr" id="ts-arr"></div>
        <div class="info" id="ts-info">Press <b>Next</b> to begin. Array is already sorted.</div>
        <div class="stats">
          <div class="stat"><div class="l">arr[L] + arr[R]</div><div class="v" id="ts-sum">—</div></div>
          <div class="stat"><div class="l">Target</div><div class="v">9</div></div>
          <div class="stat"><div class="l">Decision</div><div class="v" id="ts-dec" style="font-size:14px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="ts-next">Next step</button><button class="act" id="ts-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">two_sum_sorted</span>(arr, target):
    left, right = 0, <span class="fn">len</span>(arr) - 1
    <span class="kw">while</span> left &lt; right:
        total = arr[left] + arr[right]
        <span class="kw">if</span> total == target:
            <span class="kw">return</span> [left, right]
        <span class="kw">elif</span> total &lt; target:
            left += 1            <span class="cm"># need bigger</span>
        <span class="kw">else</span>:
            right -= 1           <span class="cm"># need smaller</span>
    <span class="kw">return</span> []</pre>
      </div>

      <div class="panel" id="pn-three">
        <div class="sec-title">Three Sum — triplets that sum to 0</div>
        <div class="sec-desc">Fix one element with an outer loop, run opposite-end two pointers on the rest. Sort first.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>fixed</div>
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>left</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>right</div>
        </div>
        <div class="arr" id="th-arr"></div>
        <div class="info" id="th-info">Press <b>Next</b>. Outer loop fixes one number; two pointers scan the rest.</div>
        <div class="stats">
          <div class="stat"><div class="l">Fixed</div><div class="v" id="th-fix">—</div></div>
          <div class="stat"><div class="l">Sum</div><div class="v" id="th-sum">—</div></div>
          <div class="stat"><div class="l">Triplets</div><div class="v" id="th-cnt">0</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="th-next">Next step</button><button class="act" id="th-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">three_sum</span>(arr):
    arr.<span class="fn">sort</span>()
    res = []
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(arr) - 2):
        <span class="kw">if</span> i &gt; 0 <span class="kw">and</span> arr[i] == arr[i-1]:
            <span class="kw">continue</span>             <span class="cm"># skip dup fixed</span>
        left, right = i + 1, <span class="fn">len</span>(arr) - 1
        <span class="kw">while</span> left &lt; right:
            t = arr[i] + arr[left] + arr[right]
            <span class="kw">if</span> t == 0:
                res.<span class="fn">append</span>([arr[i], arr[left], arr[right]])
                left += 1; right -= 1
                <span class="kw">while</span> left &lt; right <span class="kw">and</span> arr[left] == arr[left-1]:
                    left += 1     <span class="cm"># skip dup left</span>
            <span class="kw">elif</span> t &lt; 0: left += 1
            <span class="kw">else</span>: right -= 1
    <span class="kw">return</span> res</pre>
      </div>

      <div class="panel" id="pn-pal">
        <div class="sec-title">Valid palindrome</div>
        <div class="sec-desc">Pointers from both ends move inward, comparing characters. Any mismatch → not a palindrome.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>comparing</div>
        </div>
        <div class="arr" id="pal-arr"></div>
        <div class="info" id="pal-info">Press <b>Next</b> to compare characters from both ends.</div>
        <div class="stats">
          <div class="stat"><div class="l">Comparing</div><div class="v" id="pal-cmp" style="font-size:15px">—</div></div>
          <div class="stat"><div class="l">Match?</div><div class="v" id="pal-m">—</div></div>
          <div class="stat"><div class="l">Result</div><div class="v" id="pal-r" style="font-size:15px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="pal-next">Next step</button><button class="act" id="pal-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">is_palindrome</span>(s):
    s = <span class="st">''</span>.<span class="fn">join</span>(c.<span class="fn">lower</span>() <span class="kw">for</span> c <span class="kw">in</span> s <span class="kw">if</span> c.<span class="fn">isalnum</span>())
    left, right = 0, <span class="fn">len</span>(s) - 1
    <span class="kw">while</span> left &lt; right:
        <span class="kw">if</span> s[left] != s[right]:
            <span class="kw">return</span> <span class="kw">False</span>
        left += 1; right -= 1
    <span class="kw">return</span> <span class="kw">True</span></pre>
      </div>

      <div class="panel" id="pn-sd">
        <div class="sec-title">Remove duplicates from sorted array (in-place)</div>
        <div class="sec-desc">Both pointers move the same direction. Slow = write head. Fast scans ahead for new values.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>slow (write)</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>fast (scan)</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>unique zone</div>
        </div>
        <div class="arr" id="sd-arr"></div>
        <div class="info" id="sd-info">Press <b>Next</b>. Slow marks the write position; fast looks for new uniques.</div>
        <div class="stats">
          <div class="stat"><div class="l">Slow</div><div class="v" id="sd-s">0</div></div>
          <div class="stat"><div class="l">Fast</div><div class="v" id="sd-f">1</div></div>
          <div class="stat"><div class="l">Unique count</div><div class="v" id="sd-c">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="sd-next">Next step</button><button class="act" id="sd-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">remove_duplicates</span>(arr):
    <span class="kw">if</span> <span class="kw">not</span> arr: <span class="kw">return</span> 0
    slow = 0
    <span class="kw">for</span> fast <span class="kw">in</span> <span class="fn">range</span>(1, <span class="fn">len</span>(arr)):
        <span class="kw">if</span> arr[fast] != arr[slow]:
            slow += 1
            arr[slow] = arr[fast]
    <span class="kw">return</span> slow + 1</pre>
      </div>

      <div class="panel" id="pn-tmpl">
        <div class="sec-title">The two pointers decision tree</div>
        <div class="sec-desc">Every two-pointer problem maps to one of three setups.</div>
        <div class="tip"><b>Recognition signal:</b> sorted array + pair/triplet → opposite ends. In-place dedup / fast-slow scan → same direction. Palindrome / symmetry → opposite ends inward.</div>
        <pre><span class="cm"># Setup 1: Opposite ends (sorted, pair search)</span>
left, right = 0, <span class="fn">len</span>(arr) - 1
<span class="kw">while</span> left &lt; right:
    <span class="kw">if</span> ok: <span class="kw">return</span> ans
    <span class="kw">elif</span> need_bigger: left += 1
    <span class="kw">else</span>: right -= 1

<span class="cm"># Setup 2: Same direction (slow + fast, in-place)</span>
slow = 0
<span class="kw">for</span> fast <span class="kw">in</span> <span class="fn">range</span>(1, <span class="fn">len</span>(arr)):
    <span class="kw">if</span> keep(arr[fast]):
        slow += 1; arr[slow] = arr[fast]

<span class="cm"># Setup 3: Two arrays (merge / intersect)</span>
i, j = 0, 0
<span class="kw">while</span> i &lt; <span class="fn">len</span>(a) <span class="kw">and</span> j &lt; <span class="fn">len</span>(b):
    <span class="kw">if</span> a[i] == b[j]: i += 1; j += 1
    <span class="kw">elif</span> a[i] &lt; b[j]: i += 1
    <span class="kw">else</span>: j += 1</pre>
      </div>

      <div class="panel" id="pn-key">
        <div class="sec-title">Key takeaways — burn these in</div>
        <ul class="keypts">
          <li><b>It removes a nested loop.</b> Sorted order lets you decide which pointer to move, turning O(n²) into O(n).</li>
          <li><b>Three setups:</b> opposite ends (sorted pair search), same direction (in-place ops), two arrays (merge/intersect).</li>
          <li><b>Connection to Sliding Window:</b> same left/right idea, but on sorted arrays rather than contiguous subarrays.</li>
          <li><b>Three Sum = Two Pointers inside a loop.</b> The classic interview escalation from Two Sum.</li>
          <li><b>The duplicate-skip step</b> (<code>arr[left] == arr[left-1]</code>) is the #1 bug interviewers watch for in Three Sum.</li>
          <li><b>Sorting cost:</b> if you sort first, state it's O(n log n) overall, not O(n).</li>
        </ul>
      </div>

      <div class="panel" id="pn-drill">
        <div class="sec-title">Drill Set — where mastery actually happens</div>
        <div class="sec-desc">Do them in order. Struggle 20+ min before any hint. Progress saves in this browser.</div>
        <div class="drill-grp">
          <h3><span class="lvl easy">WARM UP · EASY</span> build the reflex</h3>
          ${drill('tp_e1','LC 167 — Two Sum II (Input Array Is Sorted)','The pure opposite-ends template. Must be automatic.')}
          ${drill('tp_e2','LC 125 — Valid Palindrome','Opposite ends inward + char cleaning.')}
          ${drill('tp_e3','LC 26 — Remove Duplicates from Sorted Array','The same-direction slow/fast archetype.')}
          ${drill('tp_e4','LC 283 — Move Zeroes','Same-direction write head. Classic warmup.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl med">CORE · MEDIUM</span> interview bread-and-butter</h3>
          ${drill('tp_m1','LC 15 — 3Sum','Two pointers inside a loop + duplicate skipping. Asked everywhere.')}
          ${drill('tp_m2','LC 11 — Container With Most Water','Greedy opposite-ends. The intuition gem of this pattern.')}
          ${drill('tp_m3','LC 16 — 3Sum Closest','Variation of 3Sum tracking closest, not exact.')}
          ${drill('tp_m4','LC 75 — Sort Colors','Three pointers (Dutch national flag). A real step-up.')}
          ${drill('tp_m5','LC 18 — 4Sum','Two nested loops + two pointers. Generalises 3Sum.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl hard">BOSS · HARD</span> Google-tier</h3>
          ${drill('tp_h1','LC 42 — Trapping Rain Water','Two pointers + running max from both sides. A famous hard.')}
          ${drill('tp_h2','LC 680 — Valid Palindrome II','Opposite ends + one allowed deletion (branch logic).')}
          ${drill('tp_h3','LC 295 — Find Median from Data Stream','Two-heap variant of the two-pointer idea. Stretch goal.')}
        </div>
        <div class="rubric">
          <h3>✅ Readiness self-check — be brutally honest</h3>
          <ul>
            <li>I instantly know which of the 3 setups a problem needs.</li>
            <li>I solved LC 15 (3Sum) <b>without hints</b>, duplicate-skip included.</li>
            <li>I can explain the LC 11 greedy "move the shorter wall" intuition aloud.</li>
            <li>I wrote the same-direction slow/fast skeleton from memory.</li>
            <li>I attempted LC 42 and understand the both-sides max idea.</li>
            <li>I correctly state O(n log n) when a sort is involved.</li>
          </ul>
          <div class="verdict">All six → tracker, tick Pattern 02, request Pattern 03. <b>Any unchecked → more reps.</b></div>
        </div>
      </div>
      <footer>Pattern 02 of 26 · Next: Prefix Sum</footer>`;
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
    initTS(root); initThree(root); initPal(root); initSD(root);
  }

  function initTS(root){
    const A=[1,3,4,5,7,9,11],T=9; let L=0,R=A.length-1,done=false;
    const el=id=>root.querySelector(id);
    function render(l,r,found){el('#ts-arr').innerHTML=A.map((v,i)=>{let c='cell';if(found&&(i===l||i===r))c+=' best';else if(i===l)c='cell left';else if(i===r)c='cell right';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function reset(){L=0;R=A.length-1;done=false;render(-1,-1,false);el('#ts-info').innerHTML='Press <b>Next</b> to begin. Array is already sorted.';el('#ts-sum').textContent='—';el('#ts-dec').textContent='—';}
    function step(){if(done){reset();return;}if(L>=R){done=true;el('#ts-info').innerHTML='No pair found.';return;}const s=A[L]+A[R];el('#ts-sum').textContent=s;if(s===T){render(L,R,true);el('#ts-info').innerHTML=`arr[${L}]+arr[${R}] = <b>${A[L]}+${A[R]}=${s}</b>. Found!`;el('#ts-dec').textContent='Found!';done=true;}else if(s<T){el('#ts-info').innerHTML=`<b>${A[L]}+${A[R]}=${s}</b> &lt; ${T}. Need bigger → L++`;el('#ts-dec').textContent='L++';render(L,R,false);L++;}else{el('#ts-info').innerHTML=`<b>${A[L]}+${A[R]}=${s}</b> &gt; ${T}. Need smaller → R--`;el('#ts-dec').textContent='R--';render(L,R,false);R--;}}
    el('#ts-next').addEventListener('click',step);el('#ts-reset').addEventListener('click',reset);reset();
  }

  function initThree(root){
    const A=[-4,-1,-1,0,1,2]; let i=0,L=1,R=A.length-1,cnt=0,done=false;
    const el=id=>root.querySelector(id);
    function render(fi,l,r){el('#th-arr').innerHTML=A.map((v,k)=>{let c='cell';if(k===fi)c+=' best';else if(k===l)c='cell left';else if(k===r)c='cell right';return`<div class="${c}"><span class="ix">${k}</span>${v}</div>`}).join('');}
    function reset(){i=0;L=1;R=A.length-1;cnt=0;done=false;render(-1,-1,-1);el('#th-info').innerHTML='Press <b>Next</b>. Outer loop fixes one number; two pointers scan the rest.';el('#th-fix').textContent='—';el('#th-sum').textContent='—';el('#th-cnt').textContent='0';}
    function step(){if(done){reset();return;}if(i>=A.length-2){done=true;el('#th-info').innerHTML=`Done! Found <b>${cnt}</b> triplet(s).`;return;}if(L>=R){i++;L=i+1;R=A.length-1;el('#th-info').innerHTML=`Inner scan done. Move outer to index <b>${i}</b> (fix=${A[i]}).`;render(i,L,R);el('#th-fix').textContent=A[i];return;}const s=A[i]+A[L]+A[R];el('#th-fix').textContent=A[i];el('#th-sum').textContent=s;render(i,L,R);if(s===0){cnt++;el('#th-info').innerHTML=`<b>${A[i]}+${A[L]}+${A[R]}=0</b>. Triplet! Move both inward.`;el('#th-cnt').textContent=cnt;L++;R--;}else if(s<0){el('#th-info').innerHTML=`Sum <b>${s}</b> &lt; 0. Need bigger → L++`;L++;}else{el('#th-info').innerHTML=`Sum <b>${s}</b> &gt; 0. Need smaller → R--`;R--;}}
    el('#th-next').addEventListener('click',step);el('#th-reset').addEventListener('click',reset);reset();
  }

  function initPal(root){
    const S='racecar'.split(''); let L=0,R=S.length-1,done=false;
    const el=id=>root.querySelector(id);
    function render(l,r,bad){el('#pal-arr').innerHTML=S.map((v,i)=>{let c='cell';if((i===l||i===r))c+=bad?' right':' best';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function reset(){L=0;R=S.length-1;done=false;render(-1,-1,false);el('#pal-info').innerHTML='Press <b>Next</b> to compare characters from both ends.';el('#pal-cmp').textContent='—';el('#pal-m').textContent='—';el('#pal-r').textContent='—';}
    function step(){if(done){reset();return;}if(L>=R){done=true;el('#pal-info').innerHTML=`Pointers met! All matched → <b>"${S.join('')}" is a palindrome</b>`;el('#pal-r').textContent='Yes!';render(-1,-1,false);return;}const lc=S[L],rc=S[R];el('#pal-cmp').textContent=`'${lc}' vs '${rc}'`;if(lc===rc){el('#pal-info').innerHTML=`s[${L}]='<b>${lc}</b>' == s[${R}]='<b>${rc}</b>'. Match! Move inward.`;el('#pal-m').textContent='Yes';render(L,R,false);L++;R--;}else{el('#pal-info').innerHTML=`s[${L}]='<b>${lc}</b>' != s[${R}]='<b>${rc}</b>'. Mismatch → NOT a palindrome.`;el('#pal-m').textContent='No';render(L,R,true);done=true;el('#pal-r').textContent='No';}}
    el('#pal-next').addEventListener('click',step);el('#pal-reset').addEventListener('click',reset);reset();
  }

  function initSD(root){
    const A=[1,1,2,2,3,4,4,5]; let slow=0,fast=1,done=false,W=[0];
    const el=id=>root.querySelector(id);
    function render(){el('#sd-arr').innerHTML=A.map((v,i)=>{let c='cell';if(W.includes(i))c+=' best';if(i===slow)c='cell left';else if(i===fast)c='cell right';return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function reset(){slow=0;fast=1;done=false;W=[0];render();el('#sd-info').innerHTML='Press <b>Next</b>. Slow marks the write position; fast looks for new uniques.';el('#sd-s').textContent=0;el('#sd-f').textContent=1;el('#sd-c').textContent='—';}
    function step(){if(done){reset();return;}if(fast>=A.length){done=true;el('#sd-info').innerHTML=`Done! <b>${slow+1}</b> unique values: [${A.slice(0,slow+1).join(', ')}]`;el('#sd-c').textContent=slow+1;return;}if(A[fast]!==A[slow]){el('#sd-info').innerHTML=`arr[fast=${fast}]=${A[fast]} is new! Advance slow to ${slow+1}, write it.`;slow++;A[slow]=A[fast];W.push(slow);}else{el('#sd-info').innerHTML=`arr[fast=${fast}]=${A[fast]} == arr[slow=${slow}]=${A[slow]}. Duplicate, skip.`;}fast++;render();el('#sd-s').textContent=slow;el('#sd-f').textContent=fast<A.length?fast:'done';el('#sd-c').textContent=slow+1;}
    el('#sd-next').addEventListener('click',step);el('#sd-reset').addEventListener('click',reset);reset();
  }
})();
