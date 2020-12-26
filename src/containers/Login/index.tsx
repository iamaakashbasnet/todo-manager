import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from 'components/Layout';
import {useUser} from 'contexts/UserContext';
import Seo from 'utils/Seo';

const Login = () => {
  const user = useUser();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    user.login(state.email, state.password);
  };

  if (user.isAuthenticated) {
    return <Redirect to="/dashboard/" />;
  }

  return (
    <Layout>
      <Seo title="Login" />
      <div className="mt-5">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              className="u-full-width"
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="Email address"
            />
          </div>
          <div className="row">
            <input
              className="u-full-width"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="row">
            <button className="button-primary mr-5">Login</button>
            <div>
              <Link to="/signup/">Don't have an account?</Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
