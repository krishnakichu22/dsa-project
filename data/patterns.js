/* ============================================================
   PATTERN REGISTRY — single source of truth
   To add a pattern's training page: set "module" to the JS file
   name in assets/js/patterns/ and the router auto-loads it.
   Patterns without a module show a "coming soon" page.
   ============================================================ */
window.PATTERNS = [
 {phase:"Phase 1", title:"Arrays & Strings", color:"#7c6cff", items:[
  {n:1,name:"Sliding Window",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 3, 76, 239",module:"p01_sliding_window"},
  {n:2,name:"Two Pointers",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 15, 11, 42",module:"p02_two_pointers"},
  {n:3,name:"Prefix Sum",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 560, 303, 974",module:"p03_prefix_sum"},
  {n:4,name:"HashMap / Frequency Counter",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 1, 49, 128",module:"p04_hashmap"},
  {n:5,name:"Kadane's Algorithm",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 53, 121, 918",module:"p05_kadane"},
  {n:6,name:"Sorting + Intervals",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 56, 57, 435",module:"p06_intervals"},
  {n:7,name:"Binary Search on Arrays",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 33, 153, 74",module:"p07_binary_search"},
  {n:8,name:"Stack-based Problems",d:"m",dl:"Medium",r:"roi-h",rl:"High",lc:"LC 20, 84, 739",module:"p08_stack"},
  {n:9,name:"Monotonic Stack / Queue",d:"m",dl:"Medium",r:"roi-h",rl:"High",lc:"LC 239, 84, 42",module:null},
  {n:10,name:"Matrix Traversal",d:"m",dl:"Medium",r:"roi-m",rl:"Medium",lc:"LC 54, 48, 73",module:null},
  {n:11,name:"String Patterns (KMP / Z)",d:"m",dl:"Medium",r:"roi-m",rl:"Medium",lc:"LC 28, 459, 5",module:null}]},
 {phase:"Phase 2", title:"Linked Lists", color:"#3fb950", items:[
  {n:12,name:"Fast & Slow Pointers",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 141, 142, 876",module:null},
  {n:13,name:"Reverse / Merge Lists",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 206, 21, 23",module:null},
  {n:14,name:"In-place List Manipulation",d:"m",dl:"Medium",r:"roi-m",rl:"Medium",lc:"LC 143, 92, 25",module:null}]},
 {phase:"Phase 3", title:"Trees & Graphs", color:"#d29922", items:[
  {n:15,name:"Tree DFS (recursive)",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 104, 112, 236",module:null},
  {n:16,name:"Tree BFS (level order)",d:"e",dl:"Easy",r:"roi-h",rl:"High",lc:"LC 102, 103, 199",module:null},
  {n:17,name:"BST Operations",d:"m",dl:"Medium",r:"roi-h",rl:"High",lc:"LC 98, 230, 450",module:null},
  {n:18,name:"Graph DFS / BFS",d:"m",dl:"Medium",r:"roi-h",rl:"High",lc:"LC 200, 133, 417",module:null},
  {n:19,name:"Topological Sort",d:"m",dl:"Medium",r:"roi-h",rl:"High",lc:"LC 207, 210, 269",module:null},
  {n:20,name:"Union Find (Disjoint Set)",d:"m",dl:"Medium",r:"roi-m",rl:"Medium",lc:"LC 547, 684, 1584",module:null}]},
 {phase:"Phase 4", title:"Recursion & Backtracking", color:"#f85149", items:[
  {n:21,name:"Backtracking (subsets / perms)",d:"m",dl:"Medium",r:"roi-h",rl:"High",lc:"LC 78, 46, 51",module:null},
  {n:22,name:"Divide & Conquer",d:"m",dl:"Medium",r:"roi-m",rl:"Medium",lc:"LC 23, 148, 315",module:null}]},
 {phase:"Phase 5", title:"Dynamic Programming", color:"#56d364", items:[
  {n:23,name:"1D DP (linear)",d:"m",dl:"Medium",r:"roi-h",rl:"High",lc:"LC 70, 198, 322",module:null},
  {n:24,name:"2D DP (grid / strings)",d:"h",dl:"Hard",r:"roi-h",rl:"High",lc:"LC 62, 1143, 72",module:null},
  {n:25,name:"Knapsack Patterns",d:"h",dl:"Hard",r:"roi-h",rl:"High",lc:"LC 416, 518, 494",module:null}]},
 {phase:"Phase 6", title:"Advanced Data Structures", color:"#9fb0c3", items:[
  {n:26,name:"Heap / Priority Queue",d:"m",dl:"Medium",r:"roi-h",rl:"High",lc:"LC 347, 23, 295",module:null}]},
];

/* Flat lookup by pattern number */
window.PATTERN_BY_N = {};
window.PATTERNS.forEach(ph => ph.items.forEach(it => { window.PATTERN_BY_N[it.n] = {...it, phase:ph.phase, phaseTitle:ph.title, color:ph.color}; }));
