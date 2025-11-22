/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

store('master-of-magic-blocks', {
  actions: {
    open() {
      const context = getContext();
      context.tabs.forEach(
        singleTab => (singleTab.isActive = singleTab.id === context.item.id)
      );

      const { ref } = getElement();
      const tabs = ref
        .closest('.wp-block-master-of-magic-blocks-tabs')
        .querySelectorAll(
          '.wp-block-master-of-magic-blocks-tabs__content > div'
        );

      tabs.forEach(tab => {
        if (tab.dataset.tabId === context.item.id) {
          tab.classList.add(
            'wp-block-master-of-magic-blocks-tabs__content-item--active'
          );
        } else {
          tab.classList.remove(
            'wp-block-master-of-magic-blocks-tabs__content-item--active'
          );
        }
      });
    },
  },
});
