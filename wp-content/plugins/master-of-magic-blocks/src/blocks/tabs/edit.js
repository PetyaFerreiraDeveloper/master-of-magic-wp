/**
 * Wordpress dependencies
 */

import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
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
      <div className="wp-block-master-of-magic-blocks-tabs__navigation">
        <div className="wp-block-master-of-magic-blocks-tabs__navigation-inner">
          {innerBlocks.map((block, index) => (
            <RichText
              key={index}
              tagName="div"
              value={block.attributes.label}
            />
          ))}
        </div>
      </div>
      <InnerBlocks />
    </div>
  );
}

export default compose([
  withSelect((select, props) => ({
    innerBlocks: select('core/block-editor').getBlocks(props.clientId),
  })),
])(Edit);
