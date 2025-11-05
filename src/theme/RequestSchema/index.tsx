import React from 'react';

type RequestSchemaProps = {
  title?: string;
  body?: unknown;
};

function stringifyBody(body: unknown): string {
  if (typeof body === 'string') {
    return body;
  }

  try {
    return JSON.stringify(body, null, 2);
  } catch (_error) {
    return String(body);
  }
}

export default function RequestSchema(props: RequestSchemaProps) {
  const { title, body } = props;

  if (!body) {
    return null;
  }

  return (
    <section>
      {title ? <h3>{title}</h3> : null}
      <pre>
        <code>{stringifyBody(body)}</code>
      </pre>
    </section>
  );
}
