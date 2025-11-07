# Master Of Magic Blocks

A custom WordPress blocks plugin designed to work alongside the main theme. This plugin provides reusable blocks and components.

## 🧱 Features

- Blocks use for master of magic project
- Optimized for performance and speed
- Responsive design for all devices
- Accessibility-ready

## 🛠 Requirements

- [Node.js](https://nodejs.org/) (LTS recommended)

---

## 🚀 Getting Started

### 1. Navigate to the plugin directory

```bash
cd master-of-magic-blocks
```

### 1. Install js dependencies

```bash
npm install
```

### 2. Start development

```bash
npm start
```

## 📚 Documentation

Project is using @wordpress/scripts for development and build. For more information, check out [Wordpress scripts documentation](https://www.npmjs.com/package/@wordpress/scripts). Blocks source is located in `src` directory. The build output is located in `build` directory.

Note that build process also copies `render.php` file from `src/blocks` to `build/blocks` for each block. It will not copy any other .php files inside the blocks directory. If your block front-end needs other PHP files (eg. template files), they should be included inside render.php from /includes folder.
