@echo off
chcp 65001 >nul
setlocal
rem PranpriyaFixTool.bat — double-click launcher for pranpriya-fix-tool.js
rem
rem This avoids PowerShell entirely (no execution-policy prompts, no &&
rem syntax issues), and always runs from the folder this .bat file is in,
rem no matter where you double-click it from.

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 goto :no_node

node "%~dp0pranpriya-fix-tool.js"

echo.
pause
exit /b 0

:no_node
echo ไม่พบ Node.js บนเครื่องนี้
echo กรุณาติดตั้ง Node.js จาก https://nodejs.org ก่อน แล้วลองใหม่อีกครั้ง
echo.
pause
exit /b 1
