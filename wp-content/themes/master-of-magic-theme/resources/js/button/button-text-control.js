/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { getButtonStyleFromClassName, updateButtonStyleClass } from './utils';
import { ToggleControl } from '@wordpress/components';

export default ({ props }) => (
  <>
    <ToggleControl
      label={__('Hide button text', 'master-of-magic-theme')}
      help={__(
        'If checked, the button text will be hidden.',
        'master-of-magic-theme'
      )}
      checked={Boolean(
        getButtonStyleFromClassName(props.attributes.className, 'has-text')
      )}
      onChange={checked => {
        const currentButtonStyle = getButtonStyleFromClassName(
          props.attributes.className,
          'has-text'
        );

        props.setAttributes({
          className: updateButtonStyleClass(
            props.attributes.className,
            'has-text',
            checked ? 'false' : '',
            currentButtonStyle
          ),
        });
      }}
      __next40pxDefaultSize
      __nextHasNoMarginBottom
    />
  </>
);
