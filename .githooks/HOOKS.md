# PHP Code Standards Pre-commit Hooks

This repository uses pre-commit hooks to enforce PHP coding standards defined in `phpcs.xml` using WordPress coding standards.

## Setup

### Automatic Setup (Recommended)

The hooks will be automatically installed when you run:

```bash
composer install
```

## How It Works

The pre-commit hook will:

1. **Check staged PHP files** - Only files that are staged for commit are checked
2. **Run PHP CodeSniffer** - Uses the standards defined in `phpcs.xml`
3. **Block commits** - Prevents commits if any violations are found
4. **Provide helpful output** - Shows exactly what needs to be fixed

## Available Commands

### Check code standards

```bash
# Check specific file
composer run phpcs path/to/file.php

# Check with detailed report
composer run phpcs --report=full

### Auto-fix issues

```bash
# Fix specific file
composer run phpcbf path/to/file.php

### Available composer scripts

```bash
composer run phpcs    # Basic check
composer run phpcbf   # Basic auto-fix
```

## Coding Standards

This project follows **WordPress coding standards** with some customizations:

- **WordPress-Extra** ruleset as base
- **Short array syntax allowed** (`[]` instead of `array()`)
- **Yoda conditions disabled** (normal `$var == 'value'` allowed)
- **File comments not required**
- **Text domain**: `paychex`

See `phpcs.xml` for complete configuration.

## Troubleshooting

### Hook not running

```bash
# Check if hook is executable
ls -la .git/hooks/pre-commit

# Re-run setup if needed
./setup-hooks.sh
```

### Bypass hook (emergency only)

```bash
# Skip pre-commit hooks (NOT RECOMMENDED)
git commit --no-verify -m "Emergency commit"
```

### Common fixes

```bash
# Fix indentation and spacing
composer run phpcbf path/to/file.php

# Check what can be auto-fixed
composer run phpcbf --dry-run path/to/file.php
```

## Benefits

✅ **Consistent code quality** - All committed code follows the same standards  
✅ **Catch issues early** - Problems found before they reach the repository  
✅ **Team collaboration** - Everyone follows the same coding style  
✅ **Automated fixing** - Many issues can be auto-corrected  
✅ **Clear feedback** - Detailed error messages show exactly what to fix

## File Structure

```
.githooks/
  pre-commit          # The actual pre-commit hook script
setup-hooks.sh        # Script to install hooks
phpcs.xml            # PHP CodeSniffer configuration
composer.json        # Includes setup scripts
```
