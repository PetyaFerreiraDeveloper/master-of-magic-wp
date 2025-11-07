/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { getButtonStyleFromClassName, updateButtonStyleClass } from './utils';
import { SelectControl } from '@wordpress/components';

export default ({ props }) => (
  <SelectControl
    label={__('Button size', 'master-of-magic-theme')}
    value={getButtonStyleFromClassName(props.attributes.className, 'size')}
    options={[
      { label: __('Medium', 'master-of-magic-theme'), value: 'm' },
      { label: __('Large', 'master-of-magic-theme'), value: 'l' },
    ]}
    onChange={value => {
      const currentButtonStyle = getButtonStyleFromClassName(
        props.attributes.className,
        'size'
      );

      props.setAttributes({
        className: updateButtonStyleClass(
          props.attributes.className,
          'size',
          currentButtonStyle === value ? '' : value,
          currentButtonStyle
        ),
      });
    }}
    __next40pxDefaultSize
    __nextHasNoMarginBottom
  />
);
