# Week 10 — Portfolio Habit — Final Submission

**Deliverable:** Short "how to add the next case" note + named next piece + evidence of reminder set

## 1. How to add the next case (concrete, not vague)

**Where:** `https://ahmed171102.github.io/Task-1/case-studies/` — each case is one folder `case-02-ctr-opportunity/` with `index.html` (IEEE template), `notebook.ipynb`, `queue.csv`, `charts/`. Index at `README.md` + `docs/index.html` nav.

**Three-beat shape (Week 2):** Problem → What I did → What came of it

**Steps (5 min repeatable):**
1. Copy template: `cp -r case-studies/_template case-studies/case-02-ctr-opportunity`
2. Run notebook: Colab + HF_TOKEN → Run all → generates queue.csv + charts + metrics.json
3. Fill 3 beats in index.html (keep IEEE sections)
4. Update index: add line to README.md Portfolio + docs nav
5. Commit & deploy: `git add case-studies/... && git commit -m "case 02" && git push` → Pages deploys in 1 min
6. Archive receipt: metrics.json to work/outputs/

Full guide: `NEXT_CASE_GUIDE.md`

## 2. Next real piece named + reminder set

**Next piece:** **Case 02 — CTR / Engagement Opportunity Scoring — Low CTR at High Position (Striking Distance Pages)**

Why: Natural next after Refresh lane, reuses W04 signals already CONFIRMED (CTR vs Position n=1.7M/420k/444k, Volume n=6.2M/165k/22k), scoped 3 hours, real warehouse March→April, baseline low_ctr_visible_page + RF GroupKFold, queue ctr_opportunity_queue.csv

**Reminder set (concrete):**
- One-time: Google Calendar Mon 2026-10-13 7pm-9pm Africa/Cairo "Add Case 02 CTR Opportunity to Portfolio" — notifications 1 day + 1 hour before — 2hr block
- Recurring: Every Monday 7pm-7:30pm "Portfolio habit — 30 min review" until 2026-12-31, notification 15 min before
- Fallback: GitHub Issue #1 in Task-1 repo "Case 02 due 2026-10-13" label portfolio, milestone Week 10 habit

**Evidence files:**
- `reminder.ics` — importable iCalendar with 2 VEVENTs (one-time + RRULE weekly) + VALARMs
- `calendar_link.txt` — Google Calendar quick-add URLs (click to add)
- `reminder_screenshot.txt` — text description of calendar UI + notifications + GitHub Issue
- `portfolio_habit_tracker.md` — weekly check-in log

Full details: `NEXT_PIECE.md`

## 3. Claude Project preserved

**Project:** "FlyRank Portfolio" in Claude.ai — already knows:
- Voice: direct, honest, observed/directional/decision-support, no causal claims
- Stack: DuckDB over hf://datasets/FlyRank/internship-warehouse, sklearn GroupKFold by client_hash_id, reason codes, IS TRUE filtering
- Identity kit: Cairo, Refresh→CTR→AI referral progression, portfolio at https://ahmed171102.github.io/Task-1/, IEEE template
- Template: case-studies/_template/

Next case is a short conversation, not a rebuild: "Claude, add CTR case using March data, same baseline pattern as W04"

## Pass / Revise Checklist

- [x] Concrete "how to add next case" note, not vague intention → `NEXT_CASE_GUIDE.md` with exact paths + 6 steps + 5 min repeatable
- [x] Specific next piece named with real reminder set → `NEXT_PIECE.md` Case 02 CTR Opportunity + `reminder.ics` + `calendar_link.txt` + `reminder_screenshot.txt`
- [x] Build context preserved → Claude Project "FlyRank Portfolio" with voice/stack/identity kit documented

## Files for submission

```
portfolio/
├── NEXT_CASE_GUIDE.md (where + 6 steps + 3-beat shape)
├── NEXT_PIECE.md (named next piece + why + deadline)
├── reminder.ics (importable calendar evidence)
├── calendar_link.txt (quick-add URLs)
├── reminder_screenshot.txt (UI description + GitHub Issue)
├── portfolio_habit_tracker.md (weekly log)
└── FINAL_SUBMISSION.md (this file)
```

All mirrored in `work/portfolio/` and `Task-1/portfolio/` and `Task-1/work/portfolio/`

Repo: https://github.com/ahmed171102/Task-1
Paper: https://ahmed171102.github.io/Task-1/ (IEEE)
