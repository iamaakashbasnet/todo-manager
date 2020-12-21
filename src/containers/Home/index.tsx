import React from 'react';
import Layout from 'components/Layout';
import showcase from 'assets/showcase.jpg';
import styles from './home.module.scss';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className={styles.showcaseWrapper}>
        <h1>Minimalist Online Todo Manager</h1>
        <p>Login ○ Add Todo ○ Logout</p>
        <img className={styles.showcaseImg} src={showcase} alt="Todo Illustration" />
      </div>
    </Layout>
  );
};

export default Home;
