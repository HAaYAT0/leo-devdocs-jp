import React from 'react';

type ResponseEntry = {
  description?: string;
  content?: Record<string, unknown>;
};

type StatusCodesProps = {
  label?: string;
  responses?: Record<string, ResponseEntry> | null;
};

export default function StatusCodes(props: StatusCodesProps) {
  const { label, responses } = props;

  if (!responses || !Object.keys(responses).length) {
    return null;
  }

  return (
    <section>
      {label ? <h3>{label}</h3> : <h3>レスポンスコード</h3>}
      <table>
        <thead>
          <tr>
            <th>ステータス</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(responses).map(([status, detail]) => (
            <tr key={status}>
              <td>{status}</td>
              <td>{detail?.description ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
