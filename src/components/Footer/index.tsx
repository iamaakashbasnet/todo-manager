import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; 2020 Todo Manager</p>
      <small>an Aakash Basnet Production</small>
    </footer>
  );
};

export default Footer;
