<?php
/**
 * Plugin Name:       Master Of Magic Blocks
 * Plugin URI:        https://masterofmagic.com
 * Description:       Master Of Magic blocks is a collection of custom blocks designed to extend the WordPress editor. This plugin also includes various functionality related to Master Of Magic project.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.2
 * Author:            Petya Naydenova Ferreira
 * Author URI:        https://petyaferreira.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       master-of-magic-blocks
 *
 * @package           master-of-magic-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Define plugin constants.
 */
define( 'MASTER_OF_MAGIC_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'MASTER_OF_MAGIC_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Load translations.
 */
function master_of_magic_blocks_load_textdomain() {
	load_plugin_textdomain( 'master-of-magic-blocks', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'master_of_magic_blocks_load_textdomain' );

/**
 * Registers multiple block types from metadata loaded from a file.
 */
function master_of_magic_blocks_register_blocks() {
	// Primary: register built blocks (what CI/CD deploys).
	$build_dir = MASTER_OF_MAGIC_BLOCKS_PATH . 'build/blocks';

	if ( ! file_exists( $build_dir ) ) {
		return;
	}

	$block_json_files = glob( $build_dir . '/*/block.json' );

	foreach ( $block_json_files as $block_json_file ) {
		register_block_type( dirname( $block_json_file ) );
	}
}

add_action( 'init', 'master_of_magic_blocks_register_blocks' );

/**
 * Register block category.
 *
 * @param array $categories Existing block categories.
 */
function master_of_magic_blocks_register_block_category( array $categories ): array {
	$categories[] = array(
		'slug'  => 'master-of-magic-blocks',
		'title' => __( 'Master Of Magic Blocks', 'master-of-magic-blocks' ),
	);
	return $categories;
}

add_filter( 'block_categories_all', 'master_of_magic_blocks_register_block_category' );
