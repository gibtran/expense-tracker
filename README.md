# Expense Tracker

A full-stack web application for managing personal expenses. Users can register, log in, and perform full CRUD operations on their expenses.

## Tech Stack

**Backend**

- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication
- bcryptjs (password hashing)

**Frontend**

- React 18 + TypeScript
- Vite
- Axios
- React Router DOM v6
- Tailwind CSS v4

---

## Project Structure

```
expense_tracker/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma           # User and Expense model definitions
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts  # Register and login logic
│   │   │   └── expense.controller.ts # CRUD logic for expenses
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts  # Verify JWT, attach req.user
│   │   ├── prisma/
│   │   │   └── client.ts           # PrismaClient singleton
│   │   ├── routes/
│   │   │   ├── auth.routes.ts      # POST /register, POST /login
│   │   │   └── expense.routes.ts   # GET/POST/PUT/DELETE /expenses
│   │   ├── types/
│   │   │   └── index.ts            # AuthRequest interface
│   │   └── index.ts                # Entry point, starts Express server
│   ├── .env                        # Environment variables (not committed)
│   ├── .env.example                # .env template
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── layout/
    │   │       └── PrivateRoute.tsx # Redirects to /login if not authenticated
    │   ├── context/
    │   │   └── AuthContext.tsx      # Global auth state (user, token, login, logout)
    │   ├── hooks/
    │   │   └── useExpenses.ts       # Custom hook for fetch/add/edit/remove expenses
    │   ├── pages/
    │   │   ├── LoginPage.tsx        # Login page
    │   │   ├── RegisterPage.tsx     # Register page
    │   │   └── DashboardPage.tsx    # Main page, displays and manages expenses
    │   ├── services/
    │   │   ├── api.ts               # Axios instance, interceptor auto-attaches JWT token
    │   │   ├── auth.service.ts      # Calls register/login API
    │   │   └── expense.service.ts   # Calls CRUD expenses API
    │   ├── types/
    │   │   ├── index.ts             # User, Expense, Category, CreateExpenseDto, UpdateExpenseDto
    │   ├── App.tsx                  # Router setup, wraps AuthProvider
    │   ├── main.tsx                 # React entry point, mounts to #root
    │   └── index.css               # Imports Tailwind CSS
    ├── vite.config.ts              # Vite config, proxies /api → localhost:8000
    └── package.json
```

---

## API Endpoints

**Auth** (`/api/auth`)
| Method | Endpoint | Description | Auth |
|--------|-------------|-------------------|------|
| POST | `/register` | Register a new account | ❌ |
| POST | `/login` | Log in | ❌ |

**Expenses** (`/api/expenses`)
| Method | Endpoint | Description | Auth |
|--------|----------|---------------------|------|
| GET | `/` | Get all expenses | ✅ |
| POST | `/` | Create a new expense | ✅ |
| PUT | `/:id` | Update an expense | ✅ |
| DELETE | `/:id` | Delete an expense | ✅ |

**Health check**
| Method | Endpoint | Description |
|--------|---------------|-----------------|
| GET | `/api/health` | Check server status |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 16

### 1. Clone the repo

```bash
git clone <repo-url>
cd expense_tracker
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```env
DATABASE_URL="postgresql://<username>@localhost:5432/expense_tracker"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="7d"
PORT=8000
NODE_ENV=development
```

Run migrations and start the server:

```bash
npm run db:migrate     # create tables in the database
npm run dev            # start the server (port 8000)
```

### 3. Set up the Frontend

```bash
cd frontend
npm install
npm run dev            # start the app (port 3000)
```

### 4. Open in browser

```
http://localhost:3000
```

---

## Scripts

**Backend**
| Script | Description |
|--------|-------|
| `npm run dev` | Start server with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

**Frontend**
| Script | Description |
|--------|-------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
