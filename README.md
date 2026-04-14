# Distributed Lock Manager

A production-inspired backend system that manages distributed resource locking using **Node.js**, **Express**, and **MongoDB**.  
It prevents concurrent access conflicts, supports lock expiration, detects deadlocks, and provides an admin dashboard for real-time monitoring and control.

---

# Project Overview

In distributed systems, multiple users/services may try to access the same shared resource at the same time.  
Without coordination, this can cause:

- Data corruption
- Race conditions
- Inconsistent writes
- Resource starvation
- Deadlocks

This project solves those problems by implementing a centralized lock manager.

---

# Core Features

## Lock Management

- Acquire lock on a resource
- Release lock
- Renew lock lease
- Ownership validation
- Waiting queue for blocked requests

## Lock Expiration (TTL)

Each lock has a configurable expiry time.

If the owner crashes or never releases the lock, the lock expires automatically and can be reassigned.

## Conflict Handling

If another owner requests a locked resource:

- Request is denied
- Conflict metric increases
- Owner is added to waiting queue

## Deadlock Detection

System builds a **wait-for graph** and detects circular dependencies.

Example:

user1 waits for user2  
user2 waits for user1

=> Deadlock detected

## Deadlock Resolution

### Manual Mode
Admin selects victim process and resolves it.

### Automatic Mode
System detects deadlock and auto-selects a victim based on policy.

## Policy Management

Admin can configure:

- TTL Seconds
- Retry Count
- Deadlock Strategy

## Metrics Dashboard

Real-time monitoring of:

- Active locks
- Acquire requests
- Conflicts
- Releases
- Renewals
- Expired reclaims
- Server uptime

## Operations Scripts

PowerShell automation scripts included for:

- Health checks
- Lock monitoring
- Deadlock detection
- Stale lock inspection
- Deployment
- Backup (prepared)

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Frontend Admin Panel

- React
- Vite
- Axios
- CSS

## DevOps / Tools

- PowerShell Scripts
- Git
- Docker (deployment script ready)
- Postman

---

# System Architecture

```text
Client / Postman / Admin Panel
            |
            v
        Express API
            |
            v
     Lock Service Logic
            |
            v
        MongoDB Store
        distributed-lock-manager/
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── locks/
│   │   │   ├── deadlocks/
│   │   │   ├── policies/
│   │   │   └── logs/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── utils/
│   │   └── server.js
│
├── frontend/
│   └── src/
│       ├── pages/
│       ├── api/
│       ├── components/
│       └── styles/
│
├── scripts/
│   ├── deploy.ps1
│   ├── healthcheck.ps1
│   ├── monitor-locks.ps1
│   ├── detect-deadlocks.ps1
│   ├── stale-locks.ps1
│   └── backup-db.ps1
│
└── README.md

## Quick Start

### Clone Repository

```bash
git clone https://github.com/LalitMohanAgnihotri/distributed-lock-manager
cd distributed-lock-manager

Backend
cd backend
npm install
npm run dev
Runs on: http://localhost:5000

Frontend
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

Core APIs
Base URL: http://localhost:5000/api

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| GET    | `/health`            | Server health    |
| POST   | `/locks/acquire`     | Acquire lock     |
| POST   | `/locks/release`     | Release lock     |
| POST   | `/locks/renew`       | Renew lock       |
| GET    | `/locks`             | List locks       |
| GET    | `/metrics`           | System metrics   |
| GET    | `/deadlocks`         | Detect deadlocks |
| POST   | `/deadlocks/resolve` | Resolve deadlock |
| GET    | `/policies`          | Get policy       |
| PUT    | `/policies`          | Update policy    |

Scripts
cd scripts
.\healthcheck.ps1
.\monitor-locks.ps1
.\detect-deadlocks.ps1
.\stale-locks.ps1
.\deploy.ps1

Future Improvements
Redis SETNX lock backend
Authentication & roles
WebSocket live updates
Cloud deployment
CI/CD pipeline
Unit tests

Author
Lalit Mohan Agnihotri