import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './Home';

const App: React.FC = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
