import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import {useUser} from 'contexts/UserContext';
import styles from './layout.module.scss';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
  const user = useUser();
  return (
    <>
      {user.loading && (
        <div className={styles.preloader}>
          <h3>Loading...</h3>
        </div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Header />
          <div className="container">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
