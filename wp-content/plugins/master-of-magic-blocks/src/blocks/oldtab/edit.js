/**
 * WordPress dependencies.
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
  const blockProps = useBlockProps({ className: 'master-of-magic-blocks-tab' });
  return <div {...blockProps}>Hello from master of magic old tab</div>;
}
