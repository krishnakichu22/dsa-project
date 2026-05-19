/* ============================================================
   PATTERN 06 — SORTING + INTERVALS
   ============================================================ */
(function(){
  'use strict';
  const N = 6;

  App.registerPattern(N, function(root, meta){
    root.innerHTML = App.topbar(`<a href="#/tracker">← Pattern Tracker</a> &nbsp;/&nbsp; ${meta.phase} · ${meta.phaseTitle}`) + `
      <h1>Pattern 06 — <span class="pat">Sorting + Intervals</span></h1>
      <div class="tagline">Sort by start time, then one linear scan resolves overlaps, merges, and conflicts.</div>
      <div class="meta-row">
        <span class="pill e">Difficulty: Easy</span>
        <span class="pill e">ROI: High</span>
        <span class="pill tc">Time: O(n log n)</span>
        <span class="pill tc">Space: O(n)</span>
      </div>
      <div class="tabs">
        <button class="tab active" data-t="merge">Merge Intervals</button>
        <button class="tab" data-t="insert">Insert Interval</button>
        <button class="tab" data-t="rooms">Meeting Rooms</button>
        <button class="tab" data-t="tmpl">Mental Template</button>
        <button class="tab" data-t="key">Key Takeaways</button>
        <button class="tab" data-t="drill">Drill Set</button>
      </div>

      <div class="panel active" id="pn-merge">
        <div class="sec-title">Merge overlapping intervals (LC 56)</div>
        <div class="sec-desc">Sort by start. Walk through: if the current interval overlaps the last merged one, extend it; else append a new block.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>current</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>overlap → merge</div>
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>finalized</div>
        </div>
        <div id="mg-track" style="margin:18px 0"></div>
        <div class="info" id="mg-info">Press <b>Next</b>. Intervals are sorted by start time.</div>
        <div class="stats">
          <div class="stat"><div class="l">Current</div><div class="v" id="mg-cur" style="font-size:14px">—</div></div>
          <div class="stat"><div class="l">Last merged</div><div class="v" id="mg-last" style="font-size:14px">—</div></div>
          <div class="stat"><div class="l">Result count</div><div class="v" id="mg-cnt">0</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="mg-next">Next step</button><button class="act" id="mg-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">merge</span>(intervals):
    intervals.<span class="fn">sort</span>(key=<span class="kw">lambda</span> x: x[0])   <span class="cm"># sort by start</span>
    merged = [intervals[0]]
    <span class="kw">for</span> start, end <span class="kw">in</span> intervals[1:]:
        <span class="kw">if</span> start &lt;= merged[-1][1]:        <span class="cm"># overlap</span>
            merged[-1][1] = <span class="fn">max</span>(merged[-1][1], end)
        <span class="kw">else</span>:
            merged.<span class="fn">append</span>([start, end])    <span class="cm"># no overlap</span>
    <span class="kw">return</span> merged</pre>
      </div>

      <div class="panel" id="pn-insert">
        <div class="sec-title">Insert interval into a sorted list (LC 57)</div>
        <div class="sec-desc">Three phases: add all intervals ending before the new one, merge all that overlap it, then add the rest.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-best);border:1px solid var(--best)"></span>added as-is</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>merging with new</div>
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>the new interval</div>
        </div>
        <div id="in-track" style="margin:18px 0"></div>
        <div class="info" id="in-info">Press <b>Next</b>. New interval to insert: [4, 8].</div>
        <div class="stats">
          <div class="stat"><div class="l">Phase</div><div class="v" id="in-ph" style="font-size:14px">Before</div></div>
          <div class="stat"><div class="l">New (evolving)</div><div class="v" id="in-new" style="font-size:14px">[4, 8]</div></div>
          <div class="stat"><div class="l">Result count</div><div class="v" id="in-cnt">0</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="in-next">Next step</button><button class="act" id="in-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">insert</span>(intervals, new):
    res = []; i = 0; n = <span class="fn">len</span>(intervals)
    <span class="kw">while</span> i &lt; n <span class="kw">and</span> intervals[i][1] &lt; new[0]:
        res.<span class="fn">append</span>(intervals[i]); i += 1     <span class="cm"># before</span>
    <span class="kw">while</span> i &lt; n <span class="kw">and</span> intervals[i][0] &lt;= new[1]:
        new[0] = <span class="fn">min</span>(new[0], intervals[i][0])
        new[1] = <span class="fn">max</span>(new[1], intervals[i][1]); i += 1  <span class="cm"># merge</span>
    res.<span class="fn">append</span>(new)
    <span class="kw">while</span> i &lt; n:
        res.<span class="fn">append</span>(intervals[i]); i += 1     <span class="cm"># after</span>
    <span class="kw">return</span> res</pre>
      </div>

      <div class="panel" id="pn-rooms">
        <div class="sec-title">Meeting rooms II — min rooms needed (LC 253)</div>
        <div class="sec-desc">Sort starts and ends separately. Two pointers sweep time: a start before the next end needs a new room; otherwise a room frees up.</div>
        <div class="legend">
          <div class="lg"><span class="sw" style="background:var(--c-left);border:1px solid var(--left)"></span>start pointer</div>
          <div class="lg"><span class="sw" style="background:var(--c-right);border:1px solid var(--right)"></span>end pointer</div>
        </div>
        <div style="font-size:12px;color:var(--text-3);margin-bottom:4px">Sorted start times</div>
        <div class="arr" id="rm-s"></div>
        <div style="font-size:12px;color:var(--text-3);margin:8px 0 4px">Sorted end times</div>
        <div class="arr" id="rm-e"></div>
        <div class="info" id="rm-info">Press <b>Next</b>. Sweep the timeline; track rooms in use.</div>
        <div class="stats">
          <div class="stat"><div class="l">Rooms in use</div><div class="v" id="rm-use">0</div></div>
          <div class="stat"><div class="l">Max rooms</div><div class="v" id="rm-max">0</div></div>
          <div class="stat"><div class="l">Action</div><div class="v" id="rm-act" style="font-size:13px">—</div></div>
        </div>
        <div class="ctrls"><button class="act primary" id="rm-next">Next step</button><button class="act" id="rm-reset">Reset</button></div>
        <pre><span class="kw">def</span> <span class="fn">min_meeting_rooms</span>(intervals):
    starts = <span class="fn">sorted</span>(i[0] <span class="kw">for</span> i <span class="kw">in</span> intervals)
    ends   = <span class="fn">sorted</span>(i[1] <span class="kw">for</span> i <span class="kw">in</span> intervals)
    rooms = mx = 0; s = e = 0
    <span class="kw">while</span> s &lt; <span class="fn">len</span>(starts):
        <span class="kw">if</span> starts[s] &lt; ends[e]:
            rooms += 1; s += 1          <span class="cm"># need a room</span>
            mx = <span class="fn">max</span>(mx, rooms)
        <span class="kw">else</span>:
            rooms -= 1; e += 1          <span class="cm"># room frees</span>
    <span class="kw">return</span> mx</pre>
      </div>

      <div class="panel" id="pn-tmpl">
        <div class="sec-title">The intervals mental template</div>
        <div class="sec-desc">Almost every interval problem starts the same way: sort, then sweep once.</div>
        <div class="tip"><b>Recognition signal:</b> input is pairs [start, end] · words like "overlap", "merge", "schedule", "rooms", "non-overlapping". Step 1 is ALWAYS sort by start (sometimes by end for greedy removal).</div>
        <pre><span class="cm"># Merge / overlap family</span>
intervals.<span class="fn">sort</span>(key=<span class="kw">lambda</span> x: x[0])
out = [intervals[0]]
<span class="kw">for</span> s, e <span class="kw">in</span> intervals[1:]:
    <span class="kw">if</span> s &lt;= out[-1][1]:
        out[-1][1] = <span class="fn">max</span>(out[-1][1], e)   <span class="cm"># overlap</span>
    <span class="kw">else</span>:
        out.<span class="fn">append</span>([s, e])

<span class="cm"># Greedy removal (LC 435) — sort by END</span>
intervals.<span class="fn">sort</span>(key=<span class="kw">lambda</span> x: x[1])
end = -inf; keep = 0
<span class="kw">for</span> s, e <span class="kw">in</span> intervals:
    <span class="kw">if</span> s &gt;= end:
        keep += 1; end = e
<span class="cm"># removals = len - keep</span>

<span class="cm"># Sweep line — rooms / max concurrency</span>
events = []
<span class="kw">for</span> s, e <span class="kw">in</span> intervals:
    events += [(s, 1), (e, -1)]
events.<span class="fn">sort</span>()
cur = mx = 0
<span class="kw">for</span> _, d <span class="kw">in</span> events:
    cur += d; mx = <span class="fn">max</span>(mx, cur)</pre>
      </div>

      <div class="panel" id="pn-key">
        <div class="sec-title">Key takeaways — burn these in</div>
        <ul class="keypts">
          <li><b>Step 1 is always sort.</b> Sort by start for merge/insert; sort by end for greedy "remove fewest" problems.</li>
          <li><b>Overlap test:</b> two intervals [a,b] and [c,d] overlap iff <code>c &lt;= b</code> (after sorting by start). Memorise this.</li>
          <li><b>Merge update:</b> <code>last[1] = max(last[1], end)</code> — not just <code>= end</code>, since the current may sit inside the last.</li>
          <li><b>Greedy by END is the non-overlapping trick:</b> always keep the interval that finishes earliest to leave room for more.</li>
          <li><b>Sweep line / two-pointer over sorted starts & ends</b> answers "max concurrent" (rooms, CPU, etc.) in O(n log n).</li>
          <li><b>State the cost honestly:</b> the sort dominates → O(n log n), not O(n).</li>
        </ul>
      </div>

      <div class="panel" id="pn-drill">
        <div class="sec-title">Drill Set — where mastery actually happens</div>
        <div class="sec-desc">Do them in order. Struggle 20+ min before any hint. Progress saves in this browser.</div>
        <div class="drill-grp">
          <h3><span class="lvl easy">WARM UP · EASY</span> build the reflex</h3>
          ${drill('iv_e1','LC 252 — Meeting Rooms','Sort + adjacent overlap check. The simplest interval problem.')}
          ${drill('iv_e2','LC 1språk — Merge Intervals (basic cases)','Re-implement LC 56 from scratch, no notes.')}
          ${drill('iv_e3','LC 56 — Merge Intervals','THE canonical merge. Must be automatic and explainable.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl med">CORE · MEDIUM</span> interview bread-and-butter</h3>
          ${drill('iv_m1','LC 57 — Insert Interval','Three-phase before/merge/after. Common follow-up to 56.')}
          ${drill('iv_m2','LC 435 — Non-overlapping Intervals','Greedy by END. The key insight of this pattern.')}
          ${drill('iv_m3','LC 253 — Meeting Rooms II','Sweep line / two heaps. Asked at Google, Uber a lot.')}
          ${drill('iv_m4','LC 986 — Interval List Intersections','Two-pointer over two sorted interval lists.')}
          ${drill('iv_m5','LC 452 — Min Arrows to Burst Balloons','Greedy by END in disguise. Same trick as 435.')}
        </div>
        <div class="drill-grp">
          <h3><span class="lvl hard">BOSS · HARD</span> Google-tier</h3>
          ${drill('iv_h1','LC 218 — The Skyline Problem','Sweep line + heap. A famous hard interval problem.')}
          ${drill('iv_h2','LC 759 — Employee Free Time','Merge across many lists, then find gaps.')}
          ${drill('iv_h3','LC 1851 — Minimum Interval to Include Each Query','Sort + heap + offline queries. Combines several patterns.')}
        </div>
        <div class="rubric">
          <h3>✅ Readiness self-check — be brutally honest</h3>
          <ul>
            <li>I instantly write the overlap test <code>c &lt;= b</code> after sorting by start.</li>
            <li>I solved LC 56 and LC 57 <b>without hints</b>.</li>
            <li>I can explain WHY greedy-by-end is optimal for LC 435 aloud.</li>
            <li>I can derive the sweep-line / two-pointer rooms solution myself.</li>
            <li>I never write <code>last[1]=end</code> instead of <code>max(last[1],end)</code>.</li>
            <li>I always state O(n log n) because of the sort.</li>
          </ul>
          <div class="verdict">All six → tracker, tick Pattern 06, request Pattern 07. <b>Any unchecked → more reps.</b></div>
        </div>
      </div>
      <footer>Pattern 06 of 26 · Next: Binary Search on Arrays</footer>`;
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
    initMerge(root); initInsert(root); initRooms(root);
  }

  /* timeline bar renderer: intervals on a 0..MAX axis */
  function bar(iv, cls, MAX){
    const L=(iv[0]/MAX*100), W=((iv[1]-iv[0])/MAX*100);
    return `<div style="position:absolute;left:${L}%;width:${W}%;height:26px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;`+
      ({cur:'background:var(--c-left);border:1px solid var(--left);color:var(--left)',
        ov:'background:var(--c-right);border:1px solid var(--right);color:var(--right)',
        fin:'background:var(--c-best);border:1px solid var(--best);color:var(--best)',
        idle:'background:var(--cell);border:1px solid var(--border);color:var(--text-3)'}[cls])+
      `">[${iv[0]},${iv[1]}]</div>`;
  }
  function lane(html){return `<div style="position:relative;height:30px;margin-bottom:6px">${html}</div>`;}

  function initMerge(root){
    const IV=[[1,3],[2,6],[8,10],[9,12],[15,18]], MAX=20;
    let i=0,merged=[],done=false;
    const el=id=>root.querySelector(id);
    function render(curIdx,overlap){
      let lanes='';
      merged.forEach(m=>lanes+=lane(bar(m,'fin',MAX)));
      if(curIdx>=0 && curIdx<IV.length) lanes+=lane(bar(IV[curIdx],overlap?'ov':'cur',MAX));
      for(let k=curIdx+1;k<IV.length;k++) lanes+=lane(bar(IV[k],'idle',MAX));
      el('#mg-track').innerHTML=lanes||'<div style="color:var(--text-3);font-size:12px">—</div>';
    }
    function reset(){i=0;merged=[];done=false;render(0,false);el('#mg-info').innerHTML='Press <b>Next</b>. Intervals are sorted by start time.';el('#mg-cur').textContent='—';el('#mg-last').textContent='—';el('#mg-cnt').textContent='0';}
    function step(){
      if(done){reset();return;}
      if(i===0){merged=[IV[0].slice()];i=1;render(1,false);el('#mg-info').innerHTML=`Seed result with first interval [${IV[0]}].`;el('#mg-cur').textContent=`[${IV[0]}]`;el('#mg-last').textContent=`[${merged[0]}]`;el('#mg-cnt').textContent='1';return;}
      if(i>=IV.length){done=true;render(-1,false);el('#mg-info').innerHTML=`Done! Merged into <b>${merged.length}</b> intervals: ${merged.map(m=>'['+m+']').join(', ')}`;return;}
      const cur=IV[i],last=merged[merged.length-1];
      if(cur[0]<=last[1]){const ne=Math.max(last[1],cur[1]);el('#mg-info').innerHTML=`[${cur}] overlaps last [${last}] (start ${cur[0]} ≤ ${last[1]}) → extend end to <b>${ne}</b>`;last[1]=ne;render(i,true);}
      else{el('#mg-info').innerHTML=`[${cur}] does NOT overlap [${last}] (start ${cur[0]} &gt; ${last[1]}) → append new block`;merged.push(cur.slice());render(i,false);}
      el('#mg-cur').textContent=`[${cur}]`;el('#mg-last').textContent=`[${merged[merged.length-1]}]`;el('#mg-cnt').textContent=merged.length;i++;
    }
    el('#mg-next').addEventListener('click',step);el('#mg-reset').addEventListener('click',reset);reset();
  }

  function initInsert(root){
    const IV=[[1,2],[3,5],[6,7],[8,10],[12,16]], NEW=[4,8], MAX=18;
    let i=0,res=[],nw=NEW.slice(),phase='before',done=false;
    const el=id=>root.querySelector(id);
    function render(curIdx,cls){
      let lanes='';
      res.forEach(r=>lanes+=lane(bar(r,'fin',MAX)));
      lanes+=lane(bar(nw,'cur',MAX));
      if(curIdx>=0&&curIdx<IV.length) lanes+=lane(bar(IV[curIdx],cls,MAX));
      for(let k=Math.max(curIdx+1,0);k<IV.length;k++) if(k!==curIdx) lanes+=lane(bar(IV[k],'idle',MAX));
      el('#in-track').innerHTML=lanes;
    }
    function reset(){i=0;res=[];nw=NEW.slice();phase='before';done=false;render(0,'idle');el('#in-info').innerHTML='Press <b>Next</b>. New interval to insert: [4, 8].';el('#in-ph').textContent='Before';el('#in-new').textContent='[4, 8]';el('#in-cnt').textContent='0';}
    function step(){
      if(done){reset();return;}
      if(phase==='before'){
        if(i<IV.length && IV[i][1]<nw[0]){res.push(IV[i].slice());el('#in-info').innerHTML=`[${IV[i]}] ends before new starts (${IV[i][1]} &lt; ${nw[0]}) → add as-is`;render(i,'fin');i++;el('#in-cnt').textContent=res.length;return;}
        phase='merge';el('#in-ph').textContent='Merge';el('#in-info').innerHTML='Now merging all intervals that overlap the new one…';return;
      }
      if(phase==='merge'){
        if(i<IV.length && IV[i][0]<=nw[1]){nw[0]=Math.min(nw[0],IV[i][0]);nw[1]=Math.max(nw[1],IV[i][1]);el('#in-info').innerHTML=`[${IV[i]}] overlaps new → grow new to <b>[${nw}]</b>`;el('#in-new').textContent=`[${nw}]`;render(i,'ov');i++;return;}
        res.push(nw.slice());phase='after';el('#in-ph').textContent='After';el('#in-info').innerHTML=`Insert the merged new interval <b>[${nw}]</b>. Now add the rest.`;el('#in-cnt').textContent=res.length;render(i,'idle');return;
      }
      if(i<IV.length){res.push(IV[i].slice());el('#in-info').innerHTML=`[${IV[i]}] comes after new → add as-is`;render(i,'fin');i++;el('#in-cnt').textContent=res.length;return;}
      done=true;el('#in-info').innerHTML=`Done! Result: ${res.map(r=>'['+r+']').join(', ')}`;render(-1,'idle');
    }
    el('#in-next').addEventListener('click',step);el('#in-reset').addEventListener('click',reset);reset();
  }

  function initRooms(root){
    const STARTS=[0,5,15], ENDS=[10,20,30];
    let s=0,e=0,rooms=0,mx=0,done=false;
    const el=id=>root.querySelector(id);
    function rA(arr,act,id){return arr.map((v,i)=>{let c='cell'+(i===act?(id==='s'?' left':' right'):'');return`<div class="${c}"><span class="ix">${i}</span>${v}</div>`}).join('');}
    function render(){el('#rm-s').innerHTML=rA(STARTS,s<STARTS.length?s:-1,'s');el('#rm-e').innerHTML=rA(ENDS,e<ENDS.length?e:-1,'e');}
    function reset(){s=0;e=0;rooms=0;mx=0;done=false;render();el('#rm-info').innerHTML='Press <b>Next</b>. Sweep the timeline; track rooms in use.';el('#rm-use').textContent='0';el('#rm-max').textContent='0';el('#rm-act').textContent='—';}
    function step(){
      if(done){reset();return;}
      if(s>=STARTS.length){done=true;render();el('#rm-info').innerHTML=`Done! Minimum rooms needed = <b>${mx}</b>`;return;}
      if(STARTS[s]<ENDS[e]){rooms++;mx=Math.max(mx,rooms);el('#rm-info').innerHTML=`start ${STARTS[s]} &lt; end ${ENDS[e]} → a meeting begins, need a room. Rooms now <b>${rooms}</b>`;el('#rm-act').textContent='+ room';s++;}
      else{rooms--;el('#rm-info').innerHTML=`start ${STARTS[s]} ≥ end ${ENDS[e]} → a meeting ended, a room frees. Rooms now <b>${rooms}</b>`;el('#rm-act').textContent='− room';e++;}
      render();el('#rm-use').textContent=rooms;el('#rm-max').textContent=mx;
    }
    el('#rm-next').addEventListener('click',step);el('#rm-reset').addEventListener('click',reset);reset();
  }
})();
