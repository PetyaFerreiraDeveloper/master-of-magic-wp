<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 * @formatter Prettier
 * @package master-of-magic-blocks
 */

?>

<div
	<?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-wp-interactive="master-of-magic-blocks"
>
	<div class="wp-block-master-of-magic-blocks-tab__content">
		<?php echo wp_kses_post( $content ); ?>
	</div>
</div>
