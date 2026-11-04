# KODBRAND — Creative Advertising & Brand Solutions
## Minimal Full MERN Stack Architecture (MongoDB, Express, React, Node.js)

Built cleanly for senior developers: minimal boilerplate, zero bloat, strict separation of concerns, and full resilience.

---

## 🏗️ Architecture Overview

```
d:/kodportfolio/
├── server/                         # Node.js + Express + Mongoose
│   ├── models/
│   │   ├── Project.js              # Portfolio Project Mongoose Schema
│   │   └── Lead.js                 # Inquiries & Client Leads Schema
│   ├── routes/
│   │   ├── projects.js             # RESTful Projects CRUD + /seed
│   │   └── leads.js                # Inquiry ingestion + status pipeline
│   ├── data/
│   │   └── seedData.js             # 10 core case studies seed
│   ├── server.js                   # Express app, Mongo connection & dist fallback
│   ├── .env                        # Environment variables
│   └── package.json
│
├── client/                         # React 18 + Vite SPA
│   ├── public/                     # Optimized logos, favicons & artwork
│   ├── src/
│   │   ├── components/             # Modular React functional components
│   │   │   ├── Header.jsx          # Dynamic theme toggle, navigation, mobile drawer
│   │   │   ├── Hero.jsx            # Value proposition, showreel trigger, marquee
│   │   │   ├── About.jsx           # Philosophy narrative, animated stats, 3 pillars
│   │   │   ├── Works.jsx           # MongoDB API integration + category filtering
│   │   │   ├── Services.jsx        # 6 core service pillars
│   │   │   ├── Expertise.jsx       # Tools, marketing suite, multilingual reach
│   │   │   ├── Vision.jsx          # Vision spotlight & 6 strategic goals
│   │   │   ├── Contact.jsx         # Project scope planner + Mongo lead save + WhatsApp
│   │   │   ├── Footer.jsx          # Brand summary, links, social handles
│   │   │   └── WorkModal.jsx       # Case study detail modal lightbox
│   │   ├── data/                   # Fallback data for offline resilience
│   │   ├── App.jsx                 # App root & state
│   │   ├── main.jsx                # React DOM entry
│   │   └── index.css               # Agency design tokens, CSS variables, dark/light modes
│   ├── vite.config.js              # Vite config with /api reverse proxy
│   └── package.json
│
├── package.json                    # Root monorepo scripts
└── README.md
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check, DB connection state, stack info |
| `GET` | `/api/projects` | Fetch all projects (Supports `?category=video|brand|social|web`) |
| `GET` | `/api/projects/:slug` | Fetch single project by unique slug |
| `POST` | `/api/projects` | Create a new portfolio case study |
| `PUT` | `/api/projects/:id` | Update an existing project |
| `DELETE`| `/api/projects/:id` | Remove a project |
| `POST` | `/api/projects/seed` | Reset & re-seed database with default 10 case studies |
| `POST` | `/api/leads` | Ingest new client proposal / inquiry |
| `GET` | `/api/leads` | List all leads (sorted by newest first) |
| `PATCH`| `/api/leads/:id/status`| Update lead pipeline status (`new`, `contacted`, `converted`) |

---

## ⚙️ Quick Start

### 1. Unified Production Server (Current Live Mode)
Runs both the Express API and the compiled React frontend on port `5000`:
```bash
cd server
npm start
```
Visit: [http://localhost:5000](http://localhost:5000)

### 2. Development Mode with Hot Module Replacement (HMR)
Run backend and frontend independently for live editing:

**Terminal 1 (Backend API):**
```bash
cd server
npm run dev
# Running on http://localhost:5000
```

**Terminal 2 (React Vite Frontend):**
```bash
cd client
npm run dev
# Running on http://localhost:5173 with proxy to :5000
```

---

## 🌿 MongoDB Configuration

Default connection string configured in `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/kodbrand
```
*Auto-seeds on initial boot if the `projects` collection is empty.*
