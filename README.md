# Cisco Lifecycle Checker

Simple backend application to check Cisco device lifecycle status and software recommendations.

## Purpose

This project is built as part of my transition from networking to software development.  
The goal is to create a small but practical tool that connects real-world infrastructure problems with backend development.

## Tech Stack

- Node.js
- Express.js
- EJS (templating)
- Mock data (JSON)

## Current Status

🚧 In development (Week 1 – basic server setup)

## Planned Features

- Input Cisco PID and installed software version
- Fetch lifecycle (EoX) information
- Suggest recommended software version
- Display device status (supported / outdated / EoX)
- Store history of checks

## How to run

```bash
npm install
npm start

Then open:
http://localhost:3000