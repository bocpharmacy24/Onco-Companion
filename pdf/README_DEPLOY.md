# Onco Companion — Deployment & Update Guide (free, GitHub Pages)

## One-time setup (~15 min)
1. Create a GitHub account (use a shared/department email if possible, not personal).
2. New repository → name e.g. `onco-companion` → Public → Create.
3. Upload everything inside this `site` folder to the repo root (Add file → Upload files). Commit.
4. Settings → Pages → Source: "Deploy from a branch" → Branch `main` / `/ (root)` → Save.
5. After ~1 minute the app is live at `https://<username>.github.io/onco-companion/`.
6. Make a QR code of that URL (free: any QR generator). Test by scanning with iPhone + Android, then "Add to Home Screen".

## Approving medicines for patients
Patients only see drugs whose status is `approved`. All 10 pilot drugs are currently `draft` (hidden).
- Open `build/build_site.py`, change `'status':'draft'` → `'approved'` for reviewed drugs, run `python3 build_site.py`, upload the new `data.json`.
- Or edit `data.json` directly (search for `"status":"draft"`).
- To review before approving, open `https://<your-url>/#preview` (shows drafts with an orange banner).

## Arabic review
Arabic text lives in `build/ar_a.py`, `ar_b.py` (then `ar.json`). Reviewer can mark corrections on the preview; edit and rebuild.

## Adding a medication later
1. Add its English + Arabic fields (same structure as the others), 2. add to META (status draft), 3. rebuild, 4. review → approve → upload.

## Before go-live checklist
- [ ] Pharmacy + Quality review of English and Arabic text
- [ ] Local adaptation: Bahrain brands/availability, storage in hot climate, local emergency number
- [ ] PR approval of QR poster; Kept URL stable (do not rename the repo after printing QR)
- [ ] Test offline mode and both languages on real phones

No patient data is collected; no cookies; no login.
