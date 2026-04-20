# 🏗 System Design & Architecture

## Distributed Lock Manager – Technical Deep Dive

This document provides an in-depth overview of the system design, internal architecture, and decision-making behind the Distributed Lock Manager.

---

## 🎯 Design Goals

The system is designed with the following objectives:

* **Consistency** – Ensure only one owner can hold a lock at a time
* **Fault Tolerance** – Recover from crashes using TTL expiration
* **Scalability** – Handle increasing lock requests efficiently
* **Observability** – Provide real-time system insights
* **Extensibility** – Allow easy integration of new strategies

---

## 🧩 High-Level Architecture

```text
Clients (UI / API Consumers)
            │
            ▼
     API Gateway (Express)
            │
            ▼
     Lock Service Layer
   ┌────────┼────────┐
   ▼        ▼        ▼
Lock DB   Policy   Deadlock Engine
(Mongo)  Manager     (Graph-based)
```

---

## 🔑 Core Components

### 1. Lock Service

Responsible for handling all lock operations:

* Acquire lock
* Release lock
* Renew lease
* Validate ownership

Implements **atomic operations** to ensure consistency.

---

### 2. Lock Store (MongoDB)

Stores:

* Active locks
* Expiry timestamps
* Waiting queues
* Ownership metadata

**Why MongoDB?**

* Flexible schema
* Easy TTL implementation
* Quick prototyping

---

### 3. Deadlock Detection Engine

Uses a **Wait-For Graph**:

* Nodes → Clients
* Edges → Dependency (who is waiting for whom)

Cycle detection algorithm identifies deadlocks.

---

### 4. Policy Manager

Controls runtime behavior:

* TTL duration
* Retry limits
* Deadlock resolution strategy

Supports dynamic updates without restarting the server.

---

### 5. Metrics Collector

Tracks:

* Lock acquisition attempts
* Conflicts
* Deadlocks
* Expired locks
* System uptime

Enables observability and debugging.

---

## 🔄 Lock Lifecycle

```text
[Request Lock]
      │
      ▼
[Check Availability]
   │         │
   │         └──> [Locked] → Add to Queue
   ▼
[Grant Lock]
   │
   ▼
[Start TTL Timer]
   │
   ├──> [Renew] → Extend TTL
   ├──> [Release] → Free Lock
   └──> [Expire] → Auto Cleanup
```

---

## ⚠️ Deadlock Handling Strategy

### Detection

* Periodic graph scan
* Triggered on conflict spikes

### Resolution

* Select victim based on:

  * Oldest lock
  * Least priority
  * Retry count

Victim’s lock is forcefully released.

---

## 📈 Scalability Considerations

Current system is **single-instance**, but can be extended:

### Horizontal Scaling Ideas

* Use **Redis (SETNX)** for distributed locks
* Introduce **message queues** (Kafka/RabbitMQ)
* Partition locks by resource key (sharding)

---

## 🛡 Failure Handling

| Failure Type   | Handling Strategy      |
| -------------- | ---------------------- |
| Client Crash   | TTL expiration         |
| Server Restart | Persistent DB recovery |
| Deadlock       | Detection + resolution |
| Network Delay  | Retry + queue system   |

---

## 🔍 Trade-offs

| Decision           | Trade-off                 |
| ------------------ | ------------------------- |
| MongoDB over Redis | Simplicity vs performance |
| Centralized design | Easier control vs SPOF    |
| TTL-based cleanup  | Simplicity vs precision   |

---

## 🚀 Future Architecture Enhancements

* Distributed lock coordination using Redis Cluster
* Leader election (Raft / ZooKeeper style)
* Multi-region deployment
* Event-driven architecture
* Observability with Prometheus + Grafana

---

## 🧠 Key Takeaways

This system demonstrates:

* Practical distributed system challenges
* Real-world concurrency control mechanisms
* Trade-offs in backend design
* Importance of monitoring and recovery

---

## 📌 Summary

The Distributed Lock Manager is a **modular, extensible system** that simulates real-world backend coordination challenges and solutions.

It provides a strong foundation for scaling into production-grade distributed infrastructure.
