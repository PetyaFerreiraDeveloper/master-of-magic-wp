<?php
/**
 * Title: Header
 * Slug: master-of-magic-theme/header
 * Categories: header
 * Description: Header for the website.
 *
 * @package Master_of_Magic_Theme
 * @formatter Prettier
 */

?>

<!-- wp:group {"tagName":"header","style":{"spacing":{"padding":{"top":"16px","bottom":"16px"}},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"backgroundColor":"primary-dark","textColor":"white","layout":{"type":"constrained"}} -->
<header
	class="wp-block-group has-white-color has-primary-dark-background-color has-text-color has-background has-link-color"
	style="padding-top:16px;padding-bottom:16px"
>
	<!-- wp:group {"align":"wide","style":{"spacing":{"blockGap":"16px"}},"layout":{"type":"flex","justifyContent":"space-between","verticalAlignment":"center"}} -->
	<div class="wp-block-group alignwide">
	<!-- wp:master-of-magic-blocks/svg-icon /-->

	<!-- wp:group {"style":{"spacing":{"blockGap":"20px"}},"layout":{"type":"flex","verticalAlignment":"center"}} -->
	<div class="wp-block-group">
		<!-- wp:navigation {"textColor":"white","backgroundColor":"primary-dark","icon":"menu","style":{"spacing":{"blockGap":"20px"}},"layout":{"type":"flex","justifyContent":"right"}} -->
		<!-- wp:navigation-link {"label":"Home","url":"/"} /-->

		<!-- wp:navigation-link {"label":"About","url":"/about/"} /-->

		<!-- wp:navigation-link {"label":"Contact","url":"/contact/"} /-->
		<!-- /wp:navigation -->
	</div>
	<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</header>
<!-- /wp:group -->
