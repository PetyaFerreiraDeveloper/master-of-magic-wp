# Master of Magic

This repository provides a local development instructions for the **Master of Magic WordPress theme and plugins** using Docker. The setup is based on the [WordPress Dev Setup](https://github.com/PetyaFerreiraDeveloper/wordpress-docker-setup) created by Zarko Djuric.

You are not required to use Docker for local development of this project. If you prefer to use a different solution (eg. Local by Flywheel, DevKinsta, XAMPP / MAMP / WAMP ) you can skip this README and just use themes/plugins directly:

- Master of magic theme contains a separate README.md file in the theme folder
- Master of magic blocks plugin contains a separate README.md file in the plugin folder paychex-blocks

---

## 📦 Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (for building theme and plugin assets)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) (or another editor)

---

## 🚀 Getting Started

### 1. Clone the WordPress Docker Starter

```bash
git clone git@github.com:PetyaFerreiraDeveloper/wordpress-docker-setup.git masterofmagic
cd masterofmagic
```

### 2. Configure and Start Docker Setup

Open .env file and change `PROJECT_NAME` variable to your project name (eg. `masterofmagic`). Note that this needs to match your project directory name on your local machine. If you cloned the repo from step 1 into the `masterofmagic` directory, you should use `masterofmagic` as the project name.

After that, run the following command:

```bash
./start.sh
```

### 2. Prepare and Clone Master Of Magic Repo

Remove existing `wp-content` directory and replace it with the Master of Magic repo:

```bash
rm -rf src/wp-content
git clone git@github.com:PetyaFerreiraDeveloper/master-of-magic-wp.git src
```

Restart project containers so that the changes are applied:

```bash
docker-compose down
./start.sh
```

## 🗄️ Database Import & Search/Replace

To import test/staging/prod database into your local setup:

### 1. Import the SQL Dump

You should have .sql file ready on your local computer. You can get the sql file by exporting it from the production phpMyAdmin database on [Nordic Way](https://nordicway.dk/kunde/clientarea.php?action=productdetails&id=13643).
To import the database, run the following command:

```bash
./mysql-import.sh /path/to/db-file.sql
```

### 2. Search & Replace URLs

To search and replace URLs in the database, run the following command:

```bash
./wp.sh search-replace 'https://masterofmagic.dk' 'http://localhost'
```

This will update the database with the new URLs.

### 3. Install dependencies for composer and npm

To install npm dependencies run:
`npm i`

To install composer dependencies run:
`composer install`
This will automatically configure git pre-commit hooks.

## 📦 Build Theme and Plugins

This step is explained in the README files of the theme and plugin directories. Both theme and the plugin assets need to be built with the following commands:

```bash
cd src/wp-content/themes/masterofmagic
npm install
npm run build

cd src/wp-content/plugins/masterofmagic-blocks
npm install
npm run build
```

## 🎨 Code Formatting

### JavaScript/CSS/SCSS Code Formatting with Prettier

This project is configured to use **Prettier** for consistent code formatting across JavaScript, CSS, and SCSS files. The configuration is set up per-project to ensure all developers follow the same coding standards.

#### Configuration Files

- **`.vscode/settings.json`** - VS Code workspace settings that enable Prettier for JavaScript, CSS, and SCSS files
- **`.prettierrc`** - Prettier configuration with project-specific formatting rules (shared across all file types)

### HTML inside PHP files Code Formatting with Prettier

In order to format the html inside php files, make sure that your php file has this comment in the comment section on the top:
`@formatter Prettier`

When this comment is added in the php file, run `composer run format path/to/file.php` to format the file.
If you want the format automatically on save install extension (Run On Save)[https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave].

### PHP Coding Standards

This theme follows the [WordPress PHP coding standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/). To check your code against these standards, use [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer), by Samuel Hilson. The configuration for PHP_CodeSniffer is provided in the `phpcs.xml` file located in the root of the theme directory.

To run PHP_CodeSniffer with the provided configuration, use the following command in your terminal:

```bash
composer run phpcs your-file.php
```

Replace `your-file.php` with the path to the PHP file you want to check. You can also run it on multiple files or directories as needed.

To run PHP_CodeSniffer on the entire theme, use:

```bash
composer run phpcs
```

It's also possible to automatically fix some of the coding standard violations using PHP Code Beautifier and Fixer (phpcbf). To do this, use the following command:

```bash
composer run phpcbf your-file.php
```

Replace `your-file.php` with the path to the PHP file you want to fix. You can also run it on multiple files or directories as needed.

To run PHP Code Beautifier and Fixer on the entire theme and plugin, use:

```bash
composer run phpcbf
```


## 🧪+🚀 Deploying to Staging or Production

This repo is using Github Actions to deploy the project to staging or production.

### Deploying to Staging

When you push changes to the `main` branch, it will automatically trigger build and all of the production ready files will be commited and pushed to the Staging site on Nordic Way. [Master of Magic Staging](https://staging.masterofmagic.dk)

### Deploying to Production

When you are ready to deploy to production, you can trigger the deployment manually via the GitHub Actions interface.

1. Go to the **Actions** tab in the repository.
2. Select the **Deploy to Nordicway** workflow from the sidebar.
3. Click the **"Run workflow"** button.
4. Choose "production" from the **"Environment to deploy to"** dropdown.
5. Click **"Run workflow"** to start the build and deployment process.

This will build the production-ready files and push them to the Production Site on Nordic Way: [Master of Magic](https://masterofmagic.dk).
