@echo off
echo Auto-committing changes to GitHub...
echo.

REM Navigate to the project directory
cd /d "C:\Users\narah\OneDrive\Desktop\web dev\signature assignment"

REM Run the PowerShell script
powershell -ExecutionPolicy Bypass -File "auto-commit.ps1"

echo.
echo Auto-commit process completed!
pause
