import React from 'react';

type ParameterLike = {
  name?: string;
  in?: string;
  required?: boolean;
  description?: string;
  schema?: { type?: string };
};

type ParamsDetailsProps = {
  parameters?: ParameterLike[] | Record<string, ParameterLike> | null;
};

function normalizeParameters(
  parameters: ParamsDetailsProps['parameters'],
): ParameterLike[] {
  if (!parameters) {
    return [];
  }

  if (Array.isArray(parameters)) {
    return parameters;
  }

  return Object.entries(parameters).map(([name, value]) => ({
    name,
    ...value,
  }));
}

export default function ParamsDetails(props: ParamsDetailsProps) {
  const rows = normalizeParameters(props.parameters);

  if (!rows.length) {
    return null;
  }

  return (
    <section>
      <table>
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
          {rows.map((row, index) => (
            <tr key={row.name ?? index}>
              <td>{row.name ?? '-'}</td>
              <td>{row.in ?? '-'}</td>
              <td>{row.required ? '必須' : '任意'}</td>
              <td>{row.schema?.type ?? '-'}</td>
              <td>{row.description ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
