/**
 * WordPress dependencies.
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit({ attributes, context }) {
  const blockProps = useBlockProps({ className: 'master-of-magic-blocks-tab' });
  return (
    <div {...blockProps}>
      <div
        className="wp-block-master-of-magic-blocks-tab__content"
        hidden={context['master-of-magic-blocks/activeTabId'] !== attributes.id}
      >
        <InnerBlocks />
      </div>
    </div>
  );
}
