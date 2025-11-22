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
 * @formatter Prettier
 */

$block_tabs = [];

foreach ( $block->parsed_block['innerBlocks'] as $innerblockkey => $innerblock ) {
	$block_tabs[] = [
		'id'       => $innerblock['attrs']['id'],
		'label'    => $innerblock['attrs']['label'] ?? __( 'Tab', 'master-of-magic-blocks' ),
		'isActive' => $innerblockkey === 0,
	];

}

?>

<div 
	<?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-wp-interactive="master-of-magic-blocks"
	<?php
	echo wp_interactivity_data_wp_context( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		[
			'tabs' => $block_tabs,
		]
	);
	?>
>
	<div class="wp-block-master-of-magic-blocks-tabs__navigation">
		<div class="wp-block-master-of-magic-blocks-tabs__navigation-inner">
			<template data-wp-each="context.tabs">
				<div data-wp-on--click="actions.open" data-wp-class--wp-block-master-of-magic-blocks-tabs__navigation-item--active="context.item.isActive" class="wp-block-master-of-magic-blocks-tabs__navigation-item" data-wp-text="context.item.label">
				</div>
			</template>
		</div>
	</div>
	<div class="wp-block-master-of-magic-blocks-tabs__content">
	<?php foreach ( $block->parsed_block['innerBlocks'] as $tab_inner_block_key => $tab_inner_block ) : ?>
		<div class="wp-block-master-of-magic-blocks-tabs__content-item
		<?php
		if ( $tab_inner_block_key === 0 ) {
			echo 'wp-block-master-of-magic-blocks-tabs__content-item--active'; }
		?>
		" data-tab-id="<?php echo esc_attr( $tab_inner_block['attrs']['id'] ); ?>">
			<?php foreach ( $tab_inner_block['innerBlocks'] as $inner_block ) : ?>
				<?php echo render_block( $inner_block ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php endforeach; ?>
		</div>
	<?php endforeach; ?>
	</div>
</div>
