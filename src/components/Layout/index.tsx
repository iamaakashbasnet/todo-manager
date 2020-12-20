import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import styles from './layout.module.scss';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <div className={styles.flexContainer}>
        <Header />
        <div className={styles.flexWrapper}>
          <div className="my-4">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
