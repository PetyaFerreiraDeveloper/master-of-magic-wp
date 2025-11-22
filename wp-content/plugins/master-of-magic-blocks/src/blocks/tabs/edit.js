/**
 * Wordpress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Button, Dashicon } from '@wordpress/components';
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { withSelect, withDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

/**
 * Helper function for generation of unique IDs
 */
const generateUniqueId = (label = 'tab', existingIds) => {
  let baseId = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  let uniqueId = baseId;
  let counter = 1;

  while (existingIds.includes(uniqueId)) {
    uniqueId = `${baseId}-${counter}`;
    counter++;
  }

  return uniqueId;
};

/**
 * Edit component for Tabs block
 */
function Edit({
  attributes,
  setAttributes,
  innerBlocks = [],
  setInnerBlockAttributes,
  insertBlock,
  selectBlock,
  clientId,
}) {
  const blockProps = useBlockProps();

  useEffect(() => {
    if (!innerBlocks.length) return;

    const currentInnerBlockIds = innerBlocks.map(block => block.attributes.id);

    // Newly added empty tab.
    const newInnerBlockWithoutId = innerBlocks.find(
      block => block.attributes.id === ''
    );

    if (newInnerBlockWithoutId) {
      const ublockid = generateUniqueId(
        newInnerBlockWithoutId.attributes.label,
        currentInnerBlockIds
      );

      setInnerBlockAttributes(newInnerBlockWithoutId.clientId, {
        attributes: {
          id: ublockid,
        },
      });
    }
  }, [innerBlocks.length]);

  const openTab = block => {
    setAttributes({ activeTabId: block.attributes.id });
    if (block.innerBlocks.length === 0) {
      insertBlock(createBlock('core/paragraph'), null, block.clientId);
    }
  };

  const navItemClassName =
    'wp-block-master-of-magic-blocks-tabs__navigation-item';

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
              className={
                block.attributes.id === attributes.activeTabId
                  ? `${navItemClassName} ${navItemClassName}--active`
                  : navItemClassName
              }
              onChange={label =>
                setInnerBlockAttributes(block.clientId, {
                  attributes: {
                    label,
                    id: generateUniqueId(
                      label,
                      innerBlocks.map(b => b.attributes.id)
                    ),
                  },
                })
              }
              onClick={() => openTab(block)}
            />
          ))}
          <div className={`${navItemClassName} ${navItemClassName}--add`}>
            <Button
              variant="primary"
              size="small"
              onClick={() => {
                insertBlock(
                  createBlock('master-of-magic-blocks/tab', {
                    label: __('Tab', 'master-of-magic-blocks'),
                  }),
                  innerBlocks.length,
                  clientId
                );
                selectBlock(clientId);
              }}
            >
              {__('Add tab', 'master-of-magic-blocks')}
            </Button>
          </div>
        </div>
      </div>
      <InnerBlocks
        allowedBlocks={['master-of-magic-blocks/tab']}
        template={[
          [
            'master-of-magic-blocks/tab',
            { label: __('Tab', 'master-of-magic-blocks') },
          ],
        ]}
        templateLock={false}
      />
    </div>
  );
}

export default compose([
  withSelect((select, props) => ({
    innerBlocks: select('core/block-editor').getBlocks(props.clientId),
  })),
  withDispatch(dispatch => ({
    setInnerBlockAttributes: (clientId, attributes) =>
      dispatch('core/block-editor').updateBlock(clientId, attributes),
    insertBlock: (block, index, clientId) =>
      dispatch('core/block-editor').insertBlock(block, index, clientId),
    selectBlock: clientId =>
      dispatch('core/block-editor').selectBlock(clientId),
  })),
])(Edit);
