@echo off
title NorthStar Client Portal Startup
setlocal

echo ===============================
echo NorthStar Client Portal Startup
echo ===============================

:: Always run from this file location
cd /d "%~dp0"

:: ---- Check Required Folders ----
if not exist "backend\" (
    echo ERROR: backend folder not found.
    pause
    exit /b 1
)

if not exist "frontend\" (
    echo ERROR: frontend folder not found.
    pause
    exit /b 1
)

:: ---- Check MongoDB (Port 27017 Listening) ----
echo.
echo Checking MongoDB on port 27017...

netstat -ano | find ":27017" | find "LISTENING" >nul

if %errorlevel% neq 0 (
    echo MongoDB is not running on port 27017.
    echo Please start MongoDB first.
    echo Example:
    echo   net start MongoDB
    echo   OR
    echo   docker start mongo
    pause
    exit /b 1
)

echo MongoDB is running.

:: ---- Start Backend ----
echo.
echo Starting Backend...
cd backend

if not exist "node_modules\" (
    echo Installing backend dependencies...
    call npm install
)

start "NorthStar Backend" cmd /k "npm start"

:: Wait for backend to initialize
timeout /t 6 >nul

:: ---- Verify Backend Health ----
echo.
echo Verifying backend health endpoint...

curl -s http://localhost:3000/health >nul 2>&1

if %errorlevel% neq 0 (
    echo Backend is not responding.
    echo Check backend terminal for errors.
    pause
    exit /b 1
)

echo Backend is healthy.

:: ---- Start Frontend ----
echo.
echo Starting Frontend...
cd ..\frontend

if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
)

start "NorthStar Frontend" cmd /k "npm start"

timeout /t 8 >nul

echo.
echo Opening browser...
start "" "http://localhost:4200"

echo.
echo ===================================
echo Application successfully started.
echo ===================================
pause