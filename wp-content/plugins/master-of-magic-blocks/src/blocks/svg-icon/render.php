<?php
/**
 * Render callback for SVG Icon block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @package master-of-magic-blocks
 * @formatter Prettier
 */

$media_id = isset( $attributes['mediaId'] ) ? (int) $attributes['mediaId'] : 0;

if ( ! $media_id ) {
	echo '';
	return;
}

if ( get_post_mime_type( $media_id ) !== 'image/svg+xml' ) {
	echo '';
	return;
}

$file = get_attached_file( $media_id );
if ( ! $file || ! file_exists( $file ) ) {
	echo '';
	return;
}

$svg = file_get_contents( $file ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
if ( ! $svg ) {
	echo '';
	return;
}

/**
 * Ensure the SVG root gets a predictable class for styling.
 * If the SVG already has a class attribute, append ours.
 */
if ( preg_match( '/<svg\b[^>]*\bclass=(["\'])(.*?)\1/i', $svg ) ) {
	$svg = preg_replace(
		'/<svg\b([^>]*?)\bclass=(["\'])(.*?)\2/i',
		'<svg$1class=$2$3 mom-svg-icon$2',
		$svg,
		1
	);
} else {
	$svg = preg_replace( '/<svg\b/i', '<svg class="mom-svg-icon"', $svg, 1 );
}

// Remove hardcoded width/height so CSS can control size.
$svg = preg_replace( '/\s(width|height)=(["\']).*?\2/i', '', $svg );

// Make fill/stroke inherit from currentColor (good for theming).
// NOTE: This will convert multi-color SVGs too. If you need multi-color later,
// add an attribute toggle like `forceCurrentColor`.
$svg = preg_replace(
	'/\sfill=(["\'])(?!none\b)[^"\']*\1/i',
	' fill="currentColor"',
	$svg
);

$svg = preg_replace(
	'/\sstroke=(["\'])(?!none\b)[^"\']*\1/i',
	' stroke="currentColor"',
	$svg
);

// Improve focus behavior (especially in Safari/IE legacy).
$svg = preg_replace(
	'/<svg\b/i',
	'<svg focusable="false"',
	$svg,
	1
);

// Link handling.
$icon_link = ( isset( $attributes['link'] ) && is_array( $attributes['link'] ) ) ? $attributes['link'] : [];
$url       = isset( $icon_link['url'] ) ? (string) $icon_link['url'] : '';
$new_tab   = ! empty( $icon_link['opensInNewTab'] );

?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( $url ) : ?>
		<a class="mom-svg-icon__link"
			href="<?php echo esc_url( $url ); ?>"
			<?php echo $new_tab ? 'target="_blank" rel="noopener noreferrer"' : ''; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		>
			<?php echo $svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>
	<?php else : ?>
		<?php echo $svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php endif; ?>
</div>
