@echo off
color 0A
echo [STRAY SAFE] - CS-42 - PAWPAW
echo Starting App
echo Initializing...
timeout /t 5 /nobreak > NUL
if exist "C:\Program Files\Docker\Docker\Docker Desktop.exe" (
  echo Starting Docker Desktop Service
  "C:\Program Files\Docker\Docker\Docker Desktop.exe"
  timeout /t 10 /nobreak > NUL
) else (
  echo Please install Docker Desktop
  echo https://docs.docker.com/desktop/install/windows-install/
  pause
  exit
)
cd "WebApp"
start cmd /k "docker-compose -f docker-compose.yml up --build"
echo Starting Services... 
echo.
echo.
echo [Open Links]
echo Strayver Frontend - http://localhost:5173
echo Strayver Backend - http://localhost:8080/swagger
pause