/**
 * Wordpress dependencies
 */

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Edit component for Tabs block
 */
function Edit({ innerBlocks }) {
  console.log('Inner blocks:', innerBlocks);
  const blockProps = useBlockProps();
  return (
    <div {...blockProps}>
      <InnerBlocks />
    </div>
  );
}

export default compose([
  withSelect((select, props) => ({
    innerBlocks: select('core/block-editor').getBlocks(props.clientId),
  })),
])(Edit);
