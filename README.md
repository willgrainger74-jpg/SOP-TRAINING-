# Action Group Training

Installation SOP training for Action installers: 14 modules, a 20-question sign-off test for each, PDF versions, logins, progress tracking and a manager tab.

## Put it on GitHub Pages
1. On GitHub, create a new public repository (for example `action-group-training`).
2. Upload everything in this folder, including the `pdf` folder, to the repository.
3. Settings → Pages → Deploy from a branch → `main` / root → Save.
4. The app is live at `https://<your-username>.github.io/action-group-training/` a minute later.

## How it works
- **Firebase:** the Install Tracker project (`install-tracker-30b1b`). Everything is stored under one node, `sopTraining/`.
- **Sign in:** installers can use their Install Tracker username and password, or tap "Create your login".
- **Manager tab:** same PIN as the Install Tracker manager portal (default 1234).
- **Tests:** 20 questions, shuffled every attempt, 90% to pass (change it in Manager → Settings). A failed test re-opens the sections that were missed.
- **Divisions:** HVAC installers are scored on the 7 HVAC modules, plumbing installers on the 6 plumbing and water modules, everyone else on all 14. The Every Install module is required for everybody. Every module is open to everyone.

## Edit the content
- `sop-shared.js` — sections and questions used by more than one module
- `sop-core.js` — the Every Install customer-experience SOP
- `sop-hvac.js` — furnaces, AC, heat pump, dual fuel, packaged unit
- `sop-waterheaters.js` — Rheem gas and Rheem electric water heaters, with code requirements
- `sop-plumbing.js` — tankless, softener, HALO 5, NuvoH2O Home & Manor
- After changing content, the PDFs in `pdf/` need to be regenerated to match.
