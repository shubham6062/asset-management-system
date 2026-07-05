# 🗂️ AssetLedger

**A full-stack asset inventory management system** for tracking company hardware — laptops, desktops, routers, printers, and more. Built with the MERN stack (MongoDB, Express, React, Node.js).


---

## ✨ Features

- 🔐 **JWT authentication** with bcrypt password hashing
- 👥 **Role-based access control** — Admins manage assets & users, regular users get read/search access
- 📦 **Full asset CRUD** — add, view, edit, delete assets
- 🔎 **Search** by asset name, ID, owner, or category
- 📊 **Dashboard** with live counts (total / assigned / available / under repair) and a recent-assets feed
- 🏷️ Asset classification (Public / Internal / Confidential / Restricted) and status tracking (Available / Assigned / Under Repair / Retired)
- 🧑‍💼 **User management** panel for admins (promote/demote roles, remove users)

## 🖥️ Tech Stack

| Layer      | Technology                                      |
|------------|--------------------------------------------------|
| Frontend   | React 18, Vite, React Router, Tailwind CSS, Axios |
| Backend    | Node.js, Express                                  |
| Database   | MongoDB with Mongoose                             |
| Auth       | JSON Web Tokens (JWT), bcrypt                     |

## 📁 Project Structure

```
asset-management-system/
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── components/      # Navbar, Sidebar, AssetCard, ProtectedRoute
│       ├── pages/           # Home, Login, Dashboard, Assets, AddAsset, EditAsset, Users, Profile, About
│       ├── context/         # AuthContext (login state, role checks)
│       └── services/        # Axios API client
│
└── server/                 # Express backend
    ├── config/              # MongoDB connection
    ├── models/              # User, Asset (Mongoose schemas)
    ├── controllers/         # Business logic for auth, assets, users
    ├── routes/              # API route definitions
    ├── middleware/          # JWT auth + admin-only guard
    └── seed.js              # Creates the first admin account
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A MongoDB database — [install locally](https://www.mongodb.com/try/download/community) or use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/asset-management-system.git
cd asset-management-system
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```env
MONGO_URI=mongodb://localhost:27017/asset_management
JWT_SECRET=some_long_random_string
PORT=5000
```

Create the first admin account:

```bash
node seed.js
```

This creates:
- **Email:** `admin@example.com`
- **Password:** `Admin@123`

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Set up the frontend

In a new terminal:

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies `/api` requests to the backend.

### 4. Log in

Visit `http://localhost:5173`, click **Log in**, and use the admin credentials above. Remember to change the password after your first login.

## 🔌 API Reference

| Method | Endpoint                    | Access     | Description                    |
|--------|------------------------------|------------|---------------------------------|
| POST   | `/api/auth/register`         | Public     | Create a user account           |
| POST   | `/api/auth/login`            | Public     | Log in, returns a JWT           |
| GET    | `/api/auth/profile`          | Logged in  | Get the current user            |
| GET    | `/api/assets`                | Logged in  | List/search assets              |
| GET    | `/api/assets/stats/summary`  | Logged in  | Dashboard counts + recent assets|
| GET    | `/api/assets/:id`            | Logged in  | Get one asset                   |
| POST   | `/api/assets`                | Admin      | Create an asset                 |
| PUT    | `/api/assets/:id`            | Admin      | Update an asset                 |
| DELETE | `/api/assets/:id`            | Admin      | Delete an asset                 |
| GET    | `/api/users`                 | Admin      | List all users                  |
| PUT    | `/api/users/:id`             | Admin      | Update a user's role/name       |
| DELETE | `/api/users/:id`             | Admin      | Remove a user                   |

## 🗄️ Data Model

**Asset**

| Field          | Type   | Notes                                                  |
|----------------|--------|---------------------------------------------------------|
| assetId        | String | Unique, e.g. `LAP-001`                                   |
| assetName      | String | e.g. `Dell Latitude`                                     |
| category       | String | e.g. `Laptop`, `Router`, `Printer`                       |
| owner          | String | Person or department                                     |
| classification | Enum   | `Public` / `Internal` / `Confidential` / `Restricted`     |
| status         | Enum   | `Available` / `Assigned` / `Under Repair` / `Retired`     |

**User**

| Field    | Type   | Notes                          |
|----------|--------|----------------------------------|
| name     | String |                                  |
| email    | String | Unique                          |
| password | String | Hashed with bcrypt              |
| role     | Enum   | `admin` / `user`                |

## 🗺️ Roadmap

- [ ] Pagination for large asset lists
- [ ] "Change password" flow for logged-in users
- [ ] File/photo upload per asset
- [ ] Audit log of asset edits
- [ ] CSV export of the asset list
- [ ] Deploy live demo (Vercel + Render + Atlas)

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change, then submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
