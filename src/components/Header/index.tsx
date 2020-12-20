import React from 'react';
import styles from './header.module.scss';

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className="d-flex justify-space-between align-items-center">
        <a href="# " className={styles.navbarBrand}>
          Todo Manager
        </a>
        <small>Minimalist Todo Manager</small>
      </div>
    </nav>
  );
};

export default Header;
