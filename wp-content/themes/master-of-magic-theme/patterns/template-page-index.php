<?php
/**
 * Title: Index Page
 * Slug: master-of-magic-theme/template-page-index
 * Description: The main index page template.
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
	<!-- wp:group {"align":"wide","layout":{"type":"constrained","justifyContent":"left"}} -->
	<div class="wp-block-group alignwide">
	<!-- wp:paragraph -->
	<p>
		<?php
		esc_html_e(
			'Index page to test deployment',
			'master-of-magic-theme'
		);
		?>
	</p>
	<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
