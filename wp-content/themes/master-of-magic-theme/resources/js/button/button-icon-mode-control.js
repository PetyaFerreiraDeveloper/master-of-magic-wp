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
    label={__('Icon display mode', 'master-of-magic-theme')}
    value={getButtonStyleFromClassName(props.attributes.className, 'icon-mode')}
    options={[
      {
        label: __('Inherit button color', 'master-of-magic-theme'),
        value: 'inherit',
      },
      {
        label: __('Preserve original colors', 'master-of-magic-theme'),
        value: 'preserve',
      },
    ]}
    onChange={value => {
      const currentButtonStyle = getButtonStyleFromClassName(
        props.attributes.className,
        'icon-mode'
      );

      props.setAttributes({
        className: updateButtonStyleClass(
          props.attributes.className,
          'icon-mode',
          currentButtonStyle === value ? '' : value,
          currentButtonStyle
        ),
      });
    }}
    help={__(
      'Choose how the icon colors should be displayed. "Inherit" makes the icon match the button text color. "Preserve" keeps the original icon colors.',
      'master-of-magic-theme'
    )}
    __next40pxDefaultSize
    __nextHasNoMarginBottom
  />
);
