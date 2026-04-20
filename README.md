# 🚀 Distributed Lock Manager (Enterprise-Style Backend System)

A **high-reliability distributed locking system** designed to coordinate concurrent access to shared resources across services. Built with scalability, fault tolerance, and observability in mind.

This project simulates real-world backend infrastructure patterns used in **distributed systems, microservices, and cloud platforms**.

---

## 📌 Why This Project Matters

Modern distributed systems frequently face **concurrency challenges** when multiple services attempt to modify the same resource.

Without proper coordination, systems suffer from:

* ❌ Race conditions
* ❌ Data inconsistency
* ❌ Deadlocks
* ❌ Resource starvation
* ❌ System instability

This project introduces a **centralized lock orchestration layer** that ensures safe and predictable access to shared resources.

---

## 🧠 Key Capabilities

### 🔐 Distributed Lock Lifecycle Management

* Atomic lock acquisition
* Secure lock release
* Lease renewal mechanism
* Ownership validation
* FIFO-based waiting queue

---

### ⏳ Intelligent Lock Expiration (TTL)

* Configurable lease duration
* Automatic recovery of abandoned locks
* Prevents resource blocking due to crashed clients

---

### ⚔️ Conflict Resolution Engine

* Detects concurrent acquisition attempts
* Rejects conflicting requests safely
* Tracks contention metrics
* Maintains queue of blocked clients

---

### 🔄 Deadlock Detection System

* Builds dynamic **Wait-For Graphs**
* Detects circular dependencies in real time

**Example Scenario:**

```
Client A → waiting for Client B
Client B → waiting for Client A

➡ Deadlock Detected
```

---

### 🛠 Deadlock Resolution Strategies

#### Manual Mode

* Admin selects victim process
* Fine-grained control

#### Automatic Mode

* System selects victim using predefined policy
* Ensures minimal disruption

---

### ⚙️ Policy Configuration Engine

Runtime-configurable system behavior:

* Lock TTL duration
* Retry attempts
* Deadlock resolution strategy

---

### 📊 Observability & Metrics Dashboard

Real-time insights into system behavior:

* Active locks
* Lock acquisition attempts
* Conflict frequency
* Release operations
* Renewal activity
* Expired lock reclamation
* Server uptime

---

### 🧪 Operational Automation (DevOps Ready)

Prebuilt scripts for operational workflows:

* Health monitoring
* Lock inspection
* Deadlock detection
* Stale resource cleanup
* Deployment automation
* Database backup (extensible)

---

## 🏗 System Architecture

```
         ┌─────────────────────────────┐
         │   Clients / Admin Panel     │
         │   (UI / Postman / Scripts)  │
         └─────────────┬───────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   Express API   │
              └────────┬────────┘
                       │
                       ▼
           ┌──────────────────────┐
           │ Lock Service Engine  │
           │ - Conflict Handling  │
           │ - Deadlock Detection │
           │ - TTL व्यवस्थापन     │
           └────────┬─────────────┘
                    │
                    ▼
             ┌──────────────┐
             │   MongoDB    │
             │ Persistence  │
             └──────────────┘
```

---

## 🧰 Technology Stack

### Backend

* Node.js (Runtime)
* Express.js (API Layer)
* MongoDB (Data Store)
* Mongoose (ODM)

### Frontend (Admin Dashboard)

* React (UI Framework)
* Vite (Build Tool)
* Axios (HTTP Client)

### DevOps & Tooling

* PowerShell Automation
* Docker (Deployment Ready)
* Git Version Control
* Postman (API Testing)

---

## 📁 Project Structure

```
distributed-lock-manager/
│
├── backend/
│   ├── modules/
│   │   ├── locks/
│   │   ├── deadlocks/
│   │   ├── policies/
│   │   └── logs/
│   ├── middleware/
│   ├── config/
│   └── utils/
│
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── api/
│   └── styles/
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
```

---

## ⚡ Getting Started

### Clone the Repository

```bash
git clone https://github.com/LalitMohanAgnihotri/distributed-lock-manager
cd distributed-lock-manager
```

---

### ▶ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Runs on: `http://localhost:5000`

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:5173`

---

## 🔗 API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | `/health`            | Service health check |
| POST   | `/locks/acquire`     | Acquire lock         |
| POST   | `/locks/release`     | Release lock         |
| POST   | `/locks/renew`       | Renew lock lease     |
| GET    | `/locks`             | List active locks    |
| GET    | `/metrics`           | System metrics       |
| GET    | `/deadlocks`         | Detect deadlocks     |
| POST   | `/deadlocks/resolve` | Resolve deadlock     |
| GET    | `/policies`          | Fetch policy config  |
| PUT    | `/policies`          | Update policy config |

---

## 🧪 Automation Scripts

```powershell
cd scripts

.\healthcheck.ps1
.\monitor-locks.ps1
.\detect-deadlocks.ps1
.\stale-locks.ps1
.\deploy.ps1
```

---

## 🔮 Future Enhancements

* Redis-based distributed locking (SETNX)
* Role-based authentication & access control
* WebSocket-based real-time updates
* Cloud-native deployment (AWS / GCP)
* CI/CD pipeline integration
* Unit & integration testing suite

---

## 👨‍💻 Author

**Lalit Mohan Agnihotri**
**Kohinoor Tiwari**

---

## 🏁 Final Note

This project demonstrates core concepts of:

* Distributed coordination
* Concurrency control
* Fault tolerance
* Backend system design

Designed not just as an academic project, but as a **foundation for real-world scalable systems**.
