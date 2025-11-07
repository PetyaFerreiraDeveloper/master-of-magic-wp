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
    label={__('Button type', 'master-of-magic-theme')}
    value={getButtonStyleFromClassName(props.attributes.className, 'type')}
    options={[
      {
        label: __('Primary Dark', 'master-of-magic-theme'),
        value: 'primary-dark',
      },
      {
        label: __('Primary White', 'master-of-magic-theme'),
        value: 'primary-white',
      },
      {
        label: __('Invisible', 'master-of-magic-theme'),
        value: 'invisible',
      },
      {
        label: __('Text And Icon', 'master-of-magic-theme'),
        value: 'text-and-icon',
      },
    ]}
    onChange={value => {
      const currentButtonStyle = getButtonStyleFromClassName(
        props.attributes.className,
        'type'
      );

      props.setAttributes({
        className: updateButtonStyleClass(
          props.attributes.className,
          'type',
          currentButtonStyle === value ? '' : value,
          currentButtonStyle
        ),
      });
    }}
    __next40pxDefaultSize
    __nextHasNoMarginBottom
  />
);
