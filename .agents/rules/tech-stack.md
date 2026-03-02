---
description: Core technology stack and static architecture constraints for WhatsUpCy MVP.
trigger: always_on
---

# WhatsUpCy: Tech Stack & Architecture Rules

You are assisting with the greenfield MVP implementation of the WhatsUpCy event calendar. This is a purely static frontend application designed for GitHub Pages. Prioritize client-side architecture and strict Next.js static export compliance.

## 1. Core Principles
* **Strict Type Safety:** Use TypeScript for all files. Never generate `.js` or `.jsx` files. Enforce strict type checking and avoid `any`.
* **Static Architecture Constraint:** The application will be deployed to GitHub Pages. **Never** generate Next.js API routes (`app/api/*`), Server Actions, or utilize dynamic server functions (e.g., `cookies()`, `headers()`). 
* **Environment:** Local development utilizes Dev Containers. Ensure file paths and scripts are Linux-compatible.

## 2. Frontend Development (React & Next.js)
* **Framework:** Strictly use **Next.js 15+** with the **App Router**. Ensure `output: 'export'` is configured in `next.config.ts`.
* **Component Paradigm:** Use **React 18+** functional components and custom hooks. 
* **UI & Styling:** Use **Material-UI (MUI)** for base components. For all custom styling and theme overrides, strictly use **Emotion (CSS-in-JS)**. Do not use Tailwind CSS.
* **Calendar Integration:** For the main calendar interface, strictly use **FullCalendar** (`@fullcalendar/react` and plugins). Ensure its styling integrates cleanly with MUI/Emotion.

## 3. Data Management (Static MVP Phase)
* **Data Source:** All event data must be read from a static `events.json` file.
* **Data Fetching:** Place `events.json` in the `/public` directory. Fetch it client-side via standard `fetch('/events.json')` in a `useEffect` hook or React Query, OR import it directly into components at build time.
* **Database Constraint:** Do NOT configure or write code for a database or backend server. 
* **Type Definitions:** Structure `events.json` to map perfectly to strict TypeScript interfaces compatible with FullCalendar's expected event object structure.

## 4. Quality Assurance & Testing
* **Test Runner:** Use **Vitest**. Do not use Jest (though `jest-dom` matchers are permitted).
* **UI Testing:** Use **React Testing Library**. Focus tests on user behavior.
* **Coverage:** Always generate unit tests alongside new features.

## 5. DevOps & Infrastructure Target
* **Deployment Target:** **GitHub Pages**. 
* **CI/CD:** Use **GitHub Actions** strictly for linting, testing, running the Next.js static build (`next build`), and deploying the resulting `out/` directory to the `gh-pages` branch or GitHub Pages environment.
