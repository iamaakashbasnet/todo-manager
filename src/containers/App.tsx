import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {UserProvider} from 'contexts/UserContext';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';

const App: React.FC = () => {
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
