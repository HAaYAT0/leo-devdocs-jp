import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

type OperationTabsProps = {
  children: React.ReactNode;
  defaultValue?: string;
  groupId?: string;
};

function toTabArray(children: React.ReactNode) {
  return React.Children.toArray(children).filter(React.isValidElement);
}

export default function OperationTabs({ children, defaultValue, groupId }: OperationTabsProps) {
  const tabItems = toTabArray(children);

  if (tabItems.length === 0) {
    return null;
  }

  const values = tabItems.map((child, index) => {
    const value = child.props.value ?? child.props.label ?? `tab-${index}`;
    const label = child.props.label ?? child.props.value ?? `Tab ${index + 1}`;
    return { value, label };
  });

  const initial = defaultValue ?? values[0].value;

  return (
    <Tabs defaultValue={initial} groupId={groupId} values={values}>
      {tabItems.map((child, index) => {
        const { children: tabChildren, className, default: isDefault, ...rest } = child.props;
        const { value, label } = values[index];
        return (
          <TabItem key={value} value={value} label={label} className={className} default={isDefault} {...rest}>
            {tabChildren}
          </TabItem>
        );
      })}
    </Tabs>
  );
}
