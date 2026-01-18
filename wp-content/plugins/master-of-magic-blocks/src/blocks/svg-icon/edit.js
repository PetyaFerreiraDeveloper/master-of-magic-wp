/**
 * SVG Icon block — editor
 * Media picker in block UI + frontend-identical preview via ServerSideRender.
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Button, Notice } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

const isSvg = media => {
  const mime = media?.mime || media?.mime_type;
  if (mime === 'image/svg+xml') return true;

  const url = media?.url || media?.source_url || '';
  return url.toLowerCase().endsWith('.svg');
};

export default function Edit({ attributes, setAttributes }) {
  const { mediaId, mediaUrl } = attributes;

  const blockProps = useBlockProps();

  const hasSvg = !!mediaId;

  const onSelectMedia = media => {
    if (!media || !isSvg(media)) {
      setAttributes({ mediaId: 0, mediaUrl: '' });
      return;
    }

    setAttributes({
      mediaId: media.id ?? 0,
      // keep this only for the warning and editor convenience; render comes from PHP
      mediaUrl: media.url || media.source_url || '',
    });
  };

  const removeMedia = () => setAttributes({ mediaId: 0, mediaUrl: '' });

  return (
    <div {...blockProps}>
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
