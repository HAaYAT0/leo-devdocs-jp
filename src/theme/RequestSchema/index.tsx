import React from 'react';
import CodeBlock from '@theme/CodeBlock';

type RequestSchemaProps = {
  title?: string;
  body?: unknown;
};

export default function RequestSchema({ title, body }: RequestSchemaProps) {
  if (!body || (typeof body === 'object' && body !== null && Object.keys(body as Record<string, unknown>).length === 0)) {
    return null;
  }

  let serialized = '';
  try {
    serialized = JSON.stringify(body, null, 2);
  } catch (error) {
    serialized = String(body);
  }

  return (
    <section className="openapi-request-schema">
      {title ? <h3>{title}</h3> : null}
      <CodeBlock language="json">{serialized}</CodeBlock>
    </section>
  );
}
