/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { getButtonStyleFromClassName, updateButtonStyleClass } from './utils';

export default ({ props }) => (
  <SelectControl
    label={__('Icon size', 'master-of-magic-theme')}
    value={getButtonStyleFromClassName(props.attributes.className, 'icon-size')}
    options={[
      { label: __('Small (16px)', 'master-of-magic-theme'), value: 'small' },
      { label: __('Medium (20px)', 'master-of-magic-theme'), value: 'medium' },
      { label: __('Large (24px)', 'master-of-magic-theme'), value: 'large' },
    ]}
    onChange={value => {
      const currentButtonStyle = getButtonStyleFromClassName(
        props.attributes.className,
        'icon-size'
      );

      props.setAttributes({
        className: updateButtonStyleClass(
          props.attributes.className,
          'icon-size',
          currentButtonStyle === value ? '' : value,
          currentButtonStyle
        ),
      });
    }}
    __next40pxDefaultSize
    __nextHasNoMarginBottom
  />
);
