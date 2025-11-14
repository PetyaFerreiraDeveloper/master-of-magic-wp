/**
 * Wordpress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Edit component for Tabs block
 */
function Edit({ innerBlocks = [], setInnerBlockAttributes }) {
  const blockProps = useBlockProps();

  const navItemClassName =
    'wp-block-abtion-block-library-tabs__navigation-item';

  return (
    <div {...blockProps}>
      <div className="wp-block-master-of-magic-blocks-tabs__navigation">
        <div className="wp-block-master-of-magic-blocks-tabs__navigation-inner">
          {innerBlocks.map((block, index) => (
            <RichText
              key={index}
              tagName="div"
              value={block.attributes.label}
              placeholder={__('Tab label', 'master-of-magic-blocks')}
              allowedFormats={[]} // no bold/italic etc, just plain text
              className={navItemClassName}
              onChange={label =>
                setInnerBlockAttributes(block.clientId, {
                  attributes: { label },
                })
              }
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
  withDispatch(dispatch => ({
    setInnerBlockAttributes: (clientId, attributes) => {
      dispatch('core/block-editor').updateBlock(clientId, attributes);
    },
  })),
])(Edit);
