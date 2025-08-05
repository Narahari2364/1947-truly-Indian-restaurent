# Auto-commit script for 1947 Indian Restaurant website
# This script automatically commits and pushes changes to GitHub

# Set the repository directory
$repoPath = "C:\Users\narah\OneDrive\Desktop\web dev\signature assignment"

# Navigate to the repository directory
Set-Location $repoPath

# Get current timestamp for commit message
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Check if there are any changes
$gitStatus = git status --porcelain

if ($gitStatus) {
    Write-Host "Changes detected. Committing and pushing to GitHub..." -ForegroundColor Green
    
    # Add all changes
    git add .
    
    # Create commit with timestamp
    $commitMessage = "Auto-commit: Website updates - $timestamp"
    git commit -m $commitMessage
    
    # Push to GitHub (assuming main branch)
    git push origin main
    
    Write-Host "Successfully committed and pushed changes to GitHub!" -ForegroundColor Green
    Write-Host "Commit message: $commitMessage" -ForegroundColor Yellow
} else {
    Write-Host "No changes detected. Nothing to commit." -ForegroundColor Yellow
}

# Show current git status
Write-Host "`nCurrent git status:" -ForegroundColor Cyan
git status
