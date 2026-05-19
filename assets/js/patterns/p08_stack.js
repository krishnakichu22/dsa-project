/* ============================================================
   PATTERN 08 — STACK-BASED PROBLEMS
   ============================================================ */
(function(){
  'use strict';
  const N = 8;

  App.registerPattern(N, function(root, meta){
    root.innerHTML = App.topbar(`<a href="#/tracker">← Pattern Tracker</a> &nbsp;/&nbsp; ${meta.phase} · ${meta.phaseTitle}`) + `
      <h1>Pattern 08 — <span class="pat">Stack-based Problems</span></h1>
      <div class="tagline">When the answer depends on the most recent unresolved item, a stack is your memory.</div>
      <div class="meta-row">
        <span class="pill e">Difficulty: Medium</span>
        <span class="pill e">ROI: High</span>
        <span class="pill tc">Time: O(n)</span>
        <span class="pill tc">Space: O(n)</span>
      </div>
      <div class="tabs">
        <button class="tab active" data-t="paren">Valid Parentheses</button>
        <button class="tab" data-t="nge">Next Greater Element</button>
        <button class="tab" data-t="eval">Evaluate RPN</button>
        <button class="tab" data-t="tmpl">Mental Template</button>
        <button class="tab" data-t="key">Key Takeaways</button>
        <button class="tab" data-t="drill">Drill Set</button>
      </div>

      <div class="panel active" id="pn-paren">
        <div class="sec-title">Valid parentheses (LC 20)</div>
        <div class="sec-desc">Push openers. On a closer, the top must be its matching opener — pop it. Empty stack at the end = valid.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>current char</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>pushed</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>matched & popped</div>
        </div>
        <div class="arr" id="pr-arr"></div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:6px">Stack (top = right)</div>
        <div id="pr-stack" style="display:flex;gap:6px;min-height:46px;margin-bottom:14px;align-items:center"></div>
        <div class="info" id="pr-info">Press <b>Next</b>. Scan left to right.</div>
        <div class="stats">
          <div class="stat"><div class="l">Current</div><div class="v" id="pr-c">—</div></div>
          <div class="stat"><div class="l">Stack size</div><div class="v" id="pr-sz">0</div></div>
          <div class="stat"><div class="l">Status</div><div class="v" id="pr-st" style="font-size:14px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="pr-next">Next step</button><button class="act" id="pr-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">is_valid</span>(s):
    stack = []
    pairs = {<span class="st">')'</span>: <span class="st">'('</span>, <span class="st">']'</span>: <span class="st">'['</span>, <span class="st">'}'</span>: <span class="st">'{'</span>}
    <span class="kw">for</span> ch <span class="kw">in</span> s:
        <span class="kw">if</span> ch <span class="kw">in</span> pairs:
            top = stack.<span class="fn">pop</span>() <span class="kw">if</span> stack <span class="kw">else</span> <span class="st">'#'</span>
            <span class="kw">if</span> top != pairs[ch]:
                <span class="kw">return</span> <span class="kw">False</span>
        <span class="kw">else</span>:
            stack.<span class="fn">append</span>(ch)
    <span class="kw">return</span> <span class="kw">not</span> stack</pre>
      </div>

      <div class="panel" id="pn-nge">
        <div class="sec-title">Next greater element (monotonic stack)</div>
        <div class="sec-desc">Keep a stack of indices with decreasing values. A bigger number resolves everything smaller below it.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>current</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>on stack (waiting)</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>answer found</div>
        </div>
        <div class="arr" id="ng-arr"></div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:6px">Stack of indices (top = right)</div>
        <div id="ng-stack" style="display:flex;gap:6px;min-height:46px;margin-bottom:14px;align-items:center"></div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:6px">Result array</div>
        <div class="arr" id="ng-res"></div>
        <div class="info" id="ng-info">Press <b>Next</b>. For each element, pop everything it is greater than.</div>
        <div class="stats">
          <div class="stat"><div class="l">Current</div><div class="v" id="ng-c">—</div></div>
          <div class="stat"><div class="l">Stack</div><div class="v" id="ng-s" style="font-size:13px">[]</div></div>
          <div class="stat"><div class="l">Action</div><div class="v" id="ng-a" style="font-size:13px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="ng-next">Next step</button><button class="act" id="ng-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">next_greater</span>(nums):
    res = [-1] * <span class="fn">len</span>(nums)
    stack = []                       <span class="cm"># holds indices</span>
    <span class="kw">for</span> i, n <span class="kw">in</span> <span class="fn">enumerate</span>(nums):
        <span class="kw">while</span> stack <span class="kw">and</span> nums[stack[-1]] &lt; n:
            res[stack.<span class="fn">pop</span>()] = n   <span class="cm"># n resolves them</span>
        stack.<span class="fn">append</span>(i)
    <span class="kw">return</span> res</pre>
      </div>

      <div class="panel" id="pn-eval">
        <div class="sec-title">Evaluate Reverse Polish Notation (LC 150)</div>
        <div class="sec-desc">Push numbers. On an operator, pop two operands, apply, push the result. One value left at the end = answer.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>current token</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>pushed value</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>computed result</div>
        </div>
        <div class="arr" id="ev-arr"></div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:6px">Stack (top = right)</div>
        <div id="ev-stack" style="display:flex;gap:6px;min-height:46px;margin-bottom:14px;align-items:center"></div>
        <div class="info" id="ev-info">Press <b>Next</b>. Tokens: 2 1 + 3 *</div>
        <div class="stats">
          <div class="stat"><div class="l">Token</div><div class="v" id="ev-t">—</div></div>
          <div class="stat"><div class="l">Stack</div><div class="v" id="ev-s" style="font-size:14px">[]</div></div>
          <div class="stat"><div class="l">Result</div><div class="v" id="ev-r">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="ev-next">Next step</button><button class="act" id="ev-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">eval_rpn</span>(tokens):
    stack = []
    ops = {<span class="st">'+'</span>, <span class="st">'-'</span>, <span class="st">'*'</span>, <span class="st">'/'</span>}
    <span class="kw">for</span> t <span class="kw">in</span> tokens:
        <span class="kw">if</span> t <span class="kw">in</span> ops:
            b = stack.<span class="fn">pop</span>(); a = stack.<span class="fn">pop</span>()
            <span class="kw">if</span> t == <span class="st">'+'</span>: stack.<span class="fn">append</span>(a + b)
            <span class="kw">elif</span> t == <span class="st">'-'</span>: stack.<span class="fn">append</span>(a - b)
            <span class="kw">elif</span> t == <span class="st">'*'</span>: stack.<span class="fn">append</span>(a * b)
            <span class="kw">else</span>: stack.<span class="fn">append</span>(<span class="fn">int</span>(a / b))
        <span class="kw">else</span>:
            stack.<span class="fn">append</span>(<span class="fn">int</span>(t))
    <span class="kw">return</span> stack[0]</pre>
      </div>

      <div class="panel" id="pn-tmpl">
        <div class="sec-title">The stack mental template</div>
        <div class="sec-desc">Three recurring shapes. The monotonic stack is the highest-value interview tool here.</div>
        <div class="tip"><b>Recognition signal:</b> "matching/nesting" (brackets, tags) · "next/previous greater or smaller" · "evaluate expression" · "you only ever care about the most recent unresolved item" → stack.</div>
        <pre><span class="cm"># Shape 1: Matching / nesting</span>
stack = []
<span class="kw">for</span> ch <span class="kw">in</span> s:
    <span class="kw">if</span> opener: stack.<span class="fn">append</span>(ch)
    <span class="kw">else</span>:
        <span class="kw">if</span> <span class="kw">not</span> stack <span class="kw">or</span> stack.<span class="fn">pop</span>() != match: <span class="kw">return</span> <span class="kw">False</span>
<span class="kw">return</span> <span class="kw">not</span> stack

<span class="cm"># Shape 2: Monotonic stack (next greater/smaller)</span>
stack = []                  <span class="cm"># indices, values decreasing</span>
<span class="kw">for</span> i, n <span class="kw">in</span> <span class="fn">enumerate</span>(nums):
    <span class="kw">while</span> stack <span class="kw">and</span> nums[stack[-1]] &lt; n:
        res[stack.<span class="fn">pop</span>()] = n
    stack.<span class="fn">append</span>(i)

<span class="cm"># Shape 3: Expression evaluation</span>
<span class="kw">for</span> t <span class="kw">in</span> tokens:
    <span class="kw">if</span> operator:
        b, a = stack.<span class="fn">pop</span>(), stack.<span class="fn">pop</span>()
        stack.<span class="fn">append</span>(<span class="fn">apply</span>(a, t, b))
    <span class="kw">else</span>:
        stack.<span class="fn">append</span>(value)</pre>
      </div>

      <div class="panel" id="pn-key">
        <div class="sec-title">Key takeaways — burn these in</div>
        <ul class="keypts">
          <li><b>Stack = "most recent unresolved thing".</b> If a problem keeps referring back to the latest open item, it's a stack.</li>
          <li><b>Monotonic stack is the money pattern.</b> "Next/previous greater or smaller" → keep the stack sorted, pop on violation. O(n) total.</li>
          <li><b>Store indices, not values</b>, in monotonic stacks when you need distances or positions (e.g. daily temperatures).</li>
          <li><b>Each element is pushed and popped at most once</b> → the inner while loop is still O(n) overall, not O(n²). Say this aloud.</li>
          <li><b>Empty-stack guard:</b> always handle popping from an empty stack (invalid input) — a classic interview edge case.</li>
          <li><b>RPN / expression problems</b> are just push-operands / pop-and-apply-on-operator.</li>
        </ul>
      </div>

      <div class="panel" id="pn-drill">
        <div class="sec-title">Drill Set — where mastery actually happens</div>
        <div class="sec-desc">Do them in order. Struggle 20+ min before any hint. Progress saves in this browser.</div>
        <div class="drill-grp">
          <h3><span class="lvl easy">WARM UP · EASY</span> build the reflex</h3>
          ${drill('st_e1','LC 20 — Valid Parentheses','THE canonical matching-stack. Must be automatic.')}
          ${drill('st_e2','LC 155 — Min Stack','Stack design with O(1) min. Common warmup.')}
          ${drill('st_e3','LC 150 — Evaluate Reverse Polish Notation','Push operands, pop-and-apply on operators.')}
          ${drill('st_e4','LC 682 — Baseball Game','Simple stack simulation. Cements the mental model.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl med">CORE · MEDIUM</span> interview bread-and-butter</h3>
          ${drill('st_m1','LC 739 — Daily Temperatures','THE monotonic stack intro. Store indices for distances.')}
          ${drill('st_m2','LC 496 — Next Greater Element I','Monotonic stack + hashmap lookup.')}
          ${drill('st_m3','LC 853 — Car Fleet','Sort + stack of arrival times. Clever.')}
          ${drill('st_m4','LC 394 — Decode String','Nested stack (two stacks: counts + strings).')}
          ${drill('st_m5','LC 71 — Simplify Path','Stack of path components. Very common.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl hard">BOSS · HARD</span> Google-tier</h3>
          ${drill('st_h1','LC 84 — Largest Rectangle in Histogram','The famous monotonic-stack hard. A rite of passage.')}
          ${drill('st_h2','LC 85 — Maximal Rectangle','LC 84 applied row by row. Combines patterns.')}
          ${drill('st_h3','LC 224 — Basic Calculator','Stack handling of parentheses + signs. Tricky edges.')}
        </div>
        <div class="rubric">
          <h3>✅ Readiness self-check — be brutally honest</h3>
          <ul>
            <li>I instantly reach for a stack when I see "most recent unresolved item".</li>
            <li>I solved LC 20 and LC 739 <b>without hints</b>.</li>
            <li>I can explain why a monotonic stack is O(n) not O(n²) aloud.</li>
            <li>I know when to store indices vs values on the stack.</li>
            <li>I attempted LC 84 and understand the histogram pop logic.</li>
            <li>I always guard against popping an empty stack.</li>
          </ul>
          <div class="verdict">All six → tracker, tick Pattern 08, request Pattern 09. <b>Any unchecked → more reps.</b></div>
        </div>
      </div>
      <footer>Pattern 08 of 26 · Next: Monotonic Stack / Queue</footer>`;
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
    initParen(root); initNGE(root); initEval(root);
  }

  function chip(txt,cls){return `<div class="cell ${cls}" style="min-width:38px;flex:none;height:38px">${txt}</div>`;}

  function initParen(root){
    const S='([{}])'.split(''); const PAIRS={')':'(',']':'[','}':'{'};
    let i=0,stack=[],done=false,bad=false;
    const el=id=>root.querySelector(id);
    function rArr(act,popped){return S.map((v,k)=>{let c='cell';if(k===act)c+=' left';else if(popped!==null&&k===popped)c+=' best';else if(k<act)c+=' right';return`<div class="${c}"><span class="ix">${k}</span>${v}</div>`}).join('');}
    function rStack(){el('#pr-stack').innerHTML=stack.length?stack.map(x=>chip(x,'right')).join(''):'<span style="color:var(--text-3);font-size:12px">(empty)</span>';}
    function reset(){i=0;stack=[];done=false;bad=false;el('#pr-arr').innerHTML=rArr(-1,null);rStack();el('#pr-info').innerHTML='Press <b>Next</b>. Scan left to right.';el('#pr-c').textContent='—';el('#pr-sz').textContent='0';el('#pr-st').textContent='—';}
    function step(){
      if(done){reset();return;}
      if(i>=S.length){done=true;const ok=stack.length===0&&!bad;el('#pr-info').innerHTML=`Done! Stack ${stack.length===0?'empty':'not empty'} → <b>${ok?'VALID':'INVALID'}</b>`;el('#pr-st').textContent=ok?'Valid':'Invalid';el('#pr-arr').innerHTML=rArr(-1,null);return;}
      const ch=S[i];el('#pr-c').textContent=ch;
      if(PAIRS[ch]){const top=stack.length?stack[stack.length-1]:'#';if(top===PAIRS[ch]){stack.pop();el('#pr-info').innerHTML=`'<b>${ch}</b>' is a closer. Top '${top}' matches → pop it.`;el('#pr-arr').innerHTML=rArr(i,i);}else{bad=true;done=true;el('#pr-info').innerHTML=`'<b>${ch}</b>' closer but top is '${top}' → mismatch. INVALID.`;el('#pr-st').textContent='Invalid';el('#pr-arr').innerHTML=rArr(i,null);}}
      else{stack.push(ch);el('#pr-info').innerHTML=`'<b>${ch}</b>' is an opener → push.`;el('#pr-arr').innerHTML=rArr(i,null);}
      rStack();el('#pr-sz').textContent=stack.length;i++;
    }
    el('#pr-next').addEventListener('click',step);el('#pr-reset').addEventListener('click',reset);reset();
  }

  function initNGE(root){
    const A=[2,1,2,4,3], RES=[-1,-1,-1,-1,-1];
    let i=0,stack=[],done=false,res=RES.slice();
    const el=id=>root.querySelector(id);
    function rArr(act){return A.map((v,k)=>{let c='cell';if(k===act)c+=' left';else if(stack.includes(k))c+=' right';return`<div class="${c}"><span class="ix">${k}</span>${v}</div>`}).join('');}
    function rRes(){el('#ng-res').innerHTML=res.map((v,k)=>{let c='cell'+(v!==-1?' best':'');return`<div class="${c}"><span class="ix">${k}</span>${v}</div>`}).join('');}
    function rStack(){el('#ng-stack').innerHTML=stack.length?stack.map(x=>chip('i'+x,'right')).join(''):'<span style="color:var(--text-3);font-size:12px">(empty)</span>';}
    function reset(){i=0;stack=[];done=false;res=RES.slice();el('#ng-arr').innerHTML=rArr(-1);rStack();rRes();el('#ng-info').innerHTML='Press <b>Next</b>. For each element, pop everything it is greater than.';el('#ng-c').textContent='—';el('#ng-s').textContent='[]';el('#ng-a').textContent='—';}
    function step(){
      if(done){reset();return;}
      if(i>=A.length){done=true;el('#ng-info').innerHTML=`Done! Next-greater = [${res.join(', ')}]`;el('#ng-arr').innerHTML=rArr(-1);return;}
      const n=A[i];el('#ng-c').textContent=n;let acted=false;
      if(stack.length&&A[stack[stack.length-1]]<n){const idx=stack.pop();res[idx]=n;el('#ng-info').innerHTML=`A[${i}]=${n} &gt; A[${idx}]=${A[idx]} on stack → resolve: res[${idx}] = <b>${n}</b>`;el('#ng-a').textContent='pop+set';acted=true;}
      else{stack.push(i);el('#ng-info').innerHTML=`A[${i}]=${n}: nothing smaller on top → push index ${i}`;el('#ng-a').textContent='push';i++;}
      if(acted){/* stay on same i to allow more pops */}
      el('#ng-arr').innerHTML=rArr(i<A.length?i:-1);rStack();rRes();el('#ng-s').textContent='['+stack.join(',')+']';
    }
    el('#ng-next').addEventListener('click',step);el('#ng-reset').addEventListener('click',reset);reset();
  }

  function initEval(root){
    const T=['2','1','+','3','*']; const OPS={'+':1,'-':1,'*':1,'/':1};
    let i=0,stack=[],done=false;
    const el=id=>root.querySelector(id);
    function rArr(act){return T.map((v,k)=>{let c='cell';if(k===act)c+=' left';else if(k<act)c+=' right';return`<div class="${c}"><span class="ix">${k}</span>${v}</div>`}).join('');}
    function rStack(hl){el('#ev-stack').innerHTML=stack.length?stack.map((x,k)=>chip(x,hl===k?'best':'right')).join(''):'<span style="color:var(--text-3);font-size:12px">(empty)</span>';}
    function reset(){i=0;stack=[];done=false;el('#ev-arr').innerHTML=rArr(-1);rStack(-1);el('#ev-info').innerHTML='Press <b>Next</b>. Tokens: 2 1 + 3 *';el('#ev-t').textContent='—';el('#ev-s').textContent='[]';el('#ev-r').textContent='—';}
    function step(){
      if(done){reset();return;}
      if(i>=T.length){done=true;el('#ev-info').innerHTML=`Done! Result = <b>${stack[0]}</b>`;el('#ev-r').textContent=stack[0];rStack(0);return;}
      const t=T[i];el('#ev-t').textContent=t;el('#ev-arr').innerHTML=rArr(i);
      if(OPS[t]){const b=stack.pop(),a=stack.pop();let r;if(t==='+')r=a+b;else if(t==='-')r=a-b;else if(t==='*')r=a*b;else r=Math.trunc(a/b);stack.push(r);el('#ev-info').innerHTML=`Operator '<b>${t}</b>': pop ${a} and ${b} → ${a} ${t} ${b} = <b>${r}</b>, push it`;rStack(stack.length-1);}
      else{stack.push(parseInt(t));el('#ev-info').innerHTML=`Number '<b>${t}</b>' → push`;rStack(stack.length-1);}
      el('#ev-s').textContent='['+stack.join(',')+']';i++;
    }
    el('#ev-next').addEventListener('click',step);el('#ev-reset').addEventListener('click',reset);reset();
  }
})();
