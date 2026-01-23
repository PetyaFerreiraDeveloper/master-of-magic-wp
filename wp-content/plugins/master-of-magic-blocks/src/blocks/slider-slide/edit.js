import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-master-of-magic-blocks-slider-slide swiper-slide',
  });

  return (
    <div {...blockProps}>
      <InnerBlocks />
    </div>
  );
}

export default Edit;
