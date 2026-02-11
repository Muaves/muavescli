@echo off

echo ==================================
echo   Muaves Portfolio CLI Installer
echo ==================================
echo.

echo This script will help you set up muaves for easy access.
echo.
echo OPTION 1: Add current directory to PATH (Recommended)
echo OPTION 2: Use from current directory only (type: muaves.bat)
echo.

choice /C 12 /M "Choose option"

if errorlevel 2 goto option2
if errorlevel 1 goto option1

:option1
echo.
echo To add this directory to your PATH:
echo.
echo 1. Press Windows key and search for "Environment Variables"
echo 2. Click "Edit the system environment variables"
echo 3. Click "Environment Variables" button
echo 4. Under "User variables", select "Path" and click "Edit"
echo 5. Click "New" and add this path:
echo.
echo    %~dp0
echo.
echo 6. Click OK on all windows
echo 7. Restart your Command Prompt or PowerShell
echo.
echo Then you can use: muaves (from anywhere)
echo.
pause
goto end

:option2
echo.
echo No problem! You can use muaves from this directory.
echo.
echo Usage: muaves.bat [command]
echo.
echo Examples:
echo   muaves.bat
echo   muaves.bat -oA
echo   muaves.bat -oP
echo.
pause
goto end

:end
echo.
echo ==================================
echo   Setup Information Shown
echo ==================================
