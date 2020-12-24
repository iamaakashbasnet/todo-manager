import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ProtectedRoutes from 'utils/ProtectedRoutes';
import {useUser} from 'contexts/UserContext';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

const App: React.FC = () => {
  const user = useUser();

  useEffect(() => {
    user.authCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login/" exact component={Login} />
        <Route path="/signup/" exact component={Signup} />
        <ProtectedRoutes path="/dashboard/" exact component={Dashboard} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
