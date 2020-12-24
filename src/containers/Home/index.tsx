import React from 'react';
import {Redirect} from 'react-router-dom';
import Layout from 'components/Layout';
import showcase from 'assets/showcase.jpg';
import {useUser} from 'contexts/UserContext';
import styles from './home.module.scss';

const Home: React.FC = () => {
  const user = useUser();

  if (user.isAuthenticated) {
    return <Redirect to="/dashboard/" />;
  }

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
