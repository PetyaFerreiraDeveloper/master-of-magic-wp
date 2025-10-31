<?php
/**
 * Title: 404 Page
 * Slug: masterofmagic/template-page-404
 * Description: The page that shows when no other page is found.
 * Categories: masterofmagic-theme/pages
 * Keywords: page, full-width
 *
 * @formatter Prettier
 * Inserter: false
 *
 * @package masterofmagic-theme
 */

?>
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
	<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"}} -->
	<div class="wp-block-group">
	<!-- wp:heading {"level":1} -->
	<h1 class="wp-block-heading">
		<?php esc_html_e( '404 - Page Not Found', 'masterofmagic-theme' ); ?>
	</h1>
	<!-- /wp:heading -->

	<!-- wp:paragraph -->
	<p>
		<?php
		esc_html_e(
			"The page you are looking for doesn't exist, or it has
      been moved.",
			'masterofmagic-theme'
		);
		?>
	</p>
	<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
