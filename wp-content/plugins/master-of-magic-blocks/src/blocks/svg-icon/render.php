<?php
/**
 * Render callback for SVG Icon block (minimal version)
 *
 * @param array    $attributes
 * @param string   $content
 * @param WP_Block $block
 *
 * @package Master_of_Magic_Theme
 * @formatter Prettier
 */

$media_id = isset( $attributes['mediaId'] ) ? (int) $attributes['mediaId'] : 0;

if ( ! $media_id ) {
	return;
}

if ( get_post_mime_type( $media_id ) !== 'image/svg+xml' ) {
	return;
}

$file = get_attached_file( $media_id );
if ( ! $file || ! file_exists( $file ) ) {
	return;
}

$svg = file_get_contents( $file ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
if ( ! $svg ) {
	return;
}

// Remove width/height so CSS controls size.
$svg = preg_replace( '/\s(width|height)=(["\']).*?\2/i', '', $svg );

// Force currentColor so color works later.
$svg = preg_replace(
	'/\sfill=(["\'])(?!none\b)[^"\']*\1/i',
	' fill="currentColor"',
	$svg
);

?>

<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore ?>>
	<?php echo $svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
