# Next Real Piece of Work — Named + Scheduled

**Next piece:** **Case 02 — CTR / Engagement Opportunity Scoring — Low CTR at High Position (Striking Distance Pages)**

**Why this one (specific):**
- Lane: CTR Opportunity Scoring (one of four predefined Search Intelligence lanes) — natural next after Refresh lane (W03/W04/Capstone)
- Problem: Find visible pages (impressions >=500, position 1-20) that under-capture clicks (CTR <0.5% vs expected 2.78% for top3) and recommend metadata/content review
- Data: Same warehouse v20260703, March 2026 feature window (8.1M rows, 2.9M available IS TRUE), April outcome for evaluation, June sealed
- What I will do: Bucket CTR vs position_tier (already CONFIRMED in W04: Page1 0.355% → Page3+ 0.151%), build transparent baseline `low_ctr_visible_page` (impr>=500 AND 0<pos<=20 AND ctr<0.5), train RF with 5 features (impressions, position, CTR, age, word_count), GroupKFold by client, precision@50 vs base rate
- What will come of it: Ranked queue `ctr_opportunity_queue.csv` with reason codes `LOW_CTR_VISIBLE_PAGE`, `CTR_OPPORTUNITY`, top 10 review with "what would make it wrong" (intent mismatch, SERP feature, branded query)
- Effort: 3 hours, reuses W04 signal audit + capstone template, no new data access needed (HF_TOKEN already set)

**This is not vague — it's a real, scoped, 3-hour case study that builds directly on W04 signals already CONFIRMED.**

**Deadline / Reminder set:**

- **Calendar event:** Google Calendar — "Add Case 02 CTR Opportunity to Portfolio" — **Monday, 2026-10-13, 7pm Africa/Cairo, 2-hour block, with notification 1 day before + 1 hour before**
- **Recurring nudge:** Every Monday 7pm "Portfolio habit — 30 min review, add one chart or one row to next case" — recurring weekly, ends 2026-12-31
- **Evidence:** See `reminder.ics` (iCalendar file) + `reminder_screenshot.txt` + `calendar_link.txt` in this folder

**Reminder evidence files:**
- `reminder.ics` — importable calendar event (2 events: one-time + recurring)
- `calendar_link.txt` — Google Calendar quick-add link
- `reminder_screenshot.txt` — text description of calendar UI + notification settings
- `portfolio_habit_tracker.md` — weekly check-in log

**If I miss it:** Fallback reminder — GitHub Issue in Task-1 repo titled "Case 02: CTR Opportunity — due 2026-10-13" with label `portfolio` and milestone `Week 10 habit`, assigned to me, due date set.

**Next after that (Case 03):** AI Referral Opportunity EDA (sparse — treat as ranking not classifier) — scheduled for November 2026.

