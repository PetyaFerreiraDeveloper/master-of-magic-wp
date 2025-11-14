<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 * @formatter Prettier
 * @package master-of-magic-blocks
 */

?>

<div class="master-of-magic-blocks-tab">
  <?php echo esc_html__( 'Hello from master of magic old tab',
  'master-of-magic-blocks' ); ?>
</div>
