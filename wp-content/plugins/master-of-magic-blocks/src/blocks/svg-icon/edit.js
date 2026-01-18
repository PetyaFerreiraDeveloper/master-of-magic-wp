import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
  useBlockProps,
  BlockControls,
  LinkControl,
} from '@wordpress/block-editor';
import { Button, Notice, Popover, ToolbarButton } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
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

  const blockProps = useBlockProps();
  const hasSvg = !!mediaId;

  const onSelectMedia = media => {
    if (!media || !isSvg(media)) {
      setAttributes({ mediaId: 0, mediaUrl: '' });
      return;
    }

    setAttributes({
      mediaId: media.id ?? 0,
      mediaUrl: media.url || media.source_url || '',
    });
  };

  const removeMedia = () => setAttributes({ mediaId: 0, mediaUrl: '' });

  const unlink = () => {
    setAttributes({ link: { url: '', opensInNewTab: false } });
    setIsLinkPickerOpen(false);
  };

  const hasLink = !!link?.url;

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
          <div style={{ padding: '12px', width: '100%' }}>
            <LinkControl
              value={{
                url: link?.url || '',
                opensInNewTab: !!link?.opensInNewTab,
              }}
              onChange={next =>
                setAttributes({
                  link: {
                    url: next.url || '',
                    opensInNewTab: !!next.opensInNewTab,
                  },
                })
              }
            />
          </div>
        </Popover>
      )}

      {/* Existing Media UI */}
      <MediaUploadCheck>
        <MediaUpload
          onSelect={onSelectMedia}
          allowedTypes={['image/svg+xml']}
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
                      attributes={attributes}
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

      {!!mediaUrl && !mediaUrl.toLowerCase().endsWith('.svg') && (
        <Notice status="warning" isDismissible={false}>
          {__(
            'The selected file is not an SVG. Please choose an SVG file.',
            'master-of-magic-blocks'
          )}
        </Notice>
      )}
    </div>
  );
}
