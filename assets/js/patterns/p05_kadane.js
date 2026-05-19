/* ============================================================
   PATTERN 05 — KADANE'S ALGORITHM
   ============================================================ */
(function(){
  'use strict';
  const N = 5;

  App.registerPattern(N, function(root, meta){
    root.innerHTML = App.topbar(`<a href="#/tracker">← Pattern Tracker</a> &nbsp;/&nbsp; ${meta.phase} · ${meta.phaseTitle}`) + `
      <h1>Pattern 05 — <span class="pat">Kadane's Algorithm</span></h1>
      <div class="tagline">At every element ask one question: is my past a burden or a help? Extend or restart.</div>
      <div class="meta-row">
        <span class="pill e">Difficulty: Easy</span>
        <span class="pill e">ROI: High</span>
        <span class="pill tc">Time: O(n)</span>
        <span class="pill tc">Space: O(1)</span>
      </div>
      <div class="tabs">
        <button class="tab active" data-t="kad">Max Subarray</button>
        <button class="tab" data-t="idx">Track Indices</button>
        <button class="tab" data-t="circ">Circular Array</button>
        <button class="tab" data-t="tmpl">Mental Template</button>
        <button class="tab" data-t="key">Key Takeaways</button>
        <button class="tab" data-t="drill">Drill Set</button>
      </div>

      <div class="panel active" id="pn-kad">
        <div class="sec-title">Maximum subarray sum (LC 53)</div>
        <div class="sec-desc">At each element: extend the running sum, or restart fresh from here. If carrying the past makes it worse, drop it.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>current</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>extending</div>
          <div class="lg"><span class="sw" style="background:var(--cell);border:1px solid var(--hard)"></span>restarted</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>best</div>
        </div>
        <div class="arr" id="k-arr"></div>
        <div class="info" id="k-info">Press <b>Next</b>. At each step ask: extend or restart?</div>
        <div class="stats">
          <div class="stat"><div class="l">Current sum</div><div class="v" id="k-cur">—</div></div>
          <div class="stat"><div class="l">Max sum</div><div class="v" id="k-max">—</div></div>
          <div class="stat"><div class="l">Decision</div><div class="v" id="k-dec" style="font-size:14px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="k-next">Next step</button><button class="act" id="k-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">max_subarray</span>(nums):
    curr_sum = nums[0]
    max_sum  = nums[0]
    <span class="kw">for</span> num <span class="kw">in</span> nums[1:]:
        curr_sum = <span class="fn">max</span>(num, curr_sum + num)  <span class="cm"># extend OR restart</span>
        max_sum  = <span class="fn">max</span>(max_sum, curr_sum)
    <span class="kw">return</span> max_sum
<span class="cm"># If curr_sum was negative, curr_sum+num &lt; num → restart</span></pre>
      </div>

      <div class="panel" id="pn-idx">
        <div class="sec-title">Track the actual subarray indices</div>
        <div class="sec-desc">Same algorithm + 3 variables to record where the best window starts and ends. Interviewers often want the subarray, not just the sum.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>current</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>best window</div>
        </div>
        <div class="arr" id="ix-arr"></div>
        <div class="info" id="ix-info">Press <b>Next</b>. Watch best_start / best_end update on each new max.</div>
        <div class="stats">
          <div class="stat"><div class="l">curr_sum</div><div class="v" id="ix-cur">—</div></div>
          <div class="stat"><div class="l">max_sum</div><div class="v" id="ix-max">—</div></div>
          <div class="stat"><div class="l">Best window</div><div class="v" id="ix-win" style="font-size:14px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="ix-next">Next step</button><button class="act" id="ix-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">max_subarray_indices</span>(nums):
    curr = mx = nums[0]
    start = best_s = best_e = 0
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(1, <span class="fn">len</span>(nums)):
        <span class="kw">if</span> nums[i] &gt; curr + nums[i]:
            curr = nums[i]; start = i      <span class="cm"># restart here</span>
        <span class="kw">else</span>:
            curr += nums[i]
        <span class="kw">if</span> curr &gt; mx:
            mx = curr; best_s = start; best_e = i
    <span class="kw">return</span> nums[best_s : best_e + 1], mx</pre>
      </div>

      <div class="panel" id="pn-circ">
        <div class="sec-title">Maximum circular subarray sum (LC 918)</div>
        <div class="sec-desc">Either the answer doesn't wrap (plain Kadane) or it wraps = total − min subarray. Take the max of both.</div>
        <div class="arr" id="ci-arr"></div>
        <div class="info" id="ci-info">Press <b>Next</b>. We run Kadane twice — for max and for min subarray.</div>
        <div class="stats">
          <div class="stat"><div class="l">Max subarray</div><div class="v" id="ci-mx">—</div></div>
          <div class="stat"><div class="l">Total</div><div class="v" id="ci-tot">—</div></div>
          <div class="stat"><div class="l">Min subarray</div><div class="v" id="ci-mn">—</div></div>
          <div class="stat"><div class="l">Answer</div><div class="v" id="ci-ans">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="ci-next">Next step</button><button class="act" id="ci-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">max_circular</span>(nums):
    mx = cur_mx = nums[0]
    mn = cur_mn = nums[0]
    total = nums[0]
    <span class="kw">for</span> n <span class="kw">in</span> nums[1:]:
        cur_mx = <span class="fn">max</span>(n, cur_mx + n); mx = <span class="fn">max</span>(mx, cur_mx)
        cur_mn = <span class="fn">min</span>(n, cur_mn + n); mn = <span class="fn">min</span>(mn, cur_mn)
        total += n
    <span class="kw">if</span> mx &lt; 0: <span class="kw">return</span> mx          <span class="cm"># all negatives edge case</span>
    <span class="kw">return</span> <span class="fn">max</span>(mx, total - mn)</pre>
      </div>

      <div class="panel" id="pn-tmpl">
        <div class="sec-title">The Kadane's mental template</div>
        <div class="sec-desc">One decision at every step. Three variants cover the whole family.</div>
        <div class="tip"><b>Recognition signal:</b> "maximum/minimum subarray", "contiguous", "best time to buy/sell stock". The DP connection: curr_sum is dp[i] = "best ending at index i".</div>
        <pre><span class="cm"># Core Kadane — max subarray</span>
curr = mx = nums[0]
<span class="kw">for</span> n <span class="kw">in</span> nums[1:]:
    curr = <span class="fn">max</span>(n, curr + n)
    mx   = <span class="fn">max</span>(mx, curr)

<span class="cm"># Min subarray (for circular) — flip max/min</span>
curr = mn = nums[0]
<span class="kw">for</span> n <span class="kw">in</span> nums[1:]:
    curr = <span class="fn">min</span>(n, curr + n)
    mn   = <span class="fn">min</span>(mn, curr)

<span class="cm"># Stock profit (Kadane in disguise — LC 121)</span>
min_price = <span class="fn">float</span>(<span class="st">'inf'</span>); profit = 0
<span class="kw">for</span> p <span class="kw">in</span> prices:
    min_price = <span class="fn">min</span>(min_price, p)
    profit    = <span class="fn">max</span>(profit, p - min_price)</pre>
      </div>

      <div class="panel" id="pn-key">
        <div class="sec-title">Key takeaways — burn these in</div>
        <ul class="keypts">
          <li><b>One question per element:</b> is my past a burden or help? Negative running sum → restart.</li>
          <li><b>The one-line magic:</b> <code>curr = max(num, curr + num)</code> encodes the whole algorithm — no if/else needed.</li>
          <li><b>It IS dynamic programming:</b> dp[i] = max(nums[i], dp[i-1]+nums[i]), reduced to O(1) space. Say this in interviews.</li>
          <li><b>Stock problem is Kadane in disguise:</b> track min price, max (price − min). Same extend/restart logic.</li>
          <li><b>Product variant tracks both max AND min</b> — a negative × negative can flip to the new max (LC 152).</li>
          <li><b>Circular insight:</b> answer = max(plain Kadane, total − min subarray). Edge case: all negatives → return plain max.</li>
        </ul>
      </div>

      <div class="panel" id="pn-drill">
        <div class="sec-title">Drill Set — where mastery actually happens</div>
        <div class="sec-desc">Do them in order. Struggle 20+ min before any hint. Progress saves in this browser.</div>
        <div class="drill-grp">
          <h3><span class="lvl easy">WARM UP · EASY</span> build the reflex</h3>
          ${drill('kd_e1','LC 53 — Maximum Subarray','THE canonical Kadane. Must be automatic and explainable.')}
          ${drill('kd_e2','LC 121 — Best Time to Buy and Sell Stock','Kadane in disguise. See the connection yourself.')}
          ${drill('kd_e3','LC 1store — Maximum Subarray (return the subarray)','Re-solve LC 53 returning indices, not just the sum.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl med">CORE · MEDIUM</span> interview bread-and-butter</h3>
          ${drill('kd_m1','LC 152 — Maximum Product Subarray','Track max AND min. The key Kadane twist.')}
          ${drill('kd_m2','LC 918 — Maximum Sum Circular Subarray','total − min subarray insight + all-negatives edge case.')}
          ${drill('kd_m3','LC 1186 — Maximum Subarray Sum with One Deletion','Kadane with a "skip one" state. Real step-up.')}
          ${drill('kd_m4','LC 978 — Longest Turbulent Subarray','Running-state DP cousin of Kadane.')}
          ${drill('kd_m5','LC 1567 — Max Length of Subarray With Positive Product','Sign-tracking variant of the product idea.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl hard">BOSS · HARD</span> Google-tier</h3>
          ${drill('kd_h1','LC 363 — Max Sum of Rectangle No Larger Than K','Kadane + prefix sum + binary search. Combines Patterns 3 & 5.')}
          ${drill('kd_h2','LC 2products — Maximum Subarray variants set','Solve 3 Kadane variants back-to-back, timed, no notes.')}
          ${drill('kd_h3','LC 53 follow-up — divide & conquer Max Subarray','Implement the O(n log n) D&C version for interview depth.')}
        </div>
        <div class="rubric">
          <h3>✅ Readiness self-check — be brutally honest</h3>
          <ul>
            <li>I write core Kadane from memory in under 2 minutes.</li>
            <li>I can explain why <code>max(num, curr+num)</code> means "extend or restart" aloud.</li>
            <li>I solved LC 152 (product) <b>without hints</b> and know why we track min too.</li>
            <li>I can derive the circular insight (total − min) myself.</li>
            <li>I can state the DP recurrence and why it's O(1) space.</li>
            <li>I see LC 121 as Kadane without being told.</li>
          </ul>
          <div class="verdict">All six → tracker, tick Pattern 05, request Pattern 06. <b>Any unchecked → more reps.</b></div>
        </div>
      </div>
      <footer>Pattern 05 of 26 · Next: Sorting + Intervals</footer>`;
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
    initKad(root); initIdx(root); initCirc(root);
  }

  const NUMS=[-2,1,-3,4,-1,2,1,-5,4];

  function initKad(root){
    let i=0,curr=NUMS[0],mx=NUMS[0],bL=0,done=false,states=new Array(NUMS.length).fill('');
    states[0]='right';
    const el=id=>root.querySelector(id);
    function render(act){el('#k-arr').innerHTML=NUMS.map((v,k)=>{let c='cell';const s=states[k];if(s==='best')c+=' best';else if(s==='right')c+=' right';else if(s==='restart')c+=' restart';if(k===act)c='cell left';return`<div class="${c}" ${states[k]==='restart'?'style="border-color:var(--hard)"':''}><span class="ix">${k}</span>${v}</div>`}).join('');}
    function reset(){i=0;curr=NUMS[0];mx=NUMS[0];bL=0;done=false;states=new Array(NUMS.length).fill('');states[0]='right';render(-1);el('#k-info').innerHTML='Press <b>Next</b>. At each step ask: extend or restart?';el('#k-cur').textContent='—';el('#k-max').textContent='—';el('#k-dec').textContent='—';}
    function step(){if(done){reset();return;}i++;if(i>=NUMS.length){done=true;render(-1);el('#k-info').innerHTML=`Done! Maximum subarray sum = <b>${mx}</b>`;return;}const num=NUMS[i],ext=curr+num,restart=num>ext;if(restart){curr=num;states[i]='restart';el('#k-info').innerHTML=`num=<b>${num}</b>. curr+num=<b>${ext}</b> &lt; num → <b style="color:var(--hard)">Restart!</b> Drop negative history.`;el('#k-dec').textContent='Restart';}else{curr=ext;states[i]='right';el('#k-info').innerHTML=`num=<b>${num}</b>. curr+num=<b>${ext}</b> ≥ num → <b style="color:var(--green)">Extend!</b>`;el('#k-dec').textContent='Extend';}if(curr>mx){mx=curr;states=states.map((s,k)=>k<=i&&s!=='restart'?'best':s);}render(i);el('#k-cur').textContent=curr;el('#k-max').textContent=mx;}
    el('#k-next').addEventListener('click',step);el('#k-reset').addEventListener('click',reset);reset();
  }

  function initIdx(root){
    let i=0,curr=NUMS[0],mx=NUMS[0],start=0,bS=0,bE=0,done=false;
    const el=id=>root.querySelector(id);
    function render(act,bs,be){el('#ix-arr').innerHTML=NUMS.map((v,k)=>{let c='cell';if(k>=bs&&k<=be)c+=' best';if(k===act)c+=' left';return`<div class="${c}"><span class="ix">${k}</span>${v}</div>`}).join('');}
    function reset(){i=0;curr=NUMS[0];mx=NUMS[0];start=0;bS=0;bE=0;done=false;render(-1,0,0);el('#ix-info').innerHTML='Press <b>Next</b>. Watch best_start / best_end update on each new max.';el('#ix-cur').textContent='—';el('#ix-max').textContent='—';el('#ix-win').textContent='—';}
    function step(){if(done){reset();return;}i++;if(i>=NUMS.length){done=true;render(-1,bS,bE);el('#ix-info').innerHTML=`Done! Best subarray indices [${bS}..${bE}] = [${NUMS.slice(bS,bE+1).join(', ')}], sum=<b>${mx}</b>`;return;}const num=NUMS[i];if(num>curr+num){curr=num;start=i;}else{curr+=num;}if(curr>mx){mx=curr;bS=start;bE=i;el('#ix-info').innerHTML=`New max! curr_sum=<b>${curr}</b>. Best window → [${bS}..${bE}].`;}else{el('#ix-info').innerHTML=`curr_sum=<b>${curr}</b>. Not a new max (max=${mx}).`;}render(i,bS,bE);el('#ix-cur').textContent=curr;el('#ix-max').textContent=mx;el('#ix-win').textContent=`[${bS}..${bE}]`;}
    el('#ix-next').addEventListener('click',step);el('#ix-reset').addEventListener('click',reset);reset();
  }

  function initCirc(root){
    const A=[5,-3,5]; const tot=A.reduce((a,b)=>a+b,0);
    let i=0,cMx=A[0],cMn=A[0],mx=A[0],mn=A[0],done=false;
    const el=id=>root.querySelector(id);
    function render(act){el('#ci-arr').innerHTML=A.map((v,k)=>{let c='cell'+(k===act?' left':'');return`<div class="${c}"><span class="ix">${k}</span>${v}</div>`}).join('');}
    function reset(){i=0;cMx=A[0];cMn=A[0];mx=A[0];mn=A[0];done=false;render(0);el('#ci-info').innerHTML='Press <b>Next</b>. We run Kadane twice — for max and for min subarray.';el('#ci-mx').textContent='—';el('#ci-tot').textContent=tot;el('#ci-mn').textContent='—';el('#ci-ans').textContent='—';}
    function step(){if(done){reset();return;}i++;if(i>=A.length){done=true;const circular=tot-mn;const ans=mx<0?mx:Math.max(mx,circular);render(-1);el('#ci-info').innerHTML=`Done! no-wrap max=<b>${mx}</b>, circular=total−min=<b>${tot}−${mn}=${circular}</b>. Answer=<b>${ans}</b>`;el('#ci-ans').textContent=ans;return;}const n=A[i];cMx=Math.max(n,cMx+n);mx=Math.max(mx,cMx);cMn=Math.min(n,cMn+n);mn=Math.min(mn,cMn);render(i);el('#ci-info').innerHTML=`n=<b>${n}</b>. cur_max=<b>${cMx}</b>, cur_min=<b>${cMn}</b>`;el('#ci-mx').textContent=mx;el('#ci-mn').textContent=mn;}
    el('#ci-next').addEventListener('click',step);el('#ci-reset').addEventListener('click',reset);reset();
  }
})();
