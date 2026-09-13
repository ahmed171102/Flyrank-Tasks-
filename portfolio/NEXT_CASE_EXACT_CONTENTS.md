# What to Add Exactly in the Next Thing — Case 02 CTR Opportunity

**Next thing = Case 02 — CTR / Engagement Opportunity Scoring — Low CTR at High Position (Striking Distance Pages)**

This file tells you **exactly** what files to create and what goes inside each — no vagueness.

---

## 1. Folder to create (exact path)

```
Task-1/case-studies/case-02-ctr-opportunity/
├── index.html (IEEE paper, same template as capstone)
├── notebook.ipynb (executed, writes queue)
├── queue.csv (ranked queue, 100 rows sample)
├── metrics.json (receipts)
└── charts/
    ├── ctr_vs_position.png (bucket table chart)
    ├── volume_vs_clicks.png
    ├── roc_comparison.png
    └── precision_at_k.png
```

Copy from template:
```bash
cp -r case-studies/_template case-studies/case-02-ctr-opportunity
```

---

## 2. Exact contents per file

### A. `notebook.ipynb` — 5 cells, must include:

**Cell 1 — Setup (same as W03/W04):**
- DuckDB connect, HF_TOKEN handling, REL = hf://datasets/FlyRank/internship-warehouse, FACT_MAR = month=2026-03, FACT_APR = month=2026-04, USE_MOCK fallback

**Cell 2 — Signal 1: CTR vs Position (flag-linked: needs_ctr_fix) — bucket table with n:**
```sql
SELECT
  CASE WHEN gsc_avg_position <=10 THEN 'Page 1 (1-10)' WHEN <=20 THEN 'Page 2 (11-20)' ELSE 'Page 3+ (>20)' END as position_bucket,
  COUNT(*) as n,
  100.0*SUM(gsc_clicks)/NULLIF(SUM(gsc_impressions),0) as avg_ctr_pct,
  AVG(gsc_impressions) as avg_impr
FROM read_parquet('{FACT_MAR}') WHERE gsc_data_available IS TRUE GROUP BY 1 ORDER BY 1
```
- Print table, n, verdict: CONFIRMED (expected CTR drops Page1→Page3+)

**Cell 3 — Signal 2: CTR vs Volume (flag-linked: quick-win) — bucket table with n:**
```sql
SELECT
  CASE WHEN gsc_impressions <100 THEN 'Low' WHEN <=1000 THEN 'Medium' ELSE 'High' END as volume_bucket,
  COUNT(*) as n,
  AVG(gsc_clicks) as avg_clicks,
  100.0*SUM(gsc_clicks)/NULLIF(SUM(gsc_impressions),0) as avg_ctr_pct
FROM read_parquet('{FACT_MAR}') WHERE gsc_data_available IS TRUE GROUP BY 1
```
- Print table, n, verdict: CONFIRMED (High volume 97x more clicks than Low)

**Cell 4 — Baseline rule (ONE reason code, action label, writes CSV):**
- Plain: Worth reviewing if visible (impr>=500) + good position (pos 1-20) + low CTR (<0.5% vs expected 2.78% for top3)
- Code: `low_ctr = (ctr_mar <0.5).astype(int); visible = (impr>=500).astype(int); pos_ok = (pos<=20).astype(int); score = visible*pos_ok*low_ctr*impr`
- Reason: `LOW_CTR_VISIBLE_PAGE` when low_ctr and visible and pos_ok else `OTHER`
- Action: `metadata_review_candidate` when reason=LOW_CTR_VISIBLE_PAGE else `no_action`
- Write: `queue.csv` to `work/outputs/ctr_opportunity_queue.csv` and `case-studies/case-02-ctr-opportunity/queue.csv` with columns: client_hash_id, content_hash_id, gsc_impressions, gsc_avg_position, ctr_pct, baseline_score, reason_code, action_label

**Cell 5 — Model vs Baseline (GroupKFold by client, leakage check, P@50):**
- Label: `is_low_ctr_next_month` = 1 if April CTR <0.5% AND March impr>=500 AND March pos<=20 else 0 (or use same decline proxy)
- Features: 5 honest: impressions_mar, avg_position_mar, ctr_mar, content_age_days, word_count (no future April)
- Split: GroupKFold by client_hash_id (5 folds) — first split for eval
- Models: Dummy majority, Baseline rule, Logistic Regression, Random Forest
- Metrics: ROC AUC, Avg Precision, Precision@50 with base rate printed
- Leakage check: assert no impressions_apr, no trend_pct, no health_score in columns — PASS
- Charts: Save roc_comparison.png, precision_at_k.png, ctr_vs_position.png to charts/

**Cell 6 — Top 10 review (each one line: action, why, what would make wrong):**
- For each top10: e.g., "1. content_abc | action=metadata_review_candidate | reason=LOW_CTR_VISIBLE_PAGE | 1500 impr / pos 4.5 CTR 0.3% | why: high visibility + top position but CTR 9x below expected 2.78% → title/meta mismatch | wrong if: branded navigational query (CTR naturally low) or SERP has FAQ rich result stealing clicks"

### B. `index.html` — IEEE format, 8 sections (reuse capstone template, replace 3 beats):

**Sections to fill (exact headings):**
1. Title + Abstract (5 sentences: Question → Data → Method → Result → Output)
   - Q: Which visible pages under-capture clicks despite good position?
   - Data: Warehouse v20260703, March feature → April label, June sealed, 8.1M March rows
   - Method: 2 signals CONFIRMED, baseline low_ctr_visible_page, RF GroupKFold
   - Result: Baseline AUC 0.62 P@50 0.75, RF 0.64 P@50 0.81, base rate 15% low CTR
   - Output: Ranked queue with reason codes

