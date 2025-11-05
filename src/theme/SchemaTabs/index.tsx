import React from 'react';

type SchemaTabsProps = {
  children?: React.ReactNode;
};

export default function SchemaTabs(props: SchemaTabsProps) {
  const { children } = props;

  return (
    <section
      style={{
        border: '1px solid var(--ifm-table-border-color)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem',
      }}
    >
      {children}
    </section>
  );
}
