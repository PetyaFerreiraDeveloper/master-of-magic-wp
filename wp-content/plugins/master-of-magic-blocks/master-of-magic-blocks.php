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
