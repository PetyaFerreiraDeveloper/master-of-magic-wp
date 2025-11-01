<?php
/**
 * Title: 404 Page
 * Slug: master-of-magic-theme/template-page-404
 * Description: The page that shows when no other page is found.
 * Categories: master-of-magic-theme/pages
 * Keywords: page, full-width
 *
 * @formatter Prettier
 * Inserter: false
 *
 * @package master-of-magic-theme
 */

?>
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
	<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"}} -->
	<div class="wp-block-group">
	<!-- wp:heading {"level":1} -->
	<h1 class="wp-block-heading">
		<?php esc_html_e( '404 - Page Not Found', 'master-of-magic-theme' ); ?>
	</h1>
	<!-- /wp:heading -->

	<!-- wp:paragraph -->
	<p>
		<?php
		esc_html_e(
			"The page you are looking for doesn't exist, or it has
      been moved.",
			'master-of-magic-theme'
		);
		?>
	</p>
	<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
