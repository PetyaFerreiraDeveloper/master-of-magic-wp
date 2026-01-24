/**
 * edit.js – MOM SVG Icon block.
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import {
  useBlockProps,
  BlockControls,
  LinkControl,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button, Notice, Popover, ToolbarButton } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

const isSvg = media => {
  const mime = media?.mime || media?.mime_type;
  const subtype = media?.subtype;

  if (mime === 'image/svg+xml') return true;
  if (media?.type === 'image' && subtype === 'svg+xml') return true;

  const url = media?.url || media?.source_url || '';
  return url.toLowerCase().split('?')[0].endsWith('.svg');
};

export default function Edit({ attributes, setAttributes, isSelected }) {
  const { mediaId, mediaUrl, link } = attributes;

  const [isLinkPickerOpen, setIsLinkPickerOpen] = useState(false);
  const [invalidSelectionUrl, setInvalidSelectionUrl] = useState('');

  const blockProps = useBlockProps();
  const hasSvg = !!mediaId;
  const hasLink = !!link?.url;

  // Only pass what PHP render needs (prevents REST validation issues).
  const ssrAttributes = useMemo(
    () => ({
      mediaId: mediaId || 0,
      link: {
        url: link?.url || '',
        opensInNewTab: !!link?.opensInNewTab,
      },
    }),
    [mediaId, link]
  );

  const onSelectMedia = media => {
    if (!media) return;

    const url = media?.url || media?.source_url || '';

    if (!isSvg(media)) {
      setInvalidSelectionUrl(url);
      setAttributes({ mediaId: 0, mediaUrl: '' });
      return;
    }

    setInvalidSelectionUrl('');
    setAttributes({
      mediaId: media.id ?? 0,
      mediaUrl: url,
    });
  };

  const removeMedia = () => {
    setAttributes({ mediaId: 0, mediaUrl: '' });
    setInvalidSelectionUrl('');
    setIsLinkPickerOpen(false);
  };

  const unlink = () => {
    setAttributes({ link: { url: '', opensInNewTab: false } });
    setIsLinkPickerOpen(false);
  };

  return (
    <div {...blockProps}>
      <BlockControls>
        <ToolbarButton
          label={__('Link', 'master-of-magic-blocks')}
          onClick={() => setIsLinkPickerOpen(v => !v)}
          isPressed={isLinkPickerOpen}
          disabled={!hasSvg}
        >
          {__('Link', 'master-of-magic-blocks')}
        </ToolbarButton>

        {hasLink && (
          <ToolbarButton
            label={__('Unlink', 'master-of-magic-blocks')}
            onClick={unlink}
            disabled={!hasSvg}
          >
            {__('Unlink', 'master-of-magic-blocks')}
          </ToolbarButton>
        )}
      </BlockControls>

      {/* Link popover */}
      {isSelected && isLinkPickerOpen && (
        <Popover
          placement="bottom-start"
          onClose={() => setIsLinkPickerOpen(false)}
          focusOnMount="firstElement"
        >
          <LinkControl
            value={{
              url: link?.url || '',
              opensInNewTab: !!link?.opensInNewTab,
            }}
            onChange={next =>
              setAttributes({
                link: {
                  url: next?.url || '',
                  opensInNewTab: !!next?.opensInNewTab,
                },
              })
            }
          />
        </Popover>
      )}

      <MediaUploadCheck>
        <MediaUpload
          onSelect={onSelectMedia}
          allowedTypes={['image']}
          value={mediaId}
          render={({ open }) => (
            <div className="mom-svg-icon__inner">
              {!hasSvg ? (
                <Button variant="primary" onClick={open}>
                  {__('Select SVG', 'master-of-magic-blocks')}
                </Button>
              ) : (
                <>
                  <div className="mom-svg-icon__preview">
                    <ServerSideRender
                      block="master-of-magic-blocks/svg-icon"
                      attributes={ssrAttributes}
                    />
                  </div>

                  <div className="mom-svg-icon__actions">
                    <Button variant="secondary" onClick={open}>
                      {__('Replace', 'master-of-magic-blocks')}
                    </Button>
                    <Button
                      variant="tertiary"
                      onClick={removeMedia}
                      isDestructive
                    >
                      {__('Remove', 'master-of-magic-blocks')}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        />
      </MediaUploadCheck>

      {!!invalidSelectionUrl && (
        <Notice status="warning" isDismissible={false}>
          {__(
            'The selected file is not an SVG. Please choose an SVG file.',
            'master-of-magic-blocks'
          )}
        </Notice>
      )}

      {!!mediaUrl && !mediaUrl.toLowerCase().split('?')[0].endsWith('.svg') && (
        <Notice status="warning" isDismissible={false}>
          {__(
            'The selected file does not appear to be an SVG. Please choose an SVG file.',
            'master-of-magic-blocks'
          )}
        </Notice>
      )}
    </div>
  );
}
