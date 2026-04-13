@echo off
REM ===== SolarARK Backend Startup Script =====
REM This script starts both the Auth Server (Port 5000) and Forms Server (Port 5800)

color 0A
title SolarARK Backend Servers

echo.
echo ╔════════════════════════════════════════╗
echo ║  SolarARK Backend Server Startup       ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b
)

REM Check if npm is installed
npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed!
    pause
    exit /b
)

echo ✅ Node.js and npm found
echo.
echo Installing dependencies...
call npm install

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Starting Servers...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Start Auth Server in new window
echo 📦 Starting Auth Server (Port 5000)...
start "SolarARK - Auth Server (5000)" cmd /k "@echo off & title Auth Server & set NODE_ENV=development & node authServer.js & pause"

REM Wait a bit before starting second server
timeout /t 2 /nobreak

REM Start Forms Server in new window
echo 📦 Starting Forms Server (Port 5800)...
start "SolarARK - Forms Server (5800)" cmd /k "@echo off & title Forms Server & set NODE_ENV=development & node formServer.js & pause"

echo.
echo ✅ Both servers are starting!
echo.
echo 📝 Server URLs:
echo    • Auth Server:   http://localhost:5000
echo    • Forms Server:  http://localhost:5800
echo    • Frontend:      http://localhost:5173
echo.
echo 📋 To check if servers are running:
echo    • Auth:  curl http://localhost:5000/health
echo    • Forms: curl http://localhost:5800/health
echo.
echo 🛑 To stop servers, close the command windows
echo.
pause
