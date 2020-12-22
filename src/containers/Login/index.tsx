import React from 'react';
import Layout from 'components/Layout';
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <Layout>
      <div className="mt-5">
        <h3>Login</h3>
        <form>
          <div className="row">
            <input className="u-full-width" type="email" name="email" id="email" placeholder="Email address" />
          </div>
          <div className="row">
            <input className="u-full-width" type="password" name="password" id="password" placeholder="Password" />
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
