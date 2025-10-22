# Auto-Commit Setup for 1947 Indian Restaurant Website

This repository includes automatic commit functionality to help you easily save and push your changes to GitHub.

## Quick Start

### 1. Initial Setup
1. Run `setup-github.ps1` to configure GitHub integration
2. Follow the prompts to connect to your GitHub repository

### 2. Auto-Commit Usage
- **Double-click `auto-commit.bat`** to automatically commit and push changes
- Or run `auto-commit.ps1` in PowerShell

## Files Created

- `auto-commit.ps1` - PowerShell script for automatic commits
- `auto-commit.bat` - Batch file for easy execution
- `setup-github.ps1` - Initial GitHub setup script
- `.gitignore` - Excludes unnecessary files from commits

## How It Works

1. **Detects Changes**: The script checks if there are any uncommitted changes
2. **Adds Files**: Automatically adds all modified files to staging
3. **Creates Commit**: Creates a commit with timestamp
4. **Pushes to GitHub**: Pushes changes to your GitHub repository

## Manual Git Commands

If you prefer manual control:

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

## Features Included

- ✅ Responsive navigation with dropdown menus
- ✅ Online Order button with animations
- ✅ Sign In/Sign Up authentication page
- ✅ Catering services page with comprehensive form
- ✅ Events page with filtering and booking
- ✅ Professional styling with orange theme
- ✅ Mobile-responsive design
- ✅ Auto-commit functionality

## Troubleshooting

### If auto-commit fails:
1. Make sure you're connected to the internet
2. Check if your GitHub repository URL is correct
3. Verify your Git credentials are set up
4. Run `git status` to see if there are any issues

### To reset and start fresh:
```bash
git reset --hard HEAD
git clean -fd
```

## Support

If you encounter any issues with the auto-commit functionality, check:
1. Git is properly installed
2. GitHub repository is accessible
3. Your Git credentials are configured
4. PowerShell execution policy allows script execution

---

**Note**: The auto-commit scripts will commit ALL changes in the repository. Make sure you only have the files you want to commit in the project directory.
