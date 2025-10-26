#!/bin/bash

# Setup script to install Git hooks for PHP code standards

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up Git hooks for PHP code standards...${NC}"

# Get the project root directory
PROJECT_ROOT="$(git rev-parse --show-toplevel)"
cd "$PROJECT_ROOT"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not in a Git repository${NC}"
    exit 1
fi

# Check if composer dependencies are installed
if [ ! -f "./vendor/bin/phpcs" ]; then
    echo -e "${YELLOW}Installing Composer dependencies...${NC}"
    composer install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: Failed to install Composer dependencies${NC}"
        exit 1
    fi
fi

# Create .git/hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy pre-commit hook
if [ -f ".githooks/pre-commit" ]; then
    cp .githooks/pre-commit .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    echo -e "${GREEN}✓ Pre-commit hook installed${NC}"
else
    echo -e "${RED}Error: .githooks/pre-commit not found${NC}"
    exit 1
fi

# Test the hook installation
echo -e "${YELLOW}Testing hook installation...${NC}"
if [ -x ".git/hooks/pre-commit" ]; then
    echo -e "${GREEN}✓ Pre-commit hook is executable${NC}"
else
    echo -e "${RED}✗ Pre-commit hook is not executable${NC}"
    exit 1
fi

echo -e "${GREEN}"
echo "=================================================="
echo "Git hooks setup completed successfully!"
echo "=================================================="
echo "The pre-commit hook will now:"
echo "• Check all staged PHP files against your phpcs.xml standards"
echo "• Prevent commits that violate coding standards"
echo "• Provide helpful error messages and fix suggestions"
echo ""
echo "To run code standards check manually:"
echo "  ./vendor/bin/phpcs"
echo ""
echo "To auto-fix issues where possible:"
echo "  ./vendor/bin/phpcbf"
echo "=================================================="
echo -e "${NC}"