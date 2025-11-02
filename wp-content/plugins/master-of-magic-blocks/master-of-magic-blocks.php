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
add_action(
	'init',
	function () {
		// Primary: register built blocks (what CI/CD deploys).
		$build_dir = plugin_dir_path( __FILE__ ) . 'build/blocks';

		// Fallback for local dev if build is missing: read from src.
		$src_dir = plugin_dir_path( __FILE__ ) . 'src/blocks';

		$roots = [];
		if ( is_dir( $build_dir ) ) {
			$roots[] = $build_dir;
		} elseif ( is_dir( $src_dir ) ) {
			// useful when running `wp-scripts start` locally.
			$roots[] = $src_dir;
		} else {
			return;
		}

		foreach ( $roots as $root ) {
			$files = glob( trailingslashit( $root ) . '*/block.json', GLOB_NOSORT );
			if ( ! $files ) {
				continue;
			}
			foreach ( $files as $block_json ) {
				// `register_block_type()` accepts a directory containing block.json.
				register_block_type( dirname( $block_json ) );
			}
		}
	}
);
