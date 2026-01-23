import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { TextControl, SelectControl, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({
    className: `swiper is-${attributes.behavior || 'normal'}`,
  });
  const { slidesPerViewDesktop, slidesPerViewMobile, behavior } = attributes;
  const ALLOWED_BLOCKS = ['master-of-magic-blocks/slider-slide'];

  return (
    <div {...blockProps}>
      <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
      <InspectorControls>
        <PanelBody
          title={__('Slider settings', 'master-of-magic-blocks')}
          initialOpen={true}
        >
          <SelectControl
            label={__('Behavior', 'master-of-magic-blocks')}
            value={behavior}
            options={[
              {
                label: __('Normal slider', 'master-of-magic-blocks'),
                value: 'normal',
              },
              {
                label: __('Continuous marquee', 'master-of-magic-blocks'),
                value: 'marquee',
              },
              {
                label: __('Vertical', 'master-of-magic-blocks'),
                value: 'vertical',
              },
            ]}
            onChange={value => setAttributes({ behavior: value })}
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />

          {behavior === 'normal' && (
            <>
              <TextControl
                label={__(
                  'Slides per view (Desktop)',
                  'master-of-magic-blocks'
                )}
                type="number"
                value={slidesPerViewDesktop}
                onChange={value =>
                  setAttributes({ slidesPerViewDesktop: Number(value) || 1 })
                }
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
              <TextControl
                label={__('Slides per view (Mobile)', 'master-of-magic-blocks')}
                type="number"
                value={slidesPerViewMobile}
                onChange={value =>
                  setAttributes({ slidesPerViewMobile: Number(value) || 1 })
                }
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            </>
          )}
        </PanelBody>
      </InspectorControls>
    </div>
  );
}

export default Edit;
