@echo off
title LAUNCH AI - Backend Server (Port 8000)
cd /d "%~dp0backend"
echo ===================================================
echo   FastAPI Backend Server Starting on Port 8000...
echo ===================================================
python main.py
pause
