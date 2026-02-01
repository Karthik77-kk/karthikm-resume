#!/bin/bash
# Deployment Verification Script for GitHub Pages

echo "🔍 Checking GitHub Pages Deployment..."
echo "========================================"
echo ""

# Check if required files exist
echo "📁 Checking required files..."
files=("index.html" ".nojekyll" "assets/js/utils.js" "assets/js/portfolio.js" "assets/css/new-features.css")
all_exist=true

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing!"
        all_exist=false
    fi
done

echo ""
echo "🔧 Checking JavaScript syntax..."
if command -v node &> /dev/null; then
    node --check assets/js/utils.js && echo "✅ utils.js syntax is valid" || echo "❌ utils.js has syntax errors"
    node --check assets/js/portfolio.js && echo "✅ portfolio.js syntax is valid" || echo "❌ portfolio.js has syntax errors"
else
    echo "⚠️  Node.js not found, skipping JavaScript syntax check"
fi

echo ""
echo "📋 Checking HTML structure..."
if [ -f "index.html" ]; then
    # Check for required asset links
    if grep -q 'assets/css/new-features.css' index.html; then
        echo "✅ CSS link found in index.html"
    else
        echo "❌ CSS link missing in index.html"
    fi
    
    if grep -q 'assets/js/utils.js' index.html && grep -q 'assets/js/portfolio.js' index.html; then
        echo "✅ JavaScript links found in index.html"
    else
        echo "❌ JavaScript links missing in index.html"
    fi
    
    # Check for feature containers
    containers=("githubStats" "openToWorkBadge" "socialShare" "visitorCounter")
    for container in "${containers[@]}"; do
        if grep -q "id=\"$container\"" index.html; then
            echo "✅ Feature container '$container' found"
        else
            echo "⚠️  Feature container '$container' not found"
        fi
    done
fi

echo ""
echo "🌐 Testing local server..."
if command -v python3 &> /dev/null; then
    echo "Starting Python HTTP server on port 8001..."
    python3 -m http.server 8001 > /dev/null 2>&1 &
    SERVER_PID=$!
    sleep 2
    
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:8001/ | grep -q "200"; then
        echo "✅ Local server responding correctly (HTTP 200)"
        echo "   Visit: http://localhost:8001/"
    else
        echo "❌ Local server not responding properly"
    fi
    
    echo "Stopping server..."
    kill $SERVER_PID 2>/dev/null
else
    echo "⚠️  Python3 not found, skipping local server test"
fi

echo ""
echo "📊 Repository Information..."
if command -v git &> /dev/null; then
    echo "Current branch: $(git branch --show-current)"
    echo "Latest commit: $(git log -1 --oneline)"
    echo "Remote: $(git remote get-url origin)"
fi

echo ""
echo "✨ Deployment Checklist:"
echo "------------------------"
echo "1. ☐ Ensure all files are committed: git add . && git commit"
echo "2. ☐ Push to main branch: git push origin main"
echo "3. ☐ Go to GitHub repository Settings → Pages"
echo "4. ☐ Set Source to 'GitHub Actions' or 'main' branch"
echo "5. ☐ Wait 1-2 minutes for deployment"
echo "6. ☐ Visit: https://karthik77-kk.github.io/karthikm-resume/"
echo ""

if [ "$all_exist" = true ]; then
    echo "✅ All checks passed! Ready for deployment."
    exit 0
else
    echo "⚠️  Some checks failed. Please review the issues above."
    exit 1
fi
