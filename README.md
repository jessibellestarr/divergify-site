# divergify-site

Static HTML/CSS site for Divergify.

Deployment: Netlify via GitHub
- Netlify reads `netlify.toml` to run `npm run build` and publish from `public`.

Local development
- Open `index.html` in a browser, or serve locally with any static server.

Structure
- Gatsby source under `src/`
- Built output in `public/` (created by `npm run build`)
- `styles.css` for global styles
- `netlify.toml` for deploy configuration
