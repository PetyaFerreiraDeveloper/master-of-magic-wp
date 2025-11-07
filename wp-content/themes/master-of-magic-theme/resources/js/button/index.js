/**
 * WordPress dependencies.
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { getButtonStyleFromClassName } from './utils';
import ButtonTypeControl from './button-type-control';
import ButtonSizeControl from './button-size-control';
import ButtonIconControl from './button-icon-control';
import ButtonIconPickerControl from './button-icon-picker-control';
import ButtonIconSizeControl from './button-icon-size-control';
import ButtonIconModeControl from './button-icon-mode-control';
import ButtonTextControl from './button-text-control';

const withMyButtonStylesControls = createHigherOrderComponent(BlockEdit => {
  return props => {
    if (props.name !== 'core/button') {
      return <BlockEdit {...props} />;
    }

    const buttonIcon = getButtonStyleFromClassName(
      props.attributes.className,
      'icon'
    );

    // Apply custom icon styles to editor preview
    const { iconUrl, iconIsRaster } = props.attributes;
    const editorStyles = {};
    const editorAttrs = {};

    if (iconUrl && buttonIcon !== '') {
      editorStyles['--custom-icon-url'] = `url(${iconUrl})`;
      if (iconIsRaster) {
        editorAttrs['data-icon-raster'] = 'true';
      }
    }

    // Get the current className to apply the same icon classes to our wrapper
    const wrapperClasses = props.attributes.className || '';

    // We need this wrapper to make the custom icon styles work in the editor
    return (
      <div
        className={iconUrl && buttonIcon !== '' ? wrapperClasses : ''}
        style={iconUrl && buttonIcon !== '' ? editorStyles : {}}
        {...(iconUrl && buttonIcon !== '' ? editorAttrs : {})}
      >
        <BlockEdit key="edit" {...props} />
        <InspectorControls>
          <PanelBody title={__('Button style', 'master-of-magic-theme')}>
            <ButtonTypeControl props={props} />
            <ButtonSizeControl props={props} />
            <ButtonIconControl props={props} />
            {buttonIcon !== '' && <ButtonIconPickerControl props={props} />}
            {buttonIcon !== '' && <ButtonIconSizeControl props={props} />}
            {buttonIcon !== '' && <ButtonIconModeControl props={props} />}
            {buttonIcon !== '' && <ButtonTextControl props={props} />}
          </PanelBody>
        </InspectorControls>
      </div>
    );
  };
}, 'withMyButtonStyles');

wp.hooks.addFilter(
  'editor.BlockEdit',
  'master-of-magic-theme/with-inspector-controls',
  withMyButtonStylesControls
);

const addButtonBlockClassName = (settings, name) => {
  if (name !== 'core/button') {
    return settings;
  }

  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      className: {
        type: 'string',
        default:
          'is-style-button-type-primary-dark is-style-button-size-m is-style-button-icon-size-small is-style-button-icon-mode-inherit',
      },
      iconUrl: {
        type: 'string',
        default: '',
      },
      iconIsRaster: {
        type: 'boolean',
        default: false,
      },
    },
  };
};

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'master-of-magic-theme/with-default-button-class',
  addButtonBlockClassName
);

// Add save functionality to handle custom icons
const addButtonSaveAttributes = (extraProps, blockType, attributes) => {
  if (blockType.name !== 'core/button') {
    return extraProps;
  }

  const { iconUrl, iconIsRaster } = attributes;

  if (iconUrl) {
    // Add custom CSS property for the icon URL
    const style = extraProps.style || {};
    style['--custom-icon-url'] = `url(${iconUrl})`;
    extraProps.style = style;

    // Add data attribute for raster images
    if (iconIsRaster) {
      extraProps['data-icon-raster'] = 'true';
    }
  }

  return extraProps;
};

wp.hooks.addFilter(
  'blocks.getSaveContent.extraProps',
  'master-of-magic-theme/button-custom-icon-save',
  addButtonSaveAttributes
);
