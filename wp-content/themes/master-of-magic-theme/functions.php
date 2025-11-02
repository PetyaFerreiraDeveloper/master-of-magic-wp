<?php
/**
 * Theme functions and definitions.
 *
 * @package master_of_magic_theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Setup theme supports and i18n.
 */
function master_of_magic_theme_setup() {
	// Load translations from /languages.
	load_theme_textdomain( 'master-of-magic-theme', get_template_directory() . '/languages' );

	// Add other theme supports here as needed.
	// add_theme_support( 'post-thumbnails' );.
}
add_action( 'after_setup_theme', 'master_of_magic_theme_setup' );

/**
 * Enqueue the theme's CSS and JS files on the front-end.
 *
 * @return void
 */
function master_of_magic_theme_enqueue_assets() {
	// Enqueue CSS.
	$style_assets = include get_theme_file_path( 'public/css/screen.asset.php' );

	wp_enqueue_style(
		'master-of-magic-theme-style',
		get_theme_file_uri( 'public/css/screen.css' ),
		! empty( $style_assets['dependencies'] ) ? $style_assets['dependencies'] : [],
		! empty( $style_assets['version'] ) ? $style_assets['version'] : null
	);

	// Enqueue JavaScript.
	$script_assets = include get_theme_file_path( 'public/js/screen.asset.php' );

	wp_enqueue_script(
		'master-of-magic-theme-script',
		get_theme_file_uri( 'public/js/screen.js' ),
		! empty( $script_assets['dependencies'] ) ? $script_assets['dependencies'] : [],
		! empty( $script_assets['version'] ) ? $script_assets['version'] : null,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'master_of_magic_theme_enqueue_assets' );

/**
 * Enqueue the theme's CSS and JS files in the block editor.
 *
 * @return void
 */
function master_of_magic_theme_enqueue_editor_assets() {
	$script_asset = include get_theme_file_path( 'public/js/editor.asset.php' );
	$style_asset  = include get_theme_file_path( 'public/css/editor.asset.php' );

	wp_enqueue_script(
		'master-of-magic-theme-editor-script',
		get_theme_file_uri( 'public/js/editor.js' ),
		! empty( $script_asset['dependencies'] ) ? $script_asset['dependencies'] : [],
		! empty( $script_asset['version'] ) ? $script_asset['version'] : null,
		true
	);

	wp_enqueue_style(
		'master-of-magic-theme-editor-style',
		get_theme_file_uri( 'public/css/editor.css' ),
		! empty( $style_asset['dependencies'] ) ? $style_asset['dependencies'] : [],
		! empty( $style_asset['version'] ) ? $style_asset['version'] : null
	);
}
add_action( 'enqueue_block_editor_assets', 'master_of_magic_theme_enqueue_editor_assets' );
