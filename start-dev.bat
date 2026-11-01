@echo off
cd /d "%~dp0"

echo Starting Study-Companion...

REM Start Spring Boot
start "Study-Companion Backend" cmd /k "cd /d backend && gradlew.bat bootRun"

REM Start Vite
start "Study-Companion Frontend" cmd /k "cd /d frontend && npm run dev"

REM Open the project in IntelliJ
start "" idea64.exe "%~dp0"

REM Open the application in your browser
start "" "http://localhost:5173"

echo Development environment launched!