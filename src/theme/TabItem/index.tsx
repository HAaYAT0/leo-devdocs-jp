import React from 'react';

type TabItemProps = {
  value?: string;
  label?: string;
  children?: React.ReactNode;
};

export default function TabItem(props: TabItemProps) {
  const { label, children } = props;

  return (
    <article>
      {label ? (
        <h4 style={{ marginBottom: '0.5rem' }}>
          {label}
        </h4>
      ) : null}
      {children}
    </article>
  );
}
