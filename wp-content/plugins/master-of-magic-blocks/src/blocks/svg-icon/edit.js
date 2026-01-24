/**
 * edit.js – MOM SVG Icon block
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
  if (mime === 'image/svg+xml') return true;

  const url = media?.url || media?.source_url || '';
  return url.toLowerCase().endsWith('.svg');
};

export default function Edit({ attributes, setAttributes, isSelected }) {
  const { mediaId, mediaUrl, link } = attributes;

  const [isLinkPickerOpen, setIsLinkPickerOpen] = useState(false);
  const [invalidSelectionUrl, setInvalidSelectionUrl] = useState('');

  const blockProps = useBlockProps();
  const hasSvg = !!mediaId;
  const hasLink = !!link?.url;

  // Only pass the attributes your PHP render actually needs.
  // This prevents REST errors if some extra keys get injected into attributes.
  const ssrAttributes = useMemo(
    () => ({
      mediaId: mediaId || 0,
      link: {
        url: link?.url || '',
        opensInNewTab: !!link?.opensInNewTab,
      },
      // If you ever use mediaUrl in PHP, you can include it here.
      // mediaUrl: mediaUrl || '',
    }),
    [mediaId, link]
  );

  const onSelectMedia = media => {
    if (!media) return;

    const url = media?.url || media?.source_url || '';

    if (!isSvg(media)) {
      // Store the invalid URL for a visible warning
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
      {/* Toolbar: Link / Unlink */}
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
          placement="bottom"
          onClose={() => setIsLinkPickerOpen(false)}
          focusOnMount="firstElement"
        >
          <div style={{ padding: '12px', width: '320px', maxWidth: '90vw' }}>
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
          </div>
        </Popover>
      )}

      {/* Media UI */}
      <MediaUploadCheck>
        <MediaUpload
          onSelect={onSelectMedia}
          // Most compatible: allow images, then validate SVG in code.
          // SVG upload is often controlled by a plugin anyway.
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

      {/* Warnings */}
      {!!invalidSelectionUrl && (
        <Notice status="warning" isDismissible={false}>
          {__(
            'The selected file is not an SVG. Please choose an SVG file.',
            'master-of-magic-blocks'
          )}
        </Notice>
      )}

      {/* Optional extra sanity warning: mediaUrl exists but doesn't look like SVG */}
      {!!mediaUrl && !mediaUrl.toLowerCase().endsWith('.svg') && (
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
