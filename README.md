# Forward Deployed Equity

Static marketing site for **forwarddeployedequity.com**.

Plain HTML / CSS / JS. No build step. Deploys to Netlify directly from this repo.

## Local preview

Open `index.html` in a browser, or run any static server:

```bash
python3 -m http.server 4000
# then visit http://localhost:4000
```

## Files

- `index.html` — single-page site
- `styles.css` — all styles
- `main.js` — light interactions (scroll reveal, sticky nav state)
- `netlify.toml` — Netlify config + security headers

## Deploy

Connected to Netlify via the GitHub repo. Pushes to `main` deploy automatically.
