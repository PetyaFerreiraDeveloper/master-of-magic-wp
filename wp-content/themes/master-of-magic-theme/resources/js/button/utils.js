/**
 * WordPress dependencies.
 */
import TokenList from '@wordpress/token-list';

/**
 * Internal dependencies.
 */
import { BUTTON_STYLES } from './button-styles';

export const getButtonStyleFromClassName = (className, styleType) => {
  const list = new TokenList(className);

  const style = BUTTON_STYLES.find(option =>
    list.contains(`is-style-button-${styleType}-${option.value}`)
  );

  return undefined !== style ? style.value : '';
};

export const updateButtonStyleClass = (
  className,
  styleType,
  newStyle = '',
  oldStyle = ''
) => {
  const list = new TokenList(className);

  if (oldStyle) {
    list.remove(`is-style-button-${styleType}-${oldStyle}`);
  }

  if (newStyle) {
    list.add(`is-style-button-${styleType}-${newStyle}`);
  }

  return list.value;
};