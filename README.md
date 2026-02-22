# NorthStar Client Portal

## Project Overview
NorthStar Client Portal is an internal web application for managing client records.  
It uses a **Node.js/Express backend** with **MongoDB/Mongoose** for data persistence, and an **Angular frontend** for dynamic client-side rendering.  
The system allows advisors and compliance teams to **create, read, update, and delete client records**, while providing search and filtering by risk category.

## Installation Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd NorthStar_Angular_Mongo

2. Install backend dependencies:

cd backend
npm install

3. Install frontend dependencies:

cd ../frontend
npm install

4. Set up environment variables for backend:
Create a .env file in backend/ with:

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/northstar

5. Seed the database with initial clients (optional):

cd ../backend
node scripts/seed.js
##Application Startup Instructions
##Backend (API)
cd backend
node app.js

Runs on http://localhost:3000

API endpoints are prefixed with /api/clients

## Frontend (Angular)

For development:

cd frontend
ng serve

Runs on http://localhost:4200

For production build:

cd frontend
ng build --configuration production

Build output is in frontend/dist/northstar-frontend

Can be served with any static server or integrated with Express for SSR.

##List of Implemented Routes
##Backend API Routes

GET /api/clients — List all clients, supports query params riskCategory and q (search)

GET /api/clients/:id — Get client by ID

POST /api/clients — Create a new client

PUT /api/clients/:id — Update a client

DELETE /api/clients/:id — Delete a client

##Frontend Routes (Angular)

/ — Home page

/clients — Client directory (list)

/clients/new — Create new client

/clients/:id — View client details

/clients/:id/edit — Edit client details

## Note: MongoDB must be running locally or accessible via MONGODB_URI.
Angular frontend communicates with the backend via REST API endpoints.
