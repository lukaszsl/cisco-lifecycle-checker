# Cisco Lifecycle Checker

Simple backend application to check Cisco device lifecycle status and software recommendations.

## Purpose

This project is built as part of my transition from networking to software development.  
The goal is to create a small but practical tool that connects real-world infrastructure problems with backend development.

## Tech Stack

- Node.js
- Express.js
- EJS (templating)
- CSS (static assets)
- Mock data (JSON)

## Architecture

The application follows a simple layered structure:
- **Routes (Express)** – handle HTTP requests
- **Services** – business logic (lifecycle and version evaluation)
- **Repositories** – data access (mock JSON files)
- **Views (EJS)** – UI rendering
- **Public** – static assets (CSS)

## Current Status

🚧 In development (Week 2 – core functionality implemented)

### Current features:

- Web interface (EJS templates)
- Static asset support (CSS)
- Lifecycle (EoX) data lookup from mock data
- Suggested software version retrieval
- Version status evaluation:
  - `UP TO DATE`
  - `OUTDATED`
  - `UNKNOWN`

## Planned Features

- Add REST API endpoint
- Improve version comparison logic (semantic version parsing)
- Store history of checks
- Replace mock data with real vendor APIs (future)

## API (in progress)

Planned endpoint:
```http
GET /api/lifecycle?pid=<PID>&version=<VERSION>
```
Example:
```http
GET /api/lifecycle?pid=C9200L-24P-4G&version=17.6
```
Returns JSON with lifecycle data and version status.

## How to run

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## Example Usage

1. Enter Cisco PID (e.g. `C9200L-24P-4G`)
2. Optionally enter installed software version
3. View:
   - Lifecycle status
   - Suggested release
   - Version evaluation
