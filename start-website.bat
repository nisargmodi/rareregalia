@echo off
echo Starting Rare Regalia Ecommerce Website...
echo.
cd /d "D:\rareregalia\ecommerce-website"
echo Clearing cache and starting development server...
rmdir /s /q .next 2>nul
npm run dev
echo.
echo Website should be running at:
echo - http://localhost:3000 (or next available port)
echo.
pause