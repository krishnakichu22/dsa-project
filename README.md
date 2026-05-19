# DSA Zero to Hero

Your personal, offline, interactive DSA interview-prep course.
One project. Add patterns one at a time. Works forever, no internet.

---

## Run it (one command)

You need Python 3 (already on Mac/Linux; on Windows install from python.org).

```bash
cd dsa-project
python3 serve.py
```

It prints a URL (default `http://localhost:8000`) and opens your browser.
To stop: `Ctrl+C`. To use a different port: `python3 serve.py 9000`.

> **Why a server and not just double-clicking index.html?**
> The app loads each pattern's code on demand. Browsers block that for
> `file://` paths for security. The tiny server (zero dependencies, pure
> Python standard library) fixes it. Your progress still saves locally.

---

## How to use it

1. Open the app → you land on the **Tracker**.
2. Click any row marked with a ● to open its **training page**.
3. Work the tabs left → right: visual demos → Mental Template → Key Takeaways → **Drill Set**.
4. Do the Drill Set problems on LeetCode. Pass the **readiness rubric** honestly.
5. Back on the Tracker, tick the pattern's box. Request the next one.

New here? In the app, click **"Read START HERE first"** (or go to `#/help`).

---

## Project structure

```
dsa-project/
├── index.html                  app shell (don't edit)
├── serve.py                    local server (one command)
├── README.md                   this file
├── data/
│   └── patterns.js             ← the 26-pattern registry
├── assets/
│   ├── css/theme.css           all styling + dark/light
│   └── js/
│       ├── app.js              theme + progress storage
│       ├── router.js           routing + page rendering
│       └── patterns/
│           └── p01_sliding_window.js   one file per pattern
└── patterns/                   (reserved for future assets)
```

Routing is hash-based:
`#/help`, `#/tracker`, `#/pattern/1`, `#/pattern/2`, …

---

## Adding the next pattern (the whole point)

When you finish a pattern and want the next, ask:

> "build Pattern 2 as a module"

You'll get **one file**, e.g. `p02_two_pointers.js`. Then:

1. Drop it into `assets/js/patterns/`.
2. In `data/patterns.js`, find pattern 2 and change
   `module:null` → `module:"p02_two_pointers"`.
3. Refresh the browser. Done.

No other file ever changes. The tracker auto-detects it, the row
becomes clickable, the page loads on demand. The project grows with
you until all 26 are built.

---

## Honest expectation

This system makes your problem-solving reps ~3x more efficient by
giving you instant pattern recognition. It does **not** replace the
reps. Cracking Google = these patterns + 250–400 solved problems +
15–25 mock interviews + spaced repetition. The Drill Set in each
pattern is the part that actually gets you there. Do the drills.
