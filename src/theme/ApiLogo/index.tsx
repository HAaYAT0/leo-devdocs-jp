import React from 'react';

type ApiLogoProps = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
};

export default function ApiLogo({ src, alt = 'API logo', width = 160, height = 'auto' }: ApiLogoProps) {
  if (!src) {
    return null;
  }

  return (
    <div className="openapi-api-logo">
      <img src={src} alt={alt} style={{ width, height }} />
    </div>
  );
}
