<?php
/**
 * Render callback for the Tabs block. This is what outputs the final HTML on the front end.
 *
 * The following variables are exposed to the file:
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Inner blocks HTML (all Tab blocks).
 * @param WP_Block $block    The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 * @package master-of-magic-blocks
 */

?>

<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo wp_kses_post( $content ); ?>
</div>
