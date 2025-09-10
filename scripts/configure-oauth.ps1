# Configure Google OAuth for StorySprout
# This script provides instructions for configuring OAuth redirect URIs

Write-Host "Google OAuth Configuration for StorySprout" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

Write-Host "`n1. Go to Google Cloud Console:" -ForegroundColor Yellow
Write-Host "   https://console.cloud.google.com/apis/credentials" -ForegroundColor Cyan

Write-Host "`n2. Select project: storysprout-471719" -ForegroundColor Yellow

Write-Host "`n3. Find your OAuth 2.0 Client ID:" -ForegroundColor Yellow
Write-Host "   755490158232-0n7fenl5anrv3q46o4d75qjp6hg91muj.apps.googleusercontent.com" -ForegroundColor Cyan

Write-Host "`n4. Click 'Edit' (pencil icon)" -ForegroundColor Yellow

Write-Host "`n5. Add these Authorized Redirect URIs:" -ForegroundColor Yellow
Write-Host "   https://storysprout-471719.firebaseapp.com/__/auth/handler" -ForegroundColor Cyan
Write-Host "   http://localhost:5173/__/auth/handler" -ForegroundColor Cyan
Write-Host "   http://localhost:5174/__/auth/handler" -ForegroundColor Cyan

Write-Host "`n6. Add these Authorized JavaScript Origins:" -ForegroundColor Yellow
Write-Host "   https://storysprout-471719.firebaseapp.com" -ForegroundColor Cyan
Write-Host "   http://localhost:5173" -ForegroundColor Cyan
Write-Host "   http://localhost:5174" -ForegroundColor Cyan

Write-Host "`n7. Click 'Save'" -ForegroundColor Yellow

Write-Host "`n8. Test the login again in your application" -ForegroundColor Green

Write-Host "`nAdditional Notes:" -ForegroundColor Magenta
Write-Host "- The Firebase auth domain is: storysprout-471719.firebaseapp.com" -ForegroundColor White
Write-Host "- Development server runs on: localhost:5173 or localhost:5174" -ForegroundColor White
Write-Host "- Production will use: storysprout-471719.firebaseapp.com" -ForegroundColor White

Write-Host "`nAfter configuration, your OAuth should work properly!" -ForegroundColor Green
