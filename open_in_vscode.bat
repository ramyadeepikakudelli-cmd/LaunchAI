@echo off
title Open Project in VS Code
echo Opening LAUNCH AI in Visual Studio Code...
start "" "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" "%~dp0."
exit
