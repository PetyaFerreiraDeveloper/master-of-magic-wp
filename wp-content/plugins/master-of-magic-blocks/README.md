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


## 📚 Translations
We use wp_cli for generating and translating pot file. We create a POT file for the master-of-magic-blocks plugin in the plugins root directory using wp-cli. See more info: (Wordpress Localization Translations)[https://developer.wordpress.org/plugins/internationalization/localization/].

The `master-of-magic-blocks.pot` file, contains a list of all translation strings. Every time when we run this wp-cli command in the plugin folder, it will scan through all files of the plugin and collect new translatable strings and add them to the ```.pot``` file.
For text to be discoverable for translation by wp-cli, the text needs to be wrapped in a translation function: `(__)`.

In ```.js``` files it is imported from `@wordpress/i18n` and is used like this: 

`{__( 'Hello from the Tab block editor!', 'master-of-magic-blocks' )}`.

In ```.php``` files the php html function is used: `esc_html__` like this: 

`<?php echo esc_html__( 'Hello from the front end', 'master-of-magic-blocks' ); ?>`.

To create the translation files open (Poedit)[https://poedit.net/] locally. Follow the instructions for using the program. Once a translation is created the file needs to be saved with the following name format: ```master-of-magic-blocks-{locale}.po```.