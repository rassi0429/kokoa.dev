# kokoa.dev

KOKOA portfolio site.

## Development

```powershell
npm install
npm run dev
```

Open the URL printed by Vite. The active source lives under `src/` and is written in React + TypeScript.

## Scripts

- `npm run dev`: start the local dev server
- `npm run typecheck`: run TypeScript checks
- `npm run build`: typecheck and build production files into `dist/`
- `npm run preview`: preview the production build locally

## Deployment

GitHub Actions deploys `dist/` to GitHub Pages when changes are pushed to `main`.
The workflow lives at `.github/workflows/pages.yml`.
