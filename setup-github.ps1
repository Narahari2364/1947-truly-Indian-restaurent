# Setup script for GitHub integration
# This script helps you connect your local repository to GitHub

Write-Host "Setting up GitHub integration for 1947 Indian Restaurant website..." -ForegroundColor Green
Write-Host ""

# Check if git is configured
$userName = git config user.name
$userEmail = git config user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "Git user information not configured. Please set up your Git identity:" -ForegroundColor Yellow
    $name = Read-Host "Enter your name"
    $email = Read-Host "Enter your email"
    
    git config user.name $name
    git config user.email $email
    Write-Host "Git user information configured!" -ForegroundColor Green
}

Write-Host ""
Write-Host "To connect to GitHub, you need to:" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub.com" -ForegroundColor White
Write-Host "2. Copy the repository URL (e.g., https://github.com/username/repository-name.git)" -ForegroundColor White
Write-Host "3. Run: git remote add origin YOUR_REPOSITORY_URL" -ForegroundColor White
Write-Host "4. Run: git push -u origin main" -ForegroundColor White
Write-Host ""

$repoUrl = Read-Host "Enter your GitHub repository URL (or press Enter to skip)"

if ($repoUrl) {
    Write-Host "Adding GitHub remote..." -ForegroundColor Green
    git remote add origin $repoUrl
    
    Write-Host "Pushing to GitHub..." -ForegroundColor Green
    git push -u origin main
    
    Write-Host "GitHub integration complete!" -ForegroundColor Green
    Write-Host "You can now use auto-commit.bat to automatically commit and push changes." -ForegroundColor Yellow
} else {
    Write-Host "Skipping GitHub setup. You can set it up later using:" -ForegroundColor Yellow
    Write-Host "git remote add origin YOUR_REPOSITORY_URL" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "Auto-commit scripts created:" -ForegroundColor Cyan
Write-Host "- auto-commit.bat (double-click to run)" -ForegroundColor White
Write-Host "- auto-commit.ps1 (PowerShell script)" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
