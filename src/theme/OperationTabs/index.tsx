import React from 'react';

type OperationTabsProps = {
  children?: React.ReactNode;
};

export default function OperationTabs(props: OperationTabsProps) {
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
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return (
          <div key={index} style={{ marginBottom: '1rem' }}>
            {child}
          </div>
        );
      })}
    </section>
  );
}
