import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {UserProvider, useUser} from 'contexts/UserContext';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';

const App: React.FC = () => {
  const user = useUser();

  useEffect(() => {
    console.log(user);
    user.authCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login/" exact component={Login} />
          <Route path="/signup/" exact component={Signup} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
