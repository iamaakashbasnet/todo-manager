import React from 'react';
import styles from './header.module.scss';

const Header = () => {
  return (
    <nav className={`${styles.navbar} mt-5`}>
      <div className="navbarBrand">
        <h3 className="m-0 p-0">Todo Manger</h3>
      </div>
      <div className="navbarLinks">
        <a href="# ">Login</a>&nbsp;&nbsp;&nbsp;
        <a href="# ">Signup</a>
      </div>
    </nav>
  );
};

export default Header;
