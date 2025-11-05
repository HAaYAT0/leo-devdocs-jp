import React from 'react';

type MethodEndpointProps = {
  method?: string;
  path?: string;
  context?: string;
  children?: React.ReactNode;
};

const methodColor: Record<string, string> = {
  get: '#38a169',
  post: '#3182ce',
  put: '#d69e2e',
  delete: '#e53e3e',
};

export default function MethodEndpoint(props: MethodEndpointProps) {
  const { method, path, children } = props;
  const normalizedMethod = method?.toLowerCase() ?? '';
  const badgeColor = methodColor[normalizedMethod] ?? '#718096';

  return (
    <section
      style={{
        border: '1px solid var(--ifm-table-border-color)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
      }}
    >
      {method ? (
        <span
          style={{
            backgroundColor: badgeColor,
            color: '#fff',
            borderRadius: '999px',
            padding: '0.25rem 0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          {method}
        </span>
      ) : null}
      {path ? <code style={{ fontSize: '0.95rem' }}>{path}</code> : null}
      {children}
    </section>
  );
}