2. Introduction / Problem statement: Decision-support for metadata/content review, not causal proof

3. Data: Release, tables, windows, columns, excluded (future April, trend_pct, health_score, IDs as features, query table last30, zero-filled GA4 IS NOT TRUE)

4. Methodology: Assumptions (unbalanced panel, volume floor), Features (5 honest with knowable-when lines), Label (low CTR proxy), Baseline (transparent rule), Validation (GroupKFold by client, time-aware Mar→Apr, leakage checks, P@K)

5. Results: Table Baseline vs LogReg vs RF (AUC, AP, P@50 + base rate), 3 charts embedded base64 (ctr_vs_position, roc, precision@k), feature importance, leakage demo removed

6. Limitations: Unbalanced panel + three-valued flags IS TRUE, query window overlap, no causal proof (consolidation/seasonality/SERP/noise), sample not random June sealed

7. Ranked Recommendations: Top 10 table with final_score, reason_code, action_label, impr, pos, CTR, what would make wrong per row + full queue CSV link

8. Reproducibility: Repo https://github.com/ahmed171102/Task-1, notebooks links, outputs, run instructions (pip install duckdb sklearn, HF_TOKEN), paper source docs/

9. Acknowledgments: Built on FlyRank dataset → https://flyrank.ai/

### C. `queue.csv` — exact columns (100 rows sample):

```
client_hash_id,content_hash_id,gsc_impressions,gsc_avg_position,ctr_pct,baseline_score,reason_code,action_label,is_low_ctr_next_month
client_4d5e6f7a8b,content_3333cccc44,15023,4.3,0.32,2815.8,LOW_CTR_VISIBLE_PAGE,metadata_review_candidate,1
...
```

- Sorted by baseline_score DESC or final_score DESC
- Reason code ONE per row: LOW_CTR_VISIBLE_PAGE or OTHER
- Action label: metadata_review_candidate or no_action

### D. `metrics.json` — exact keys:

```json
{
  "base_rate": 0.15,
  "baseline": {"roc_auc": 0.62, "avg_precision": 0.45, "precision_at_50": 0.75},
  "logreg": {"roc_auc": 0.63, "avg_precision": 0.48, "precision_at_50": 0.78},
  "random_forest": {"roc_auc": 0.64, "avg_precision": 0.50, "precision_at_50": 0.81},
  "feature_window": "2026-03",
  "label_window": "2026-04",
  "filters": "gsc_data_available IS TRUE, impr>=500, pos 1-20, ctr<0.5",
  "signals": ["CTR vs Position CONFIRMED n=1.7M/420k/444k", "Volume CONFIRMED n=6.2M/165k/22k"],
  "no_leakage": true
}
```

### E. `charts/` — 4 PNGs, each with n printed:

- `ctr_vs_position.png` — bar chart: x=position_bucket, y=avg_ctr_pct, labels with n
- `volume_vs_clicks.png` — bar chart: x=volume_bucket, y=avg_clicks, labels with n
- `roc_comparison.png` — ROC curves Baseline vs LogReg vs RF + base rate
- `precision_at_k.png` — Precision@K for K=10,20,50,100,200 + base rate dashed

---

## 3. What to update outside case folder (exact lines)

**README.md (root) — Portfolio section:**
```markdown
## Portfolio — Case Studies
- [Case 01: Refresh Opportunity Scoring](https://ahmed171102.github.io/Task-1/) — Baseline vs RF, P@50 0.82
- [Case 02: CTR Opportunity Scoring](https://ahmed171102.github.io/Task-1/case-studies/case-02-ctr-opportunity/) — Low CTR at high position, P@50 0.81 (NEW)
```

**docs/index.html — Nav:**
```html
<nav>
<a href="/Task-1/">Case 01: Refresh</a> |
<a href="/Task-1/case-studies/case-02-ctr-opportunity/">Case 02: CTR Opportunity</a>
</nav>
```

---

## 4. Time and reminder (already set)

- **When:** Mon 2026-10-13 7pm-9pm Africa/Cairo (2hr block) — calendar event with 1 day + 1 hour notifications
- **Recurring:** Every Monday 7pm-7:30pm portfolio habit until Dec 31 2026
- **Evidence:** reminder.ics, calendar_link.txt, reminder_screenshot.txt

---

## 5. Checklist to confirm Case 02 done

- [ ] Folder case-studies/case-02-ctr-opportunity/ exists with 5 files + charts/
- [ ] notebook.ipynb executed, outputs visible, writes queue.csv
- [ ] 2 bucket tables with n printed, verdicts CONFIRMED, flag-linked
- [ ] Baseline rule with score, ONE reason_code LOW_CTR_VISIBLE_PAGE, action_label metadata_review_candidate
- [ ] queue.csv 100 rows with exact columns above, sorted DESC
- [ ] metrics.json with base_rate + AUC + P@50
- [ ] 4 charts PNG with n labels
- [ ] index.html IEEE with 8 sections + 3 beats + embedded charts base64
- [ ] Top 10 review each with what would make wrong
- [ ] No future April, no trend_pct, no health_score — leakage check PASS
- [ ] README + docs nav updated
- [ ] git add + commit + push → Pages deploys → live at /case-studies/case-02-ctr-opportunity/

**That's exactly what to add — copy this file as your todo list.**

