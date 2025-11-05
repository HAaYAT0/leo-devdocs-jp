import React from 'react';

type ExportProps = {
  url?: string;
  proxy?: string | null;
  children?: React.ReactNode;
};

export default function Export(props: ExportProps) {
  const { url, proxy } = props;
  const href = proxy ?? url;

  if (!href) {
    return null;
  }

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid var(--ifm-table-border-color)',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        background: 'var(--ifm-background-surface-color)',
      }}
    >
      <span style={{ fontWeight: 600 }}>OpenAPI スキーマをダウンロード: </span>
      <a href={href} target="_blank" rel="noreferrer">
        {href}
      </a>
    </div>
  );
}
