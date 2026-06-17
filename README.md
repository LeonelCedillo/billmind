# BillMind

A full-stack bill reminder app that lets users define their bills and reminder schedules, and BillMind automatically sends email notifications through a pub/sub pipeline with support for shared reminders across multiple users.

<p align="center">
  <img src="client/public/bills.png" alt="Bills" width="65%"><br>
  <em>Dashboard</em>
</p>
<br>
<p align="center">
  <img src="client/public/bill_1.png" alt="Bill details" width="65%"><br>
  <em>Details</em>
</p>


## Motivation

Most brokerages and banks already send payment reminders, but only for their own services. I wanted something personal, a single place to track *all* types of bills (rent, utilities, subscriptions, insurance) with custom reminder schedules per bill. More importantly, I share expenses with family members and wanted a way to notify everyone involved automatically, not just myself.

I also kept missing upcoming payments and juggling reminders across different apps, so I built BillMind to bring everything into one place and make bill tracking simple, flexible, and easy to rely on.


## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker

See the [Contributing](#-contributing) section for full local setup instructions.


## 📖 Usage

### Architecture

BillMind uses an **event-driven pub/sub architecture** powered by RabbitMQ. Three independent services communicate through a topic exchange:

- **Server** — handles all REST API requests
- **Scheduler** — runs daily at 8am, checks for upcoming bills and publishes reminder events to RabbitMQ
- **Notifier** — subscribes to RabbitMQ and sends emails when reminder events arrive

Failed emails are routed to a Dead Letter Queue instead of being lost.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/revoke` | Logout |
| GET | `/api/bills` | Get all your bills |
| POST | `/api/bills` | Create a bill |
| GET | `/api/bills/:id` | Get bill details |
| PUT | `/api/bills/:id` | Update a bill |
| DELETE | `/api/bills/:id` | Delete a bill |
| POST | `/api/bills/:id/members` | Add a member by email |
| POST | `/api/bills/:id/reminders` | Add a reminder rule |


