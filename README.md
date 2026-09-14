# FlyRank Task API

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933)
![Express](https://img.shields.io/badge/Express-5-000000)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A small in-memory **CRUD REST API** for managing to-do tasks, built for the FlyRank internship backend track (Week 2, Assignment A1).

## Overview

Deliberately minimal: a single `index.js` implements full CRUD with input validation, proper HTTP status codes, and interactive Swagger docs — a clean demonstration of REST API fundamentals without extra framework overhead.

## Features

- Full CRUD on tasks (`id`, `title`, `done`)
- Input validation → `400` on bad input, `404` on missing resources
- Interactive API docs via Swagger UI at `/docs`
- In-memory storage (intentionally simple — resets on restart)
- Automated test suite using Node's built-in test runner

## Tech stack

Node.js · Express 5 · swagger-ui-express · `node:test` (no external test framework needed)

## Project structure

```
index.js            Express app + all routes; exports `app` for testing
openapi.json         OpenAPI 3 spec (served at /docs)
test/
  api.test.js        Node test-runner suite (health, CRUD lifecycle, validation)
docs/                Swagger UI mount point
```

## API endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | API info |
| GET | `/health` | Health check |
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task's title and/or done status |
| DELETE | `/tasks/:id` | Delete a task |

## Getting started

```bash
npm install
npm start
# API:     http://localhost:3000
# Swagger: http://localhost:3000/docs
```

Run tests:

```bash
npm test
```

Set a custom port with the `PORT` environment variable.

## Known limitations

- Storage is in-memory only — all data is lost on restart (by design, for the assignment scope).
- No authentication.

## Possible next steps

- Swap in-memory storage for SQLite so data survives restarts
- Add pagination to `GET /tasks`

## License

MIT — see `LICENSE`.
