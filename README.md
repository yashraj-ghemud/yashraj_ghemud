<p align="center">
  <img src="./.github/readme-assets/signal.gif" alt="Animated signal / product visual for yashraj_ghemud" width="100%" />
</p>

<h1 align="center">yashraj_ghemud</h1>

<p align="center"><strong>Small Express + MongoDB backend implementing user authentication, posts and comments. Project is organized into src with models, routes, middleware and a simple server bootstrap (src/server.js). README is minimal.</strong></p>

<p align="center"><code>REPO//SIGNAL</code> · <code>SIGNAL / PRODUCT</code> · <code>LOOPING README EXPERIENCE</code></p>

## Live signal

| Lens | Readout |
| --- | --- |
| Portfolio lane | **SIGNAL / PRODUCT** |
| Code surface | **14** tracked files observed |
| Primary materials | **JavaScript, JSON, Markdown** |
| Verification | **0** test-related files observed |

> A moving scan of the project surface. The animated frame above is a lightweight visual signature; the sections below remain the source of truth for implementation details.

## Motion map

`SIGNAL` → `SHAPE` → `RELEASE`

Use the animated banner as the first signal, then move into the implementation dossier. The recommended next step is to verify the documented setup command against the repository scripts before extending the project.

<details open>
<summary><strong>Open the full project dossier</strong></summary>

> Small Express + MongoDB backend implementing user authentication, posts and comments. Project is organized into src with models, routes, middleware and a simple server bootstrap (src/server.js). README is minimal.

## Overview

Provides user signup/login (JWT), protected profile route, create/list/delete posts, and add/list/update/delete comments. Admin-only post deletion is implemented. Uses JWT auth middleware and Mongoose models for User, Post and Comment.

## Key capabilities

- User signup and login with bcrypt-hashed passwords (src/routes/userRoutes.js)
- JWT-based authentication with middleware (src/middleware/auth.js)
- Profile endpoint for authenticated users (GET /api/users/profile)
- Create and list posts with embedded comments (src/models/Post.js and src/routes/postRoutes.js)
- Add/read/update/delete comments on posts (src/routes/commentRoutes.js)
- Admin-only post deletion logic (src/routes/postRoutes.js)

## Technology

- Node.js (CommonJS)
- Express 5
- MongoDB via mongoose
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- helmet, cors, morgan
- dotenv
- nodemon (dev)

## Repository structure

The following top-level files and directories were observed in the repository:

- `.gitignore`
- `README.md`
- `package-lock.json`
- `package.json`
- `src`
- `utils`

## Getting started

This repository includes a `package.json`. Install dependencies with the package manager declared by the project, then use the scripts below where applicable.

```bash
npm install
npm run dev
npm run start
```

Available package scripts:
- `npm run start` — node src/server.js
- `npm run dev` — nodemon src/server.js

## Configuration

Monolithic Express app. Entry point src/server.js configures middleware (helmet, morgan, CORS), registers routers (src/routes/*.js), and connects to MongoDB via Mongoose. Models live in src/models/*.js and auth logic in src/middleware/auth.js. Configuration values read from environment (dotenv) with a small config helper in src/config/config.js.

## Development and quality notes

- No dedicated test files were identified in the audited tree.
- No continuous-integration configuration was identified during the audit.

### Current improvement opportunities

- Add README.md instructions and add a .env.example documenting MONGO_URI_DEV/MONGO_URI_PROD, JWT_SECRET, PORT (files: README.md, .env.example)
- Centralize configuration usage: use src/config/config.js everywhere (modify src/middleware/auth.js and src/server.js to import config) to avoid inconsistent fallbacks
- Make error handling consistent: wrap all async route handlers in try/catch or add express-async-errors and a centralized error handler middleware (create src/middleware/errorHandler.js)
- Add input validation to routes (express-validator or Joi) to validate and sanitize incoming JSON (user signup/login, post/comment inputs)
- Remove, or justify, the 'git' dependency in package.json and run npm audit to review dependencies
- Add basic rate-limiting middleware (express-rate-limit) protecting auth endpoints

## Contributing

Before submitting changes, keep the implementation aligned with the existing project structure, add or update relevant tests where the project supports them, and describe any configuration changes in the pull request.

</details>

---

<p align="center"><sub>README motion system · visual layer by RepoSignal · implementation details remain project-specific</sub></p>
