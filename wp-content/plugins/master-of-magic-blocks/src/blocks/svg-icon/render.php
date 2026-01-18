<?php
/**
 * Render callback for SVG Icon block (minimal version)
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
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

// Optional: also convert stroke icons (Instagram) to currentColor.
$svg = preg_replace(
	'/\sstroke=(["\'])(?!none\b)[^"\']*\1/i',
	' stroke="currentColor"',
	$svg
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
			<?php echo $new_tab ? 'target="_blank" rel="noopener noreferrer"' : ''; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php echo $svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>
	<?php else : ?>
		<?php echo $svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php endif; ?>
</div>
