/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default ({ props }) => {
  if (props.name !== 'core/button') return null;

  const { attributes, setAttributes } = props;
  const { iconUrl } = attributes;

  return (
    <div style={{ marginBottom: '12px' }}>
      <strong style={{ display: 'block', marginBottom: 6 }}>
        {__('Icon image', 'master-of-magic-theme')}
      </strong>

      <MediaUploadCheck>
        <MediaUpload
          onSelect={media => {
            const url = media?.url || '';
            const mime = media?.mime || media?.mime_type || '';
            const isRaster = mime
              ? !/svg/i.test(mime)
              : !/\.svg(\?|$)/i.test(url);
            setAttributes({ iconUrl: url, iconIsRaster: isRaster });
          }}
          allowedTypes={['image']}
          render={({ open }) => (
            <Button variant="secondary" onClick={open}>
              {iconUrl
                ? __('Replace icon', 'master-of-magic-theme')
                : __('Choose icon', 'master-of-magic-theme')}
            </Button>
          )}
        />
      </MediaUploadCheck>

      {iconUrl && (
        <Button
          variant="link"
          onClick={() => setAttributes({ iconUrl: '', iconIsRaster: false })}
          style={{ marginTop: 6, marginLeft: 6 }}
        >
          {__('Remove icon', 'master-of-magic-theme')}
        </Button>
      )}
    </div>
  );
};
