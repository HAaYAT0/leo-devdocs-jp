import React from 'react';

type ResponseEntry = {
  description?: string;
  [key: string]: unknown;
};

type StatusCodesProps = {
  label?: string;
  responses?: Record<string, ResponseEntry> | null;
};

export default function StatusCodes({ label, responses }: StatusCodesProps) {
  if (!responses || Object.keys(responses).length === 0) {
    return null;
  }

  return (
    <section className="openapi-status-codes">
      <h3>{label ?? 'Status Codes'}</h3>
      <table>
        <thead>
          <tr>
            <th>コード</th>
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
