import React from 'react';

type ExportProps = {
  url?: string;
  proxy?: string | null;
};

export default function Export({ url, proxy }: ExportProps) {
  const downloadUrl = proxy ?? url;

  if (!downloadUrl) {
    return null;
  }

  return (
    <div className="openapi-export">
      <a className="button button--sm button--secondary" href={downloadUrl} target="_blank" rel="noreferrer">
        OpenAPI Spec をダウンロード
      </a>
    </div>
  );
}
