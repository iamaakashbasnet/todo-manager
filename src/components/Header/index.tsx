import React from 'react';
import {Link} from 'react-router-dom';
import styles from './header.module.scss';

const Header = () => {
  return (
    <nav className={`${styles.navbar} pt-5 pb-5`}>
      <div className="navbarBrand">
        <h3 className="m-0 p-0 ">
          <Link className="text-decoration-none text-dark" to="/">
            Todo Manger
          </Link>
        </h3>
      </div>
      <div className="navbarLinks">
        <Link to="/login/">Login</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/signup/">Signup</Link>
      </div>
    </nav>
  );
};

export default Header;
