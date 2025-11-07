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
    label={__('Button icon', 'master-of-magic-theme')}
    value={getButtonStyleFromClassName(props.attributes.className, 'icon')}
    options={[
      { label: __('No icon', 'master-of-magic-theme'), value: '' },
      { label: __('Icon left', 'master-of-magic-theme'), value: 'left' },
      { label: __('Icon right', 'master-of-magic-theme'), value: 'right' },
    ]}
    onChange={value => {
      const currentButtonStyle = getButtonStyleFromClassName(
        props.attributes.className,
        'icon'
      );

      props.setAttributes({
        className: updateButtonStyleClass(
          props.attributes.className,
          'icon',
          currentButtonStyle === value ? '' : value,
          currentButtonStyle
        ),
      });
    }}
    __next40pxDefaultSize
    __nextHasNoMarginBottom
  />
);
