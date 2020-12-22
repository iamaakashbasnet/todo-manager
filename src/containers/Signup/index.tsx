import React from 'react';
import Layout from 'components/Layout';
import {Link} from 'react-router-dom';

const Signup = () => {
  return (
    <Layout>
      <div className="mt-5">
        <h3>Signup</h3>
        <form>
          <div className="row">
            <div className="six columns">
              <input className="u-full-width" type="text" name="first_name" id="first_name" placeholder="Fist name" />
            </div>
            <div className="six columns">
              <input className="u-full-width" type="text" name="last_name" id="last_name" placeholder="Last name" />
            </div>
          </div>
          <div className="row">
            <input className="u-full-width" type="email" name="email" id="email" placeholder="Email address" />
          </div>
          <div className="row">
            <input className="u-full-width" type="text" name="username" id="username" placeholder="Username" />
          </div>
          <div className="row">
            <input className="u-full-width" type="password" name="password" id="password" placeholder="Password" />
          </div>
          <div className="row">
            <button className="button-primary mr-5">Signup</button>
            <div>
              <Link to="/login/">Already have an account?</Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
