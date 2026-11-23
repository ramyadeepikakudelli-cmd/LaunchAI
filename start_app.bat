@echo off
title LAUNCH AI - Platform Launcher
echo ========================================================
echo          STARTING LAUNCH AI PLATFORM
echo ========================================================
echo.

echo Cleaning up any old node processes...
taskkill /F /IM node.exe 2>nul

echo [1/3] Pre-compiling full design system styles...
cd /d "%~dp0frontend"
call npx tailwindcss -i ./app/globals.css -o ./app/tailwind-built.css

echo [2/3] Starting Backend (FastAPI on port 8000)...
start "LAUNCH AI - Backend" cmd /c call "%~dp0run_backend.bat"

echo [3/3] Starting Frontend (Next.js on port 3000)...
start "LAUNCH AI - Frontend" cmd /c call "%~dp0run_frontend.bat"

echo.
echo Launching your browser to http://localhost:3000 in 4 seconds...
timeout /t 4 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================================
echo All services launched! Keep the opened windows active.
echo ========================================================
