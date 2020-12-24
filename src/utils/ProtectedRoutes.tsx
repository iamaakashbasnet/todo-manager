import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useUser} from 'contexts/UserContext';

const ProtectedRoutes: React.FC<RouteProps> = ({component: Component, ...rest}: any) => {
  const user = useUser();
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) => {
        if (user.isAuthenticated) {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <Component {...props} />;
        }
        return <Redirect to="/login/" />;
      }}
    />
  );
};

export default ProtectedRoutes;
