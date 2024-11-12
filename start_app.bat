@echo off
echo.
echo [Stray Safe]
echo Project Requirements:
echo.
echo - Dotnet SDK installed
echo - MSSQL installed (https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
echo - NPM installed
echo - Firewall Ports exposed (5173, 5077)
echo.
echo (Make sure that the requirements are met to avoid issues)
echo.
echo.
timeout /t 5 /nobreak > NUL
echo Running the Project....
timeout /t 5 /nobreak > NUL
cd Straysafe.Backend
start build_and_run.bat
cd ..
cd Straysafe.Frontend
npm run dev