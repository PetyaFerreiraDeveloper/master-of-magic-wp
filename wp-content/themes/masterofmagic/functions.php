<?php
/**
 * Enqueue the theme's CSS and JS files on the front-end.
 *
 * @return void
 */
function masterofmagic_theme_assets() {
	// Enqueue CSS.
	$style_assets = include get_parent_theme_file_path( 'public/css/screen.asset.php' );

	wp_enqueue_style(
		'masterofmagic-theme-style',
		get_parent_theme_file_uri( 'public/css/screen.css' ),
		$style_assets['dependencies'],
		$style_assets['version']
	);

	// Enqueue JavaScript.
	$script_assets = include get_parent_theme_file_path( 'public/js/screen.asset.php' );

	wp_enqueue_script(
		'masterofmagic-theme-script',
		get_parent_theme_file_uri( 'public/js/screen.js' ),
		$script_assets['dependencies'],
		$script_assets['version'],
		true
	);
}
add_action( 'wp_enqueue_scripts', 'masterofmagic_theme_assets' );

/**
 * Enqueue component styles for the block editor.
 *
 * @return void
 */
function masterofmagic_theme_add_editor_style() {
	add_editor_style( 'public/css/editor.css' );
}

add_action( 'admin_init', 'masterofmagic_theme_add_editor_style' );

/**
 * Enqueue the theme's CSS and JS files on the block editor.
 *
 * @return void
 */
function masterofmagic_theme_editor_assets() {
	$script_asset = include get_parent_theme_file_path( 'public/js/editor.asset.php' );
	$style_asset  = include get_parent_theme_file_path( 'public/css/editor.asset.php' );

	wp_enqueue_script(
		'masterofmagic-theme-editor',
		get_parent_theme_file_uri( 'public/js/editor.js' ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	wp_enqueue_style(
		'masterofmagic-theme-editor',
		get_parent_theme_file_uri( 'public/css/editor.css' ),
		$style_asset['dependencies'],
		$style_asset['version']
	);
}

add_action( 'enqueue_block_editor_assets', 'masterofmagic_theme_editor_assets' );
