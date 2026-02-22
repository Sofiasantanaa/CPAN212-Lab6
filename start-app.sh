#!/bin/bash
set -e

echo "==============================="
echo "NorthStar Client Portal Startup"
echo "==============================="

# Always run from the folder where this script is located
cd "$(dirname "$0")"

# ---- Check required folders ----
if [ ! -d "backend" ]; then
  echo "ERROR: backend folder not found."
  exit 1
fi

if [ ! -d "frontend" ]; then
  echo "ERROR: frontend folder not found."
  exit 1
fi

# ---- Check MongoDB (port 27017) ----
echo ""
echo "Checking MongoDB on port 27017..."

if command -v lsof >/dev/null 2>&1; then
  if ! lsof -nP -iTCP:27017 -sTCP:LISTEN >/dev/null 2>&1; then
    echo "MongoDB is not listening on port 27017."
    echo "Start MongoDB first (service/Docker), then try again."
    echo "Examples:"
    echo "  brew services start mongodb-community"
    echo "  docker start mongo"
    exit 1
  fi
else
  echo "WARNING: lsof not found. Skipping MongoDB port check."
  echo "Backend may fail if MongoDB is not running."
fi

echo "MongoDB is running."

# ---- Start Backend ----
echo ""
echo "Starting Backend..."
cd backend

if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
fi

# Start backend in background and save PID
npm start &
BACKEND_PID=$!

# Wait for backend to initialize
sleep 6

# ---- Verify Backend Health ----
echo ""
echo "Verifying backend health endpoint..."
if ! curl -fsS http://localhost:3000/health >/dev/null 2>&1; then
  echo "Backend is not responding on http://localhost:3000/health"
  echo "Check backend logs above."
  kill $BACKEND_PID >/dev/null 2>&1 || true
  exit 1
fi

echo "Backend is healthy."

# ---- Start Frontend ----
echo ""
echo "Starting Frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

npm start &
FRONTEND_PID=$!

# Wait for Angular dev server
sleep 8

# ---- Open Browser ----
echo ""
echo "Opening browser..."
open "http://localhost:4200" >/dev/null 2>&1 || true

echo ""
echo "==================================="
echo "Application successfully started."
echo "Backend PID:  $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "==================================="
echo ""
echo "To stop:"
echo "  kill $BACKEND_PID $FRONTEND_PID"