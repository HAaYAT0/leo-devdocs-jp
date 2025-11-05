import React from 'react';

type ApiLogoProps = {
  alt?: string;
  src?: string;
  width?: number | string;
  height?: number | string;
};

export default function ApiLogo(props: ApiLogoProps) {
  const { src, alt = 'API Logo', width = 'auto', height = 64 } = props;

  if (!src) {
    return null;
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <img src={src} alt={alt} style={{ width, height }} />
    </div>
  );
}
