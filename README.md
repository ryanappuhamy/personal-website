# personal-website

Static personal site for Ryan Appuhamy — plain HTML, CSS and JS, no framework, no build step.

- **Live:** https://ryanappuhamy.vercel.app (moving to ryanappuhamy.com)
- **Pages:** `index.html` (short bio, projects, contact) and `equity-research.html` (the equity research platform project)
- **Shared design system:** `css/site.css` and `js/site.js`, matching the platform (equity-research-frontend): colors, Geist fonts, 22px cards, pill nav with sliding indicator (bottom bar on phones), rise animations
- **Images:** platform screenshots in `img/` as `.webp` (1440 px wide, 2x)
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
