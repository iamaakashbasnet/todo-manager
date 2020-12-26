import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from 'components/Layout';
import {useUser} from 'contexts/UserContext';
import Seo from 'utils/Seo';

const Signup = () => {
  const user = useUser();

  const [state, setState] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    username: '',
  });

  const handleChange = (e: any) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    user.signup(state.first_name, state.last_name, state.email, state.username, state.password);
  };

  if (user.isAuthenticated) {
    return <Redirect to="/dashboard/" />;
  }

  return (
    <Layout>
      <Seo title="Signup" />
      <div className="mt-5">
        <h3>Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="six columns">
              <input
                className="u-full-width"
                type="text"
                name="first_name"
                id="first_name"
                value={state.first_name}
                onChange={handleChange}
                placeholder="Fist name"
              />
            </div>
            <div className="six columns">
              <input
                className="u-full-width"
                type="text"
                name="last_name"
                id="last_name"
                value={state.last_name}
                onChange={handleChange}
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="row">
            <input
              className="u-full-width"
              type="email"
              name="email"
              id="email"
              value={state.email}
              onChange={handleChange}
              placeholder="Email address"
            />
          </div>
          <div className="row">
            <input
              className="u-full-width"
              type="text"
              name="username"
              id="username"
              value={state.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          <div className="row">
            <input
              className="u-full-width"
              type="password"
              name="password"
              id="password"
              value={state.password}
              onChange={handleChange}
              placeholder="Password"
            />
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
