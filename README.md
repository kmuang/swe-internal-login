# Northstar Register / Login

Northstar is a small authentication and engineering-workspace demo built with
Next.js, React, and TypeScript. It includes a responsive register/login screen
and a sample workspace with an overview dashboard, profile, and task list.

## Getting started

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available commands

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Demo behavior

The register and login forms submit to `/api/register` and `/api/login`.
Those routes validate the submitted fields and return a user for the sample
workspace, but they do not store accounts, verify passwords, or create a
persistent session. Workspace tasks are also held in client-side state and
reset when the page is reloaded. This project is a UI/API demo, not a
production-ready authentication system.
