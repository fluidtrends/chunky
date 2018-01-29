@echo off
title React Packager
node "%~dp0..\..\react-native\local-cli\cli.js" start %*
pause
exit
