# Expense Tracker

Full-stack web app để quản lý chi tiêu cá nhân. Người dùng có thể đăng ký, đăng nhập, và thực hiện CRUD cho các khoản chi tiêu của mình.

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

## Cấu trúc thư mục

```
expense_tracker/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma           # Định nghĩa models User và Expense
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts  # Logic register và login
│   │   │   └── expense.controller.ts # Logic CRUD expenses
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts  # Verify JWT, gắn req.user
│   │   ├── prisma/
│   │   │   └── client.ts           # PrismaClient singleton
│   │   ├── routes/
│   │   │   ├── auth.routes.ts      # POST /register, POST /login
│   │   │   └── expense.routes.ts   # GET/POST/PUT/DELETE /expenses
│   │   ├── types/
│   │   │   └── index.ts            # AuthRequest interface
│   │   └── index.ts                # Entry point, khởi động Express server
│   ├── .env                        # Biến môi trường (không commit)
│   ├── .env.example                # Template .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── layout/
    │   │       └── PrivateRoute.tsx # Redirect về /login nếu chưa đăng nhập
    │   ├── context/
    │   │   └── AuthContext.tsx      # Global auth state (user, token, login, logout)
    │   ├── hooks/
    │   │   └── useExpenses.ts       # Custom hook fetch/add/edit/remove expenses
    │   ├── pages/
    │   │   ├── LoginPage.tsx        # Trang đăng nhập
    │   │   ├── RegisterPage.tsx     # Trang đăng ký
    │   │   └── DashboardPage.tsx    # Trang chính, hiển thị và quản lý expenses
    │   ├── services/
    │   │   ├── api.ts               # Axios instance, interceptor tự gắn JWT token
    │   │   ├── auth.service.ts      # Gọi API register/login
    │   │   └── expense.service.ts   # Gọi API CRUD expenses
    │   ├── types/
    │   │   ├── index.ts             # User, Expense, Category, CreateExpenseDto, UpdateExpenseDto
    │   ├── App.tsx                  # Router setup, bọc AuthProvider
    │   ├── main.tsx                 # Entry point React, mount vào #root
    │   └── index.css               # Import Tailwind CSS
    ├── vite.config.ts              # Vite config, proxy /api → localhost:8000
    └── package.json
```

---

## API Endpoints

**Auth** (`/api/auth`)
| Method | Endpoint | Mô tả | Auth |
|--------|-------------|-------------------|------|
| POST | `/register` | Đăng ký tài khoản | ❌ |
| POST | `/login` | Đăng nhập | ❌ |

**Expenses** (`/api/expenses`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|---------------------|------|
| GET | `/` | Lấy tất cả expenses | ✅ |
| POST | `/` | Tạo expense mới | ✅ |
| PUT | `/:id` | Cập nhật expense | ✅ |
| DELETE | `/:id` | Xóa expense | ✅ |

**Health check**
| Method | Endpoint | Mô tả |
|--------|---------------|-----------------|
| GET | `/api/health` | Kiểm tra server |

---

## Cài đặt và chạy

### Yêu cầu

- Node.js >= 18
- PostgreSQL >= 16

### 1. Clone repo

```bash
git clone <repo-url>
cd expense_tracker
```

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

Tạo file `.env` (copy từ `.env.example`):

```env
DATABASE_URL="postgresql://<username>@localhost:5432/expense_tracker"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="7d"
PORT=8000
NODE_ENV=development
```

Chạy migration và khởi động:

```bash
npm run db:migrate     # tạo bảng trong database
npm run dev            # chạy server (port 8000)
```

### 3. Cài đặt Frontend

```bash
cd frontend
npm install
npm run dev            # chạy app (port 3000)
```

### 4. Mở trình duyệt

```
http://localhost:3000
```

---

## Scripts

**Backend**
| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy server với hot-reload |
| `npm run build` | Build TypeScript sang JavaScript |
| `npm run db:migrate` | Chạy Prisma migration |
| `npm run db:studio` | Mở Prisma Studio (GUI database) |

**Frontend**
| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy Vite dev server |
| `npm run build` | Build production |
| `npm run preview` | Preview bản build |
