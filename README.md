# SoleGuard-AI Website (HTML, CSS, JavaScript)

A responsive, front-end hackathon prototype dashboard for the SoleGuard-AI concept.

## Files
- `index.html` — page structure
- `style.css` — responsive styling
- `script.js` — simulated pressure readings, demo pattern flags, chart, activity history, and response/verification interaction

## Run locally
1. Download or clone this folder.
2. Open `index.html` in a modern browser.
3. Click **Simulate reading** to create a new simulated sample.
4. Click **Simulate response & verify** to see a before/after software simulation.
5. Click **Reset demo** to restore the initial values.

No build step or framework is required. Google Fonts is optional; the page uses fallback fonts if unavailable.

## Publish with GitHub Pages
1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under the build/deployment section, choose **Deploy from a branch**.
5. Select your main branch and the `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish the site; the URL will appear in the Pages section.

## Important limitations
- All sensor readings are simulated in JavaScript.
- The pressure map and index are illustrative, not calibrated measurements.
- The rule-based labels are demonstration flags, not a validated medical risk score or diagnosis.
- The response button only changes simulated values. It does not physically redistribute pressure.
- Do not use this prototype to make medical decisions. A real-world system requires calibrated hardware, safety engineering, privacy protections, and clinical validation.
