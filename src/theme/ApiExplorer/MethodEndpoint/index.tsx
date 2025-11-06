import React from 'react';

type MethodEndpointProps = {
  method?: string;
  path?: string;
};

const methodColors: Record<string, string> = {
  get: 'badge--primary',
  post: 'badge--success',
  delete: 'badge--danger',
  put: 'badge--info',
  patch: 'badge--warning',
  head: 'badge--secondary',
};

export default function MethodEndpoint({ method = 'GET', path = '' }: MethodEndpointProps) {
  const normalized = method.toLowerCase();
  const badgeClass = methodColors[normalized] ?? 'badge--secondary';

  return (
    <div className="openapi__method-endpoint">
      <span className={`badge ${badgeClass}`}>{normalized === 'event' ? 'Webhook' : method.toUpperCase()}</span>
      {path ? <code className="openapi__method-endpoint-path">{path}</code> : null}
      <div className="openapi__divider" />
    </div>
  );
}
