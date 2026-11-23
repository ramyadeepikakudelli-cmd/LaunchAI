@echo off
title LAUNCH AI - Frontend Server (Port 3000)
cd /d "%~dp0frontend"
echo ===================================================
echo   Next.js Frontend Server Starting on Port 3000...
echo ===================================================
npm run dev
pause
