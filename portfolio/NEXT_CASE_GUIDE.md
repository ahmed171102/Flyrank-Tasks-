# How to Add the Next Case Study — Concrete Playbook (Week 10)

**Where it goes:** My career portfolio is my GitHub Pages site + FlyRank repo, same habit as capstone.

- **Public page:** `https://ahmed171102.github.io/Task-1/` → `/case-studies/` folder (each case is one HTML file, same IEEE template as capstone)
- **Source:** `Task-1/case-studies/` in repo (each case: `case-02-ctr-opportunity/` folder with `index.html`, `notebook.ipynb`, `queue.csv`, `charts/`)
- **Index:** `Task-1/README.md` → Portfolio section links to each case, and `docs/index.html` has nav to case studies

**Three-beat shape (reuse Week 2):** Every case follows Problem → What I did → What came of it.

1. **Problem (1 paragraph, decision-support):** What decision does this help? e.g., "Which visible pages under-capture clicks despite good position?"
2. **What I did (3-5 bullets, public-safe):** Data window (e.g., March 2026 feature → April label), tables (fact_daily + dim_content), filters (IS TRUE), features (impressions, CTR, position, age), baseline rule (transparent), model (RF GroupKFold by client), leakage checks
3. **What came of it (metrics + ranked queue):** Baseline vs model (AUC, P@50 with base rate), top 10 review with "what would make it wrong", ranked CSV, limitations (observed/directional)

**Steps to add one (5 minutes, repeatable):**

1. **Copy template:** `cp -r case-studies/_template case-studies/case-02-ctr-opportunity`
2. **Run notebook:** Open `case-studies/case-02-ctr-opportunity/notebook.ipynb` in Colab → set HF_TOKEN → Run all → generates `queue.csv` + `charts/` + `metrics.json`
3. **Fill 3 beats:** Edit `case-studies/case-02-ctr-opportunity/index.html` — replace Problem / What I did / What came of it (keep IEEE sections, reuse capstone structure)
4. **Update index:** Add one line to `Task-1/README.md` Portfolio + `docs/index.html` nav: `<a href="/Task-1/case-studies/case-02-ctr-opportunity/">Case 02: CTR Opportunity</a>`
5. **Commit & deploy:** `git add case-studies/case-02-ctr-opportunity/ && git commit -m "case 02: CTR opportunity" && git push` → GitHub Pages auto-deploys in 1 min, live at `https://ahmed171102.github.io/Task-1/case-studies/case-02-ctr-opportunity/`
6. **Archive receipt:** Save `metrics.json` to `work/outputs/case-02-metrics.json` (receipts, not data)

**Time:** 2-3 hours per case, same habit as W03→W04→Capstone. No rebuild — just copy template.

**Build context preserved:** Claude Project "FlyRank Portfolio" already knows my voice (direct, honest, observed/directional), stack (DuckDB over hf://, sklearn GroupKFold, reason codes, IS TRUE filtering), and identity kit (Cairo, Refresh lane, Refresh→CTR→AI referral progression). Next case is a short conversation: "Add CTR case using March data, same baseline pattern" — Claude knows template, no rebuild.

