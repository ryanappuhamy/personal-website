# personal-website

Static personal site for Ryan Appuhamy: plain HTML, CSS and JS, no framework, no build step.

- **Live:** https://ryanappuhamy.com
- **Pages:** `index.html` (short bio, projects, contact), `equity-research.html` (equity research platform), `power-demand.html` (Swiss power demand forecasting) and `semiconductors.html` (semiconductor cycle intelligence)
- **Design:** each page carries its own inline CSS in the editorial style of servizi.ryanappuhamy.com (sticky header, numbered sections with text left and image or table right, click-to-zoom charts), in the black + violet palette (`#08090c`, `#8ea5ff`) and Geist fonts
- **`js/site.js`:** wakes the platform backend (below); no styling or navigation logic
- **Images:** platform screenshots and project charts in `img/` as `.webp` (2x)
- **Other files:** `thesis.pdf`, `favicon.svg`

The CV is not published: visitors request it by email.

`js/site.js` also pings the platform backend's `/health` on page load (at most once every 10 minutes per tab), so the free-tier Render server is awake by the time a visitor opens the platform.

## Local preview

```bash
python3 -m http.server 8080
```

## Deploy

Hosted on Vercel. Every push to `main` triggers a production deployment automatically.
Manual deploy: `vercel --prod`.
