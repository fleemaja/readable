import React from 'react';
import { Route } from 'react-router-dom'
import Index from './Index';
import ShowPost from './ShowPost';
import { BrowserRouter, Switch } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/:category?"
             render={(props) => (<Index {...props} /> )} />
      <Route exact path="/:category/:postId" component={ShowPost} />
    </Switch>
  </BrowserRouter>
);

export default App;
