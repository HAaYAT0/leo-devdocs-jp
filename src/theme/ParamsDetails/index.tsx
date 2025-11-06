import React from 'react';

type Parameter = {
  name?: string;
  in?: string;
  required?: boolean;
  description?: string;
  schema?: { type?: string; [key: string]: unknown };
  [key: string]: unknown;
};

type ParamsDetailsProps = {
  parameters?: Parameter[] | null;
  title?: string;
};

const normalize = (parameters?: Parameter[] | null) => {
  if (!parameters || !Array.isArray(parameters)) {
    return [];
  }
  return parameters.filter(Boolean);
};

export default function ParamsDetails({ parameters, title }: ParamsDetailsProps) {
  const rows = normalize(parameters);

  if (rows.length === 0) {
    return null;
  }

  return (
    <section className="openapi-params__section">
      <details className="openapi-markdown__details" open data-collapsed={false}>
        <summary className="openapi-markdown__details-summary">
          <h3 className="openapi-markdown__details-summary-header-params">
            {title ?? 'Parameters'}
          </h3>
        </summary>
        <div className="openapi-params__wrapper">
          <table className="openapi-params__table">
            <thead>
              <tr>
                <th>名前</th>
                <th>位置</th>
                <th>必須</th>
                <th>型</th>
                <th>説明</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((param, index) => (
                <tr key={`${param.name ?? index}-${param.in ?? 'param'}`}>
                  <td>{param.name ?? '-'}</td>
                  <td>{param.in ?? '-'}</td>
                  <td>{param.required ? '必須' : '任意'}</td>
                  <td>{param.schema?.type ?? '-'}</td>
                  <td>{param.description ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
