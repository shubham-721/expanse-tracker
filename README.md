# Ledgerline

A front-end-only expense tracker built with React and Vite. Data is stored in the browser (localStorage), so there is no backend.

## Features
- Monthly total, daily average and budget tracking (click the budget to edit it)
- One segmented bar showing spend by category; click a segment to filter
- Daily spend strip and expenses grouped by day
- Add and remove expenses, navigate between months
- Light and dark theme that follows the system

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages
1. Push this repo to GitHub on the `main` branch.
2. In the repo, go to Settings, then Pages, and set Source to "GitHub Actions".
3. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push.

## Project structure
```
src/
  main.jsx            entry point
  App.jsx             state and layout
  constants.js        categories and colors
  utils.js            formatting, storage helpers, sample data
  hooks/useLocalStorage.js
  components/         Header, Summary, DailyChart, ExpenseList, ExpenseForm
  styles.css
```

To start with an empty tracker, remove the `seedExpenses` fallback in `App.jsx` and pass `[]` instead.
