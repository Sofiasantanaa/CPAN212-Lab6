# NorthStar Client Portal (Angular + Express API + MongoDB)

This version removes **EJS entirely** and uses a **true Angular front end**.

## Architecture

- **frontend/**: Angular UI (routes, pages, forms, CRUD screens)
- **backend/**: Express REST API + MongoDB persistence (Mongoose)

## Prerequisites

- Node.js (LTS recommended)
- MongoDB running locally **or** a MongoDB Atlas connection string
- Angular CLI (optional but recommended): `npm i -g @angular/cli`

## Backend Setup (Express + MongoDB)

```bash
cd backend
npm install
cp .env.example .env
# update MONGODB_URI if needed
npm start
```

Optional seed from `backend/data/clients.json`:

```bash
npm run seed
```

API will be available at:
- `http://localhost:3000/health`
- `http://localhost:3000/api/clients`

## Frontend Setup (Angular)

```bash
cd frontend
npm install
npm start
```

Angular will run at:
- `http://localhost:4200`

A proxy configuration is included so the Angular UI can call the API using `/api/...` without CORS issues.

## Routes (Angular)

- `/` Home
- `/clients` Client list + filters
- `/clients/new` Create client
- `/clients/:id` Client details
- `/clients/:id/edit` Edit client

## API Endpoints (Express)

- `GET /api/clients` (supports `?riskCategory=High` and `?q=searchText`)
- `GET /api/clients/:id`
- `POST /api/clients`
- `PUT /api/clients/:id`
- `DELETE /api/clients/:id`

## Notes

- `clientRef` is enforced unique in MongoDB.
- Risk category is displayed as a badge in list/detail screens.
