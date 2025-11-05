import React from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

type FeatureCardProps = {
  title: string;
  description: string;
  link: string;
};

export default function FeatureCard(props: FeatureCardProps) {
  const { title, description, link } = props;

  return (
    <Link className={styles.card} to={link}>
      <div className={styles.inner}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
}
